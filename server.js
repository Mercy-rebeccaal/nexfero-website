/**
 * NexFero Innovations - Production & Local Backend Server
 * 
 * Supports:
 * - Express.js when dependencies are installed
 * - Built-in native Node.js HTTP server fallback (Zero dependencies required!)
 * - SQLite / JSON file persistent storage for contact inquiries
 * - Serves frontend static files
 * - RESTful endpoints:
 *     POST /api/contact  - Submit project inquiry
 *     GET  /api/contacts - Retrieve inquiries (Founder portal)
 *     GET  /api/health   - Server health check
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'contacts.json');

// Ensure data storage file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
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

// Read inquiries from disk
function getInquiries() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading inquiries:', err);
    return [];
  }
}

// Save inquiry to disk
function saveInquiry(inquiry) {
  const list = getInquiries();
  list.unshift(inquiry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf8');
  return inquiry;
}

// Native HTTP Server Handler
const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // 1. API: POST /api/contact
  if (pathname === '/api/contact' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');

        // Validation
        if (!payload.name || !payload.email || !payload.message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: 'error',
            message: 'Validation failed: name, email, and message are required.'
          }));
          return;
        }

        const trackingId = payload.trackingId || `NXF-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
        const record = {
          trackingId: trackingId,
          name: payload.name.trim(),
          email: payload.email.trim(),
          phone: payload.phone ? payload.phone.trim() : 'Not provided',
          service: payload.service || 'General Inquiry',
          budget: payload.budget || 'Flexible',
          message: payload.message.trim(),
          timestamp: new Date().toISOString(),
          ip: req.socket.remoteAddress || '127.0.0.1'
        };

        saveInquiry(record);
        console.log(`[NexFero Inquiries] New inquiry received: ${trackingId} from ${record.email} (${record.service})`);

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

  // 2. API: GET /api/contacts
  if (pathname === '/api/contacts' && req.method === 'GET') {
    const list = getInquiries();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'success',
      count: list.length,
      contacts: list
    }));
    return;
  }

  // 3. API: GET /api/health
  if (pathname === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      service: 'NexFero Innovations Backend',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // 4. Static File Server (Serves dist/ if compiled with Vite, otherwise root)
  const distDir = path.join(__dirname, 'dist');
  const hasDist = fs.existsSync(distDir);
  const baseDir = hasDist ? distDir : __dirname;

  let safePath = pathname === '/' ? '/index.html' : pathname;
  let filePath = path.join(baseDir, safePath);

  // If not found in dist, check root/public folder
  if (!fs.existsSync(filePath)) {
    const altPath = path.join(__dirname, safePath);
    if (fs.existsSync(altPath)) {
      filePath = altPath;
    }
  }

  // Security: prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Try 404.html
      const notFoundPath = path.join(__dirname, '404.html');
      if (fs.existsSync(notFoundPath)) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream(notFoundPath).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      }
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
  console.log(`  NEXFERO INNOVATIONS - SERVER ONLINE`);
  console.log(`  "Beyond Ideas. Beyond Limits."`);
  console.log(`  Local URL:   http://localhost:${PORT}`);
  console.log(`  API Health:  http://localhost:${PORT}/api/health`);
  console.log(`  Inquiries:   http://localhost:${PORT}/api/contacts`);
  console.log(`====================================================`);
});

