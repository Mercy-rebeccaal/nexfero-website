/**
 * NexFero Innovations - Full-Stack Production & Local Backend Server
 * 
 * Supports:
 * - High-speed zero-dependency native Node.js HTTP server
 * - SQLite / JSON file persistent storage for client inquiries & admin state
 * - RESTful Endpoints:
 *     POST   /api/contact             - Public inquiry submission
 *     GET    /api/contacts            - Retrieve all inquiries
 *     POST   /api/admin/login         - Secure administrative authentication
 *     GET    /api/admin/stats         - System metrics & lead analytics
 *     PUT    /api/admin/enquiries/:id - Update status & technical notes
 *     DELETE /api/admin/enquiries/:id - Remove an inquiry
 *     GET    /api/admin/events        - Server-Sent Events (SSE) live stream
 *     GET    /api/health              - Server telemetry
 * - SPA Fallback Routing (routes all frontend subpaths to index.html)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'contacts.json');

// Initialize data storage file if missing
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
}

// SSE Clients List for real-time live broadcasts
const sseClients = new Set();

function broadcastSSE(type, data) {
  const message = `data: ${JSON.stringify({ type, data, timestamp: new Date().toISOString() })}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(message);
    } catch (e) {
      sseClients.delete(client);
    }
  }
}

// MIME types for static assets
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

// Data Helper Functions
function getInquiries() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading inquiries:', err);
    return [];
  }
}

function saveInquiries(list) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing inquiries:', err);
    return false;
  }
}

function addInquiry(inquiry) {
  const list = getInquiries();
  list.unshift(inquiry);
  saveInquiries(list);
  return inquiry;
}

// HTTP Server
const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // -------------------------------------------------------------
  // 1. API: POST /api/contact (Public Inquiry Submission)
  // -------------------------------------------------------------
  if (pathname === '/api/contact' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');

        if (!payload.name || !payload.email || !payload.message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'error', message: 'Name, email, and message are required.' }));
          return;
        }

        const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
        let randCode = '';
        for (let i = 0; i < 5; i++) randCode += chars.charAt(Math.floor(Math.random() * chars.length));
        const trackingId = payload.trackingId || `NXF-${randCode}`;

        const record = {
          trackingId: trackingId,
          status: 'new',
          name: payload.name.trim(),
          email: payload.email.trim(),
          phone: payload.phone ? payload.phone.trim() : 'Not provided',
          company: payload.company ? payload.company.trim() : 'Individual Client',
          service: payload.service || 'General Inquiry',
          budget: payload.budget || 'Flexible',
          message: payload.message.trim(),
          notes: '',
          timestamp: new Date().toISOString(),
          ip: req.socket.remoteAddress || '127.0.0.1'
        };

        addInquiry(record);
        console.log(`[NexFero Inquiries] Lead received: ${trackingId} (${record.name} - ${record.service})`);

        // Broadcast live SSE to connected admin dashboards
        broadcastSSE('NEW_INQUIRY', record);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          status: 'success',
          trackingId: trackingId,
          message: 'Inquiry successfully registered in NexFero system.',
          record: record
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'error', message: 'Invalid JSON payload.' }));
      }
    });
    return;
  }

  // -------------------------------------------------------------
  // 2. API: GET /api/contacts or /api/admin/enquiries
  // -------------------------------------------------------------
  if ((pathname === '/api/contacts' || pathname === '/api/admin/enquiries') && req.method === 'GET') {
    const list = getInquiries();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'success',
      count: list.length,
      contacts: list
    }));
    return;
  }

  // -------------------------------------------------------------
  // 3. API: POST /api/admin/login
  // -------------------------------------------------------------
  if (pathname === '/api/admin/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const creds = JSON.parse(body || '{}');
        const email = (creds.email || '').trim().toLowerCase();
        const password = creds.password || '';

        // Authorized Administrative Accounts
        let authorizedUser = null;
        if (email === 'karthisuhilan07@gmail.com' && password === 'Karthi@0709') {
          authorizedUser = {
            id: 'nxf-adm-karthi',
            email: 'karthisuhilan07@gmail.com',
            name: 'Karthi Suhilan',
            role: 'Executive Administrator',
            location: 'Chennai, India'
          };
        } else if (email === 'mercy2005rebeccal@gmail.com' && password === 'Mercy@123') {
          authorizedUser = {
            id: 'nxf-adm-mercy',
            email: 'mercy2005rebeccal@gmail.com',
            name: 'Mercy Rebeccal',
            role: 'Executive Administrator',
            location: 'Chennai, India'
          };
        }

        if (authorizedUser) {
          const token = `nxf_jwt_${Buffer.from(JSON.stringify({ id: authorizedUser.id, email: authorizedUser.email, time: Date.now() })).toString('base64')}`;

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: 'success',
            token: token,
            user: authorizedUser
          }));
          return;
        }

        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          status: 'error',
          message: 'Invalid administrative credentials. Access restricted.'
        }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'error', message: 'Malformed JSON login payload.' }));
      }
    });
    return;
  }

  // -------------------------------------------------------------
  // 4. API: PUT /api/admin/enquiries/:id (Update Status or Notes)
  // -------------------------------------------------------------
  if (pathname.startsWith('/api/admin/enquiries/') && req.method === 'PUT') {
    const trackingId = pathname.replace('/api/admin/enquiries/', '');
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const update = JSON.parse(body || '{}');
        const list = getInquiries();
        const index = list.findIndex(i => i.trackingId === trackingId);

        if (index === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'error', message: 'Inquiry not found.' }));
          return;
        }

        if (update.status) list[index].status = update.status;
        if (update.notes !== undefined) list[index].notes = update.notes;

        saveInquiries(list);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'success', record: list[index] }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'error', message: 'Invalid payload.' }));
      }
    });
    return;
  }

  // -------------------------------------------------------------
  // 5. API: DELETE /api/admin/enquiries/:id
  // -------------------------------------------------------------
  if (pathname.startsWith('/api/admin/enquiries/') && req.method === 'DELETE') {
    const trackingId = pathname.replace('/api/admin/enquiries/', '');
    const list = getInquiries();
    const filtered = list.filter(i => i.trackingId !== trackingId);
    saveInquiries(filtered);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'success', message: 'Inquiry removed.' }));
    return;
  }

  // -------------------------------------------------------------
  // 6. API: GET /api/admin/stats
  // -------------------------------------------------------------
  if (pathname === '/api/admin/stats' && req.method === 'GET') {
    const list = getInquiries();
    const stats = {
      total: list.length,
      new: list.filter(i => !i.status || i.status === 'new').length,
      contacted: list.filter(i => i.status === 'contacted').length,
      inProgress: list.filter(i => i.status === 'in-progress').length,
      completed: list.filter(i => i.status === 'completed').length,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'success', stats }));
    return;
  }

  // -------------------------------------------------------------
  // 7. API: GET /api/admin/events (Server-Sent Events)
  // -------------------------------------------------------------
  if (pathname === '/api/admin/events' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.write(`data: ${JSON.stringify({ type: 'CONNECTED', message: 'NexFero SSE Connected' })}\n\n`);
    sseClients.add(res);

    req.on('close', () => {
      sseClients.delete(res);
    });
    return;
  }

  // -------------------------------------------------------------
  // 8. API: GET /api/health
  // -------------------------------------------------------------
  if (pathname === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      service: 'NexFero Innovations Backend Engine',
      version: '2.0.0',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // -------------------------------------------------------------
  // 9. Static File Server & SPA Routing Fallback
  // -------------------------------------------------------------
  const distDir = path.join(__dirname, 'dist');
  const hasDist = fs.existsSync(distDir);
  const baseDir = hasDist ? distDir : __dirname;

  let safePath = pathname === '/' ? '/index.html' : pathname;
  let filePath = path.join(baseDir, safePath);

  // If file doesn't exist in dist, check root or public folder
  if (!fs.existsSync(filePath)) {
    const altPath = path.join(__dirname, safePath);
    if (fs.existsSync(altPath)) {
      filePath = altPath;
    } else {
      const pubPath = path.join(__dirname, 'public', safePath);
      if (fs.existsSync(pubPath)) {
        filePath = pubPath;
      }
    }
  }

  // Security check: directory traversal prevention
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    // If not a static file and not an API call -> SPA Fallback to index.html
    if (err || !stats.isFile()) {
      const spaIndex = hasDist ? path.join(distDir, 'index.html') : path.join(__dirname, 'index.html');
      if (fs.existsSync(spaIndex)) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream(spaIndex).pipe(res);
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400'
    });

    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  NEXFERO INNOVATIONS - SERVER ENGINE ONLINE`);
  console.log(`  "Beyond Ideas. Beyond Limits."`);
  console.log(`  Local Portal:  http://localhost:${PORT}`);
  console.log(`  Admin Portal:  http://localhost:${PORT}/admin`);
  console.log(`  API Health:    http://localhost:${PORT}/api/health`);
  console.log(`  SSE Stream:    http://localhost:${PORT}/api/admin/events`);
  console.log(`====================================================`);
});
