import fs from 'fs';
import path from 'path';
import { Plugin } from 'vite';
import { exec } from 'child_process';

const POSITIONS_ROOT = path.resolve(__dirname, 'positions.json');
const POSITIONS_SRC = path.resolve(__dirname, 'src', 'positions.json');
const CONTENT_SRC = path.resolve(__dirname, 'src', 'siteContent.json');
const INQUIRIES_ROOT = path.resolve(__dirname, 'inquiries.json');
const INQUIRIES_SRC = path.resolve(__dirname, 'src', 'inquiries.json');

function readPositions() {
  try {
    if (fs.existsSync(POSITIONS_SRC)) {
      return JSON.parse(fs.readFileSync(POSITIONS_SRC, 'utf-8'));
    }
    if (fs.existsSync(POSITIONS_ROOT)) {
      return JSON.parse(fs.readFileSync(POSITIONS_ROOT, 'utf-8'));
    }
  } catch (e) {
    console.error('[vite-plugin-positions] Error reading positions:', e);
  }
  return { elementOffsets: {}, sectionOrder: ['hero', 'services', 'about', 'projects', 'journey', 'contact', 'faq'] };
}

function writePositions(data: any) {
  const formatted = JSON.stringify(data, null, 2);
  try {
    fs.writeFileSync(POSITIONS_SRC, formatted, 'utf-8');
    fs.writeFileSync(POSITIONS_ROOT, formatted, 'utf-8');
  } catch (e) {
    console.error('[vite-plugin-positions] Error writing positions:', e);
  }
}

function readContent() {
  try {
    if (fs.existsSync(CONTENT_SRC)) {
      return JSON.parse(fs.readFileSync(CONTENT_SRC, 'utf-8'));
    }
  } catch (e) {
    console.error('[vite-plugin-positions] Error reading content:', e);
  }
  return {};
}

function writeContent(data: any) {
  try {
    fs.writeFileSync(CONTENT_SRC, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('[vite-plugin-positions] Error writing content:', e);
  }
}

function readInquiries(): any[] {
  try {
    if (fs.existsSync(INQUIRIES_SRC)) {
      return JSON.parse(fs.readFileSync(INQUIRIES_SRC, 'utf-8'));
    }
    if (fs.existsSync(INQUIRIES_ROOT)) {
      return JSON.parse(fs.readFileSync(INQUIRIES_ROOT, 'utf-8'));
    }
  } catch (e) {
    console.error('[vite-plugin-positions] Error reading inquiries:', e);
  }
  return [];
}

function writeInquiries(inquiries: any[]) {
  try {
    const formatted = JSON.stringify(inquiries, null, 2);
    fs.writeFileSync(INQUIRIES_ROOT, formatted, 'utf-8');
  } catch (e) {
    console.error('[vite-plugin-positions] Error saving inquiries:', e);
  }
}

let buildTimer: ReturnType<typeof setTimeout> | null = null;
let isBuilding = false;
let buildQueued = false;

function executeBuild(): Promise<{ success: boolean; output?: string; error?: string }> {
  return new Promise((resolve) => {
    if (isBuilding) {
      buildQueued = true;
      resolve({ success: true, output: 'Build already in progress, queued next build.' });
      return;
    }

    isBuilding = true;
    console.log('[Auto-Publish] Updating and building production files to dist/ ...');

    // Run build using npm.cmd on Windows
    exec('npm.cmd run build', { cwd: __dirname }, (error, stdout, stderr) => {
      isBuilding = false;
      if (error) {
        console.error('[Auto-Publish] Build failed:', stderr || error.message);
        resolve({ success: false, error: stderr || error.message });
      } else {
        console.log('[Auto-Publish] Build completed successfully! dist/ is up to date.');
        resolve({ success: true, output: stdout });
      }

      if (buildQueued) {
        buildQueued = false;
        setTimeout(() => executeBuild(), 500);
      }
    });
  });
}

function scheduleAutoBuild(delayMs = 2500) {
  if (buildTimer) clearTimeout(buildTimer);
  buildTimer = setTimeout(() => {
    executeBuild();
  }, delayMs);
}

export default function positionsPlugin(): Plugin {
  return {
    name: 'vite-plugin-positions',
    transformIndexHtml(html) {
      const positions = readPositions();
      const script = `<script>window.__POSITIONS__=${JSON.stringify(positions)}</script>`;
      return html.replace('</head>', `${script}</head>`);
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // GET /api/positions
        if (req.url === '/api/positions' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify(readPositions()));
          return;
        }

        // POST /api/positions - save directly to src/positions.json and positions.json
        if (req.url === '/api/positions' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              writePositions(data);
              scheduleAutoBuild(2500);
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(JSON.stringify({ success: true, savedToSrc: true }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
          });
          return;
        }

        // GET /api/content
        if (req.url === '/api/content' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify(readContent()));
          return;
        }

        // POST /api/content - save directly to src/siteContent.json
        if (req.url === '/api/content' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              writeContent(data);
              scheduleAutoBuild(1000);
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(JSON.stringify({ success: true, savedToSrc: true }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
          });
          return;
        }

        // POST /api/publish - immediately compile and update dist/
        if (req.url === '/api/publish' && req.method === 'POST') {
          executeBuild().then((result) => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            if (result.success) {
              res.end(JSON.stringify({ success: true, message: 'Published to dist successfully' }));
            } else {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: result.error }));
            }
          });
          return;
        }

        // GET /api/inquiries - list all received client inquiries
        if (req.url === '/api/inquiries' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify(readInquiries()));
          return;
        }

        // POST /api/contact - handle direct contact inquiries
        if (req.url === '/api/contact' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const inquiries = readInquiries();
              const newEntry = {
                id: 'inq_' + Date.now(),
                date: new Date().toISOString(),
                formattedDate: new Date().toLocaleString(),
                ...data
              };
              inquiries.unshift(newEntry);
              writeInquiries(inquiries);

              console.log('\n======================================================');
              console.log('📬 NEW PROJECT INQUIRY RECEIVED FOR UZAIR CREATES!');
              console.log('👤 Name:    ', data.name || data['Client Name'] || 'Not provided');
              console.log('📧 Email:   ', data.email || data['Client Email'] || 'Not provided');
              console.log('📞 Phone:   ', data.phone || data['Client Phone'] || 'Not provided');
              console.log('🎯 Service: ', data.service || data['Selected Service'] || data.interest || 'Not specified');
              console.log('💰 Budget:  ', data.budget || data['Budget Range'] || 'Not specified');
              console.log('🌍 Country: ', data.country || data['Country'] || 'Not specified');
              console.log('📝 Message: ', data.message || data['Message & Requirements'] || 'No message');
              console.log('======================================================\n');

              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(JSON.stringify({ success: true, saved: true, id: newEntry.id }));
            } catch (err: any) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(JSON.stringify({ error: err.message || 'Invalid JSON' }));
            }
          });
          return;
        }

        // OPTIONS preflight
        if ((req.url?.startsWith('/api/')) && req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.end();
          return;
        }

        next();
      });
    },
  };
}
