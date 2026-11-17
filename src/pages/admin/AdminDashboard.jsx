import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PROJECTS_DATA } from '../../data/projectsData';
import { SERVICES_DATA } from '../../data/servicesData';
import Section3DVisual from '../../components/Section3DVisual';

/**
 * AdminDashboard - Executive Operations Console for NexFero Innovations
 * Provides inquiry management, SSE real-time sync, CSV export, projects & services overview.
 */
export default function AdminDashboard({ user, onLogout, onNavigateHome }) {
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries' | 'projects' | 'services' | 'settings'
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [liveConnected, setLiveConnected] = useState(false);
  const [actionNotice, setActionNotice] = useState('');

  // Flash notification helper
  const notify = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 4000);
  };

  // Fetch inquiries from server with local storage fallback
  const fetchInquiries = useCallback(async () => {
    try {
      const res = await fetch('/api/contacts');
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.contacts)) {
          // Normalize entries
          const list = json.contacts.map((item) => ({
            status: 'new',
            notes: '',
            ...item
          }));
          setInquiries(list);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn('Backend unavailable, reading local storage');
    }

    try {
      const local = JSON.parse(localStorage.getItem('nexfero_inquiries') || '[]');
      const normalized = local.map((item) => ({
        status: 'new',
        notes: '',
        ...item
      }));
      setInquiries(normalized);
    } catch (e) {
      setInquiries([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // Connect to Live Server-Sent Events (SSE) stream
  useEffect(() => {
    let evtSource;
    try {
      evtSource = new EventSource('/api/admin/events');
      evtSource.onopen = () => {
        setLiveConnected(true);
      };
      evtSource.onmessage = (e) => {
        try {
          const payload = JSON.parse(e.data);
          if (payload.type === 'NEW_INQUIRY') {
            notify(`⚡ Real-time alert: New inquiry received from ${payload.data.name} (${payload.data.service})!`);
            fetchInquiries();
          }
        } catch (err) {}
      };
      evtSource.onerror = () => {
        setLiveConnected(false);
      };
    } catch (e) {
      setLiveConnected(false);
    }

    return () => {
      if (evtSource) evtSource.close();
    };
  }, [fetchInquiries]);

  // Save changes locally and attempt server sync
  const updateInquiryStatus = async (trackingId, newStatus) => {
    const updated = inquiries.map((item) =>
      item.trackingId === trackingId ? { ...item, status: newStatus } : item
    );
    setInquiries(updated);
    localStorage.setItem('nexfero_inquiries', JSON.stringify(updated));

    try {
      await fetch(`/api/admin/enquiries/${trackingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {}

    notify(`Updated inquiry ${trackingId} status to "${newStatus}"`);
  };

  const updateInquiryNotes = async (trackingId, notes) => {
    const updated = inquiries.map((item) =>
      item.trackingId === trackingId ? { ...item, notes } : item
    );
    setInquiries(updated);
    localStorage.setItem('nexfero_inquiries', JSON.stringify(updated));

    try {
      await fetch(`/api/admin/enquiries/${trackingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
      });
    } catch (e) {}

    notify(`Saved notes for ${trackingId}`);
  };

  const deleteInquiry = (trackingId) => {
    if (window.confirm(`Delete inquiry ${trackingId} permanently?`)) {
      const updated = inquiries.filter((item) => item.trackingId !== trackingId);
      setInquiries(updated);
      localStorage.setItem('nexfero_inquiries', JSON.stringify(updated));
      if (selectedInquiry?.trackingId === trackingId) setSelectedInquiry(null);
      notify(`Inquiry ${trackingId} removed.`);
    }
  };

  // CSV Export
  const exportCSV = () => {
    if (inquiries.length === 0) {
      alert('No inquiries to export.');
      return;
    }
    let csv = 'Tracking ID,Status,Name,Email,Phone,Service,Budget,Timestamp,Notes,Message\n';
    inquiries.forEach((i) => {
      csv += `"${i.trackingId || ''}","${i.status || 'new'}","${(i.name || '').replace(/"/g, '""')}","${i.email || ''}","${i.phone || ''}","${i.service || ''}","${i.budget || ''}","${i.timestamp || ''}","${(i.notes || '').replace(/"/g, '""')}","${(i.message || '').replace(/"/g, '""')}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nexfero_enquiries_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify('Enquiries exported to CSV successfully.');
  };

  // Filtered inquiries calculation
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.trackingId && item.trackingId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.message && item.message.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesService = serviceFilter === 'all' || item.service === serviceFilter;

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [inquiries, searchTerm, statusFilter, serviceFilter]);

  // Executive Stats
  const stats = useMemo(() => {
    const total = inquiries.length;
    const newCount = inquiries.filter((i) => !i.status || i.status === 'new').length;
    const contacted = inquiries.filter((i) => i.status === 'contacted').length;
    const inProgress = inquiries.filter((i) => i.status === 'in-progress').length;
    return { total, newCount, contacted, inProgress };
  }, [inquiries]);

  return (
    <div className="admin-portal-wrapper" style={{
      minHeight: '100vh',
      backgroundColor: '#000F0F',
      color: '#F1F7F6',
      display: 'flex',
      flexDirection: 'row'
    }}>
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar" style={{
        width: '280px',
        backgroundColor: '#032221',
        borderRight: '1px solid rgba(44, 194, 149, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.8rem 1.2rem',
        flexShrink: 0
      }}>
        <div>
          {/* Brand header */}
          <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <img
              src="/logo.png"
              onError={(e) => { e.currentTarget.src = '/public/logo.png'; }}
              alt="NexFero Logo"
              style={{ height: '42px', width: 'auto', marginBottom: '0.6rem', objectFit: 'contain' }}
            />
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#F9BE4A' }}>
              Executive Console
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setActiveTab('inquiries')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1.1rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'inquiries' ? '#03624C' : 'transparent',
                color: activeTab === 'inquiries' ? '#FFFFFF' : '#A8CDC4',
                fontWeight: activeTab === 'inquiries' ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span>📬</span> Inquiries & Leads
              </span>
              {stats.newCount > 0 && (
                <span style={{
                  backgroundColor: '#00DF81',
                  color: '#000F0F',
                  borderRadius: '12px',
                  padding: '2px 8px',
                  fontSize: '0.75rem',
                  fontWeight: 800
                }}>
                  {stats.newCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1.1rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'projects' ? '#03624C' : 'transparent',
                color: activeTab === 'projects' ? '#FFFFFF' : '#A8CDC4',
                fontWeight: activeTab === 'projects' ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span>🚀</span> 7 Core Projects
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('services')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1.1rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'services' ? '#03624C' : 'transparent',
                color: activeTab === 'services' ? '#FFFFFF' : '#A8CDC4',
                fontWeight: activeTab === 'services' ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span>⚙</span> 7 Official Services
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1.1rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'settings' ? '#03624C' : 'transparent',
                color: activeTab === 'settings' ? '#FFFFFF' : '#A8CDC4',
                fontWeight: activeTab === 'settings' ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span>🔒</span> Security & Settings
            </button>
          </nav>
        </div>

        {/* Sidebar Footer info */}
        <div>
          <div style={{
            backgroundColor: 'rgba(0, 15, 15, 0.65)',
            border: '1px solid rgba(44, 194, 149, 0.2)',
            borderRadius: '8px',
            padding: '0.9rem',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: liveConnected ? '#00DF81' : '#F9BE4A',
                display: 'inline-block'
              }} />
              <span style={{ fontSize: '0.78rem', color: '#A8CDC4' }}>
                {liveConnected ? 'Real-Time SSE Sync' : 'Local Standalone Mode'}
              </span>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#707D7D' }}>
              User: {user?.email || 'admin@nexfero.com'}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={onNavigateHome}
              style={{
                background: 'transparent',
                border: '1px solid rgba(44, 194, 149, 0.35)',
                color: '#2CC295',
                padding: '0.6rem 0.8rem',
                borderRadius: '6px',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              ← Public Website
            </button>
            <button
              type="button"
              onClick={onLogout}
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#FCA5A5',
                padding: '0.6rem 0.8rem',
                borderRadius: '6px',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        padding: '2.5rem 3rem',
        overflowY: 'auto',
        maxHeight: '100vh'
      }}>
        {/* Action toast */}
        {actionNotice && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '25px',
            backgroundColor: '#03624C',
            border: '1px solid #00DF81',
            color: '#FFFFFF',
            padding: '0.85rem 1.4rem',
            borderRadius: '8px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.88rem'
          }}>
            <span>✓</span>
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Tab 1: Inquiries & Leads Management */}
        {activeTab === 'inquiries' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 0.3rem 0', color: '#F1F7F6' }}>
                  Client Inquiries & Business Leads
                </h1>
                <p style={{ margin: 0, color: '#A8CDC4', fontSize: '0.92rem' }}>
                  Manage, track, and update client project requests submitted via the public portal.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={fetchInquiries}
                  style={{
                    backgroundColor: '#032221',
                    border: '1px solid rgba(44, 194, 149, 0.35)',
                    color: '#F1F7F6',
                    padding: '0.65rem 1.1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  ↻ Refresh
                </button>
                <button
                  type="button"
                  onClick={exportCSV}
                  className="btn-gold"
                  style={{
                    padding: '0.65rem 1.2rem',
                    fontSize: '0.85rem'
                  }}
                >
                  📥 Export CSV
                </button>
              </div>
            </div>

            {/* Stat Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.2rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                backgroundColor: '#032221',
                border: '1px solid rgba(44, 194, 149, 0.25)',
                borderRadius: '12px',
                padding: '1.4rem'
              }}>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#A8CDC4', letterSpacing: '0.06em' }}>
                  Total Inquiries
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F1F7F6', marginTop: '0.3rem' }}>
                  {stats.total}
                </div>
              </div>

              <div style={{
                backgroundColor: '#032221',
                border: '1px solid rgba(0, 223, 129, 0.4)',
                borderRadius: '12px',
                padding: '1.4rem'
              }}>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#00DF81', letterSpacing: '0.06em' }}>
                  New / Unhandled
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#00DF81', marginTop: '0.3rem' }}>
                  {stats.newCount}
                </div>
              </div>

              <div style={{
                backgroundColor: '#032221',
                border: '1px solid rgba(249, 190, 74, 0.3)',
                borderRadius: '12px',
                padding: '1.4rem'
              }}>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#F9BE4A', letterSpacing: '0.06em' }}>
                  Contacted
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FFD477', marginTop: '0.3rem' }}>
                  {stats.contacted}
                </div>
              </div>

              <div style={{
                backgroundColor: '#032221',
                border: '1px solid rgba(44, 194, 149, 0.25)',
                borderRadius: '12px',
                padding: '1.4rem'
              }}>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#2CC295', letterSpacing: '0.06em' }}>
                  In Progress
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2CC295', marginTop: '0.3rem' }}>
                  {stats.inProgress}
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              backgroundColor: '#032221',
              padding: '1rem 1.4rem',
              borderRadius: '10px',
              border: '1px solid rgba(44, 194, 149, 0.2)',
              marginBottom: '1.5rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: 1, minWidth: '220px' }}>
                <input
                  type="text"
                  placeholder="Search by name, email, tracking ID, keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem',
                    backgroundColor: '#000F0F',
                    border: '1px solid rgba(44, 194, 149, 0.3)',
                    borderRadius: '6px',
                    color: '#F1F7F6',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', color: '#A8CDC4' }}>Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    backgroundColor: '#000F0F',
                    color: '#F1F7F6',
                    border: '1px solid rgba(44, 194, 149, 0.3)',
                    borderRadius: '6px',
                    padding: '0.6rem 0.8rem',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', color: '#A8CDC4' }}>Service:</span>
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  style={{
                    backgroundColor: '#000F0F',
                    color: '#F1F7F6',
                    border: '1px solid rgba(44, 194, 149, 0.3)',
                    borderRadius: '6px',
                    padding: '0.6rem 0.8rem',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="all">All Services</option>
                  {Object.values(SERVICES_DATA).map((s) => (
                    <option key={s.key} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Inquiries Table */}
            <div style={{
              backgroundColor: '#032221',
              border: '1px solid rgba(44, 194, 149, 0.25)',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#063028', borderBottom: '1px solid rgba(44, 194, 149, 0.25)', color: '#A8CDC4' }}>
                    <th style={{ padding: '0.9rem 1.2rem' }}>Tracking ID</th>
                    <th style={{ padding: '0.9rem 1.2rem' }}>Status</th>
                    <th style={{ padding: '0.9rem 1.2rem' }}>Client Name</th>
                    <th style={{ padding: '0.9rem 1.2rem' }}>Service Requested</th>
                    <th style={{ padding: '0.9rem 1.2rem' }}>Budget</th>
                    <th style={{ padding: '0.9rem 1.2rem' }}>Date</th>
                    <th style={{ padding: '0.9rem 1.2rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#A8CDC4' }}>
                        No matching inquiries found. Test submitting a message from the public contact form!
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inquiry) => {
                      const statusColors = {
                        new: { bg: 'rgba(0, 223, 129, 0.2)', text: '#00DF81', border: '#00DF81' },
                        contacted: { bg: 'rgba(249, 190, 74, 0.2)', text: '#FFD477', border: '#F9BE4A' },
                        'in-progress': { bg: 'rgba(44, 194, 149, 0.2)', text: '#2CC295', border: '#2CC295' },
                        completed: { bg: 'rgba(255, 255, 255, 0.1)', text: '#FFFFFF', border: '#707D7D' },
                        archived: { bg: 'rgba(112, 125, 125, 0.2)', text: '#707D7D', border: '#707D7D' }
                      };
                      const currStatus = inquiry.status || 'new';
                      const color = statusColors[currStatus] || statusColors.new;

                      return (
                        <tr
                          key={inquiry.trackingId || Math.random()}
                          style={{
                            borderBottom: '1px solid rgba(44, 194, 149, 0.15)',
                            backgroundColor: selectedInquiry?.trackingId === inquiry.trackingId ? 'rgba(3, 98, 76, 0.35)' : 'transparent'
                          }}
                        >
                          <td style={{ padding: '0.9rem 1.2rem', fontFamily: 'monospace', fontWeight: 700, color: '#F9BE4A' }}>
                            {inquiry.trackingId}
                          </td>
                          <td style={{ padding: '0.9rem 1.2rem' }}>
                            <select
                              value={currStatus}
                              onChange={(e) => updateInquiryStatus(inquiry.trackingId, e.target.value)}
                              style={{
                                backgroundColor: color.bg,
                                color: color.text,
                                border: `1px solid ${color.border}`,
                                borderRadius: '12px',
                                padding: '3px 8px',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              <option value="new" style={{ background: '#000F0F', color: '#00DF81' }}>New</option>
                              <option value="contacted" style={{ background: '#000F0F', color: '#FFD477' }}>Contacted</option>
                              <option value="in-progress" style={{ background: '#000F0F', color: '#2CC295' }}>In Progress</option>
                              <option value="completed" style={{ background: '#000F0F', color: '#FFFFFF' }}>Completed</option>
                              <option value="archived" style={{ background: '#000F0F', color: '#707D7D' }}>Archived</option>
                            </select>
                          </td>
                          <td style={{ padding: '0.9rem 1.2rem' }}>
                            <div style={{ fontWeight: 600, color: '#F1F7F6' }}>{inquiry.name}</div>
                            <div style={{ fontSize: '0.78rem', color: '#A8CDC4' }}>{inquiry.email}</div>
                          </td>
                          <td style={{ padding: '0.9rem 1.2rem', color: '#F1F7F6' }}>
                            {inquiry.service}
                          </td>
                          <td style={{ padding: '0.9rem 1.2rem', color: '#FFD477', fontSize: '0.82rem' }}>
                            {inquiry.budget || 'Flexible'}
                          </td>
                          <td style={{ padding: '0.9rem 1.2rem', color: '#707D7D', fontSize: '0.8rem' }}>
                            {inquiry.timestamp ? new Date(inquiry.timestamp).toLocaleDateString() : 'Recent'}
                          </td>
                          <td style={{ padding: '0.9rem 1.2rem', textAlign: 'right' }}>
                            <button
                              type="button"
                              onClick={() => setSelectedInquiry(inquiry)}
                              style={{
                                background: 'transparent',
                                border: '1px solid rgba(44, 194, 149, 0.4)',
                                color: '#2CC295',
                                borderRadius: '4px',
                                padding: '4px 10px',
                                fontSize: '0.78rem',
                                cursor: 'pointer',
                                marginRight: '0.5rem'
                              }}
                            >
                              Inspect
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteInquiry(inquiry.trackingId)}
                              style={{
                                background: 'transparent',
                                border: '1px solid rgba(239, 68, 68, 0.4)',
                                color: '#FCA5A5',
                                borderRadius: '4px',
                                padding: '4px 10px',
                                fontSize: '0.78rem',
                                cursor: 'pointer'
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Selected Inquiry Modal / Detail Drawer */}
            {selectedInquiry && (
              <div style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 15, 15, 0.85)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: '1.5rem'
              }}>
                <div style={{
                  backgroundColor: '#032221',
                  border: '1px solid #F9BE4A',
                  borderRadius: '16px',
                  maxWidth: '680px',
                  width: '100%',
                  padding: '2.5rem',
                  maxHeight: '85vh',
                  overflowY: 'auto',
                  position: 'relative',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
                }}>
                  <button
                    type="button"
                    onClick={() => setSelectedInquiry(null)}
                    style={{
                      position: 'absolute',
                      top: '1.5rem',
                      right: '1.5rem',
                      background: 'none',
                      border: 'none',
                      color: '#A8CDC4',
                      fontSize: '1.4rem',
                      cursor: 'pointer'
                    }}
                  >
                    ✕
                  </button>

                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <span style={{
                      backgroundColor: 'rgba(249, 190, 74, 0.2)',
                      color: '#FFD477',
                      border: '1px solid #F9BE4A',
                      borderRadius: '6px',
                      padding: '3px 10px',
                      fontFamily: 'monospace',
                      fontWeight: 700
                    }}>
                      {selectedInquiry.trackingId}
                    </span>
                    <span style={{ color: '#2CC295', fontSize: '0.85rem' }}>
                      Status: <strong>{selectedInquiry.status || 'new'}</strong>
                    </span>
                  </div>

                  <h2 style={{ margin: '0 0 1rem 0', color: '#FFFFFF' }}>{selectedInquiry.name}</h2>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem',
                    backgroundColor: '#000F0F',
                    padding: '1.2rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                    fontSize: '0.88rem'
                  }}>
                    <div>
                      <div style={{ color: '#707D7D', fontSize: '0.78rem' }}>Email</div>
                      <a href={`mailto:${selectedInquiry.email}`} style={{ color: '#00DF81' }}>{selectedInquiry.email}</a>
                    </div>
                    <div>
                      <div style={{ color: '#707D7D', fontSize: '0.78rem' }}>Phone</div>
                      <div style={{ color: '#F1F7F6' }}>{selectedInquiry.phone || 'N/A'}</div>
                    </div>
                    <div>
                      <div style={{ color: '#707D7D', fontSize: '0.78rem' }}>Service</div>
                      <div style={{ color: '#FFD477' }}>{selectedInquiry.service}</div>
                    </div>
                    <div>
                      <div style={{ color: '#707D7D', fontSize: '0.78rem' }}>Company</div>
                      <div style={{ color: '#F1F7F6' }}>{selectedInquiry.company || 'Not Specified'}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ color: '#F9BE4A', margin: '0 0 0.5rem 0', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                      Client Project Requirements
                    </h4>
                    <p style={{
                      backgroundColor: '#063028',
                      padding: '1rem',
                      borderRadius: '8px',
                      color: '#F1F7F6',
                      lineHeight: 1.6,
                      margin: 0,
                      whiteSpace: 'pre-wrap'
                    }}>
                      {selectedInquiry.message}
                    </p>
                  </div>

                  <div style={{ marginBottom: '1.8rem' }}>
                    <h4 style={{ color: '#2CC295', margin: '0 0 0.5rem 0', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                      Executive Engineering Notes
                    </h4>
                    <textarea
                      rows={3}
                      defaultValue={selectedInquiry.notes || ''}
                      placeholder="Add private technical notes, follow-up timeline, or assignee..."
                      onBlur={(e) => updateInquiryNotes(selectedInquiry.trackingId, e.target.value)}
                      style={{
                        width: '100%',
                        backgroundColor: '#000F0F',
                        border: '1px solid rgba(44, 194, 149, 0.3)',
                        borderRadius: '8px',
                        color: '#F1F7F6',
                        padding: '0.8rem',
                        fontSize: '0.88rem',
                        boxSizing: 'border-box'
                      }}
                    />
                    <div style={{ fontSize: '0.75rem', color: '#707D7D', marginTop: '0.3rem' }}>
                      Auto-saves when clicking outside the box.
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
                    <a
                      href={`mailto:${selectedInquiry.email}?subject=NexFero Innovations - Follow-up on Inquiry ${selectedInquiry.trackingId}`}
                      className="btn-gold"
                      style={{ textDecoration: 'none', padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}
                    >
                      Email Client Directly →
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: 7 Core Projects Showcase */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 0.3rem 0', color: '#F1F7F6' }}>
                7 Core NexFero Engineering Projects
              </h1>
              <p style={{ margin: 0, color: '#A8CDC4', fontSize: '0.92rem' }}>
                Catalog of proprietary prototypes, research builds, and engineering implementations.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '1.5rem'
            }}>
              {PROJECTS_DATA.map((proj) => (
                <div key={proj.id} style={{
                  backgroundColor: '#032221',
                  border: '1px solid rgba(44, 194, 149, 0.3)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ height: '180px', position: 'relative', backgroundColor: '#000F0F' }}>
                    <Section3DVisual type={proj.visualType} width={360} height={180} />
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(3, 98, 76, 0.85)',
                      color: '#00DF81',
                      borderRadius: '6px',
                      padding: '2px 8px',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}>
                      {proj.category}
                    </span>
                  </div>

                  <div style={{ padding: '1.4rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.4rem 0', color: '#FFFFFF', fontSize: '1.15rem' }}>{proj.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: '#A8CDC4', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
                        {proj.fullDescription}
                      </p>
                    </div>

                    <div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.8rem' }}>
                        {proj.technologies.map((t, idx) => (
                          <span key={idx} style={{
                            backgroundColor: '#063028',
                            border: '1px solid rgba(44, 194, 149, 0.3)',
                            borderRadius: '4px',
                            color: '#FFD477',
                            padding: '2px 8px',
                            fontSize: '0.74rem'
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#707D7D' }}>
                        3D Engine: <code style={{ color: '#00DF81' }}>{proj.visualType}</code>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: 7 Official Services Showcase */}
        {activeTab === 'services' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 0.3rem 0', color: '#F1F7F6' }}>
                7 Official NexFero Technology Services
              </h1>
              <p style={{ margin: 0, color: '#A8CDC4', fontSize: '0.92rem' }}>
                Current production offerings, capabilities, and deliverables managed by NexFero engineering teams.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {Object.values(SERVICES_DATA).map((srv) => (
                <div key={srv.key} style={{
                  backgroundColor: '#032221',
                  border: '1px solid rgba(44, 194, 149, 0.3)',
                  borderRadius: '12px',
                  padding: '1.8rem',
                  display: 'grid',
                  gridTemplateColumns: '2fr 1.5fr 1fr',
                  gap: '1.5rem',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                      <span style={{
                        backgroundColor: '#03624C',
                        color: '#00DF81',
                        borderRadius: '6px',
                        padding: '2px 8px',
                        fontSize: '0.74rem',
                        fontWeight: 700
                      }}>
                        {srv.badge}
                      </span>
                    </div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#FFFFFF', fontSize: '1.25rem' }}>{srv.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: '#A8CDC4', margin: 0, lineHeight: 1.5 }}>
                      {srv.description}
                    </p>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#FFD477', marginBottom: '0.4rem' }}>
                      Core Capabilities
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#F1F7F6', fontSize: '0.82rem', lineHeight: 1.6 }}>
                      {srv.capabilities.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#2CC295', marginBottom: '0.4rem' }}>
                      Technologies
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {srv.technologies.map((t, i) => (
                        <span key={i} style={{
                          backgroundColor: '#000F0F',
                          border: '1px solid rgba(44, 194, 149, 0.25)',
                          borderRadius: '4px',
                          color: '#A8CDC4',
                          padding: '2px 6px',
                          fontSize: '0.72rem'
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Security & System Settings */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '720px' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 0.3rem 0', color: '#F1F7F6' }}>
                Executive Security & Configuration
              </h1>
              <p style={{ margin: 0, color: '#A8CDC4', fontSize: '0.92rem' }}>
                Security parameters, system health, and storage integrity diagnostics.
              </p>
            </div>

            <div style={{
              backgroundColor: '#032221',
              border: '1px solid rgba(44, 194, 149, 0.3)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ color: '#FFFFFF', marginTop: 0 }}>System Health Telemetry</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', fontSize: '0.88rem' }}>
                <div style={{ backgroundColor: '#000F0F', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ color: '#707D7D', fontSize: '0.78rem' }}>Node Server Status</div>
                  <div style={{ color: '#00DF81', fontWeight: 700, marginTop: '0.2rem' }}>● OPERATIONAL (Port 3000)</div>
                </div>
                <div style={{ backgroundColor: '#000F0F', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ color: '#707D7D', fontSize: '0.78rem' }}>Data Persistence Engine</div>
                  <div style={{ color: '#FFD477', fontWeight: 700, marginTop: '0.2rem' }}>JSON / SQLite File Engine</div>
                </div>
                <div style={{ backgroundColor: '#000F0F', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ color: '#707D7D', fontSize: '0.78rem' }}>Registered Head Office</div>
                  <div style={{ color: '#F1F7F6', fontWeight: 700, marginTop: '0.2rem' }}>Chennai, Tamil Nadu, India</div>
                </div>
                <div style={{ backgroundColor: '#000F0F', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ color: '#707D7D', fontSize: '0.78rem' }}>Administrative Email</div>
                  <div style={{ color: '#2CC295', fontWeight: 700, marginTop: '0.2rem' }}>nexferoinnovations@gmail.com</div>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: '#032221',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              padding: '2rem'
            }}>
              <h3 style={{ color: '#FCA5A5', marginTop: 0 }}>Storage Maintenance</h3>
              <p style={{ fontSize: '0.85rem', color: '#A8CDC4', lineHeight: 1.5 }}>
                Purge browser cached inquiries if you wish to reset test leads stored inside your local client state.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Clear all local browser cached inquiries?')) {
                    localStorage.removeItem('nexfero_inquiries');
                    setInquiries([]);
                    notify('Local inquiry cache cleared.');
                  }
                }}
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid #EF4444',
                  color: '#FCA5A5',
                  padding: '0.65rem 1.2rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Clear Client Storage Cache
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
