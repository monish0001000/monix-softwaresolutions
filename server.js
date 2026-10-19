import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

let nodemailer = null;
try {
  const nodemailerMod = await import('nodemailer');
  nodemailer = nodemailerMod.default || nodemailerMod;
} catch (e) {
  // nodemailer optional
}

let compression = null;
try {
  const compressionMod = await import('compression');
  compression = compressionMod.default || compressionMod;
} catch (e) {
  // compression optional
}

const app = express();
const PORT = 3000;

// Gzip & Brotli HTTP compression for text, CSS, JS, SVG, and HTML
if (compression) {
  app.use(compression({
    level: 9,
    threshold: 0
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const portfolioPath = path.join(__dirname, 'Portfolio');

// Serve static files from the Portfolio folder with HTTP cache controls
app.use(express.static(portfolioPath, {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else if (filePath.match(/\.(webp|png|jpg|jpeg|svg|gif|woff|woff2|ttf|eot)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      if (filePath.endsWith('.webp')) {
        res.setHeader('Content-Type', 'image/webp');
      } else if (filePath.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      }
    } else if (filePath.match(/\.(css|js)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=86400, must-revalidate');
      if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=UTF-8');
      } else if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
      }
    }
  }
}));

// Configure Nodemailer Transporter
const getEmailTransporter = () => {
  if (!nodemailer) {
    return {
      sendMail: async (opts) => {
        console.log('[Email Info] Simulated sending to:', opts.to, '| Subject:', opts.subject);
        return { messageId: 'simulated-' + Date.now() };
      }
    };
  }
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  } else {
    // Fallback sendmail / json transport
    return nodemailer.createTransport({
      jsonTransport: true
    });
  }
};

// Helper function to escape HTML special characters for Telegram HTML parse_mode
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Backend API endpoint for enrollment and enquiry form submissions
app.post(['/api/enroll', '/api/enquiry'], async (req, res) => {
  try {
    const { name, phone, email, program, subject, message: userMessage, dynamicLabel, dynamicVal, source, url } = req.body;

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // 1. Fail-Safe Local Storage Backup
    const backupFile = path.join(__dirname, 'enrollments.json');
    let enrollments = [];
    if (fs.existsSync(backupFile)) {
      try {
        enrollments = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
      } catch (e) {
        console.error('Error reading backup file:', e);
      }
    }
    const newEntry = { timestamp, name, phone, email, program, subject, message: userMessage, dynamicLabel, dynamicVal, source, url };
    enrollments.push(newEntry);
    fs.writeFileSync(backupFile, JSON.stringify(enrollments, null, 2), 'utf8');

    // 2. Telegram Bot Integration (with HTML escaping)
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8251796240:AAGPRIAZH50aUl6Vlmtu1ZKOFmANOiH2lYc";
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "-1003676902980";
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const cleanSource = escapeHtml(source || 'Website');
    const cleanName = escapeHtml(name || 'N/A');
    const cleanPhone = escapeHtml(phone || 'N/A');
    const cleanEmail = escapeHtml(email || 'N/A');
    const cleanProgram = escapeHtml(program || '');
    const cleanSubject = escapeHtml(subject || '');
    const cleanDynamicLabel = escapeHtml(dynamicLabel || '');
    const cleanDynamicVal = escapeHtml(dynamicVal || '');
    const cleanMessage = escapeHtml(userMessage || '');

    const sheetViewUrl = process.env.GOOGLE_SHEET_VIEW_URL || process.env.GOOGLE_SHEET_LINK || process.env.GOOGLE_SHEETS_URL || "";
    const sheetLine = sheetViewUrl && sheetViewUrl.startsWith('http')
      ? `\n📊 <b>Google Sheet:</b> <a href="${escapeHtml(sheetViewUrl)}">Open Leads Database ↗</a>`
      : `\n📊 <b>Google Sheet:</b> <a href="https://docs.google.com/spreadsheets">Open Sheets Tracker ↗</a>`;

    const programLine = cleanProgram ? `\n💼 <b>Program:</b> <code>${cleanProgram}</code>` : (cleanSubject ? `\n💼 <b>Subject:</b> <code>${cleanSubject}</code>` : '');
    const dynamicLine = (cleanDynamicLabel && cleanDynamicVal) ? `\n✏️ <b>${cleanDynamicLabel}:</b> <code>${cleanDynamicVal}</code>` : '';
    const msgLine = cleanMessage ? `\n💬 <b>Message:</b> <i>${cleanMessage}</i>` : '';
    
    const telegramMessage = `
🌟 <b>New Website Enquiry Received!</b> 🌟
━━━━━━━━━━━━━━━━━━
📝 <b>Source:</b> <code>${cleanSource}</code>${programLine}${dynamicLine}
👤 <b>Name:</b> <code>${cleanName}</code>
📞 <b>Phone:</b> <code>${cleanPhone}</code>
📧 <b>Email:</b> <code>${cleanEmail}</code>${msgLine}
🕒 <b>Time (IST):</b> <code>${escapeHtml(timestamp)}</code>${sheetLine}
━━━━━━━━━━━━━━━━━━
`.trim();

    const telegramPromise = fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML'
      })
    })
    .then(r => r.json())
    .then(data => console.log('Telegram API response:', data.ok ? 'Success' : (data.description || data)))
    .catch(err => console.error('Telegram API send failed:', err));

    // 3. Email Notification Integration
    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'monixsoftwaresolutions@gmail.com';
    const transporter = getEmailTransporter();

    const emailSubject = `[MONIX Website Enquiry] ${name} - ${program || subject || 'New Lead'}`;
    const emailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0f19; color: #f8fafc; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #d4af37;">
        <h2 style="color: #d4af37; margin-top: 0; border-bottom: 2px solid #d4af37; padding-bottom: 10px; font-size: 22px;">
          🚀 New Website Enquiry Received
        </h2>
        <p style="color: #94a3b8; font-size: 14px;">A new lead has submitted an enquiry through the MONIX website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 15px;">
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 10px 0; color: #94a3b8; font-weight: 600; width: 150px;">Full Name:</td>
            <td style="padding: 10px 0; color: #ffffff; font-weight: 700;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Email Address:</td>
            <td style="padding: 10px 0; color: #38bdf8;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Phone Number:</td>
            <td style="padding: 10px 0; color: #ffffff;">${phone || 'N/A'}</td>
          </tr>
          ${program ? `
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Program/Service:</td>
            <td style="padding: 10px 0; color: #fef08a; font-weight: 600;">${program}</td>
          </tr>` : ''}
          ${subject ? `
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Subject:</td>
            <td style="padding: 10px 0; color: #fef08a; font-weight: 600;">${subject}</td>
          </tr>` : ''}
          ${(dynamicLabel && dynamicVal) ? `
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">${dynamicLabel}:</td>
            <td style="padding: 10px 0; color: #ffffff;">${dynamicVal}</td>
          </tr>` : ''}
          ${userMessage ? `
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Message/Scope:</td>
            <td style="padding: 10px 0; color: #e2e8f0;">${userMessage}</td>
          </tr>` : ''}
          <tr style="border-bottom: 1px solid #1e293b;">
            <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Source Page:</td>
            <td style="padding: 10px 0; color: #94a3b8;">${source || 'Website'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Timestamp:</td>
            <td style="padding: 10px 0; color: #94a3b8;">${timestamp}</td>
          </tr>
        </table>
        <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed #334155; text-align: center; color: #64748b; font-size: 12px;">
          MONIX Digital Growth Platform • Automated Lead Router
        </div>
      </div>
    `;

    const mailPromise = transporter.sendMail({
      from: `"MONIX Web Forms" <${process.env.SMTP_USER || 'no-reply@monix.com'}>`,
      to: recipientEmail,
      subject: emailSubject,
      html: emailHtml,
    })
    .then(info => console.log('Email sent successfully:', info.messageId || info))
    .catch(err => console.error('Email sending failed:', err));

    // 4. Google Sheets Integration (Google Apps Script Web App Endpoint)
    const sheetWebAppUrl = process.env.GOOGLE_SHEET_WEBAPP_URL || process.env.GOOGLE_SHEETS_URL || process.env.GOOGLE_SCRIPT_URL;
    let sheetsPromise = Promise.resolve();

    if (sheetWebAppUrl && sheetWebAppUrl.trim()) {
      sheetsPromise = fetch(sheetWebAppUrl.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp,
          name: name || '',
          email: email || '',
          phone: phone || '',
          programType: dynamicLabel && dynamicLabel.includes('Duration') ? 'Internship' : 'Service',
          program: program || subject || 'General Enquiry',
          dynamicLabel: dynamicLabel || '',
          dynamicVal: dynamicVal || '',
          message: userMessage || '',
          source: source || 'Website',
          url: url || ''
        }),
        redirect: 'follow'
      })
      .then(r => r.text())
      .then(resText => console.log('Google Sheets Apps Script response:', resText))
      .catch(err => console.error('Google Sheets Apps Script forwarding failed:', err));
    }

    // Execute all notifications concurrently
    await Promise.allSettled([telegramPromise, mailPromise, sheetsPromise]);

    return res.status(200).json({ success: true, message: 'Enquiry submitted successfully! Data sent to Telegram, Email, and Google Sheets.' });
  } catch (err) {
    console.error('Server error during enquiry handling:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Main route
app.get('/', (req, res) => {
  res.sendFile(path.join(portfolioPath, 'index.html'));
});

// Explicit routes for specific pages
app.get(['/services/:type', '/projects/:type', '/service-details.html'], (req, res) => {
  res.sendFile(path.join(portfolioPath, 'service-details.html'));
});

app.get(['/internships/:type', '/internship-details.html'], (req, res) => {
  res.sendFile(path.join(portfolioPath, 'internship-details.html'));
});

// Fallback to index.html for client routing and non-file requests
app.get('*', (req, res, next) => {
  if (path.extname(req.path)) {
    next();
  } else {
    res.sendFile(path.join(portfolioPath, 'index.html'));
  }
});

const startServer = (port) => {
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Portfolio server is running on http://0.0.0.0:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} is currently in use. Automatically switching to port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(PORT);
