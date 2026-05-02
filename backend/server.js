const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Access-Level']
}));
app.options('*', cors()); // handle preflight requests
app.use(express.json());

// ─── Health check ───────────────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Method Mayhem API is running 🚀' });
});

// ─── Stage 1 & 2: /api/check ────────────────────────────────────────────────

// GET → nothing here
app.get('/api/check', (req, res) => {
  res.json({
    status: false,
    message: "Nothing here 👀"
  });
});

// POST → base64-encoded fake flag + real hint
app.post('/api/check', (req, res) => {
  const payload = "fake_flag: HW{this_is_not_real}\nreal_hint: try harder, deeper endpoint exists";
  res.json({
    status: true,
    data: Buffer.from(payload).toString('base64')
  });
});

// ─── Stage 4 & 5: /api/secret ───────────────────────────────────────────────

app.get('/api/secret', (req, res) => {
  const accessLevel = req.headers['x-access-level'];

  if (accessLevel === 'admin') {
    // Real flag, base64-encoded
    res.json({
      encoded_flag: Buffer.from("HW{method_switch_master}").toString('base64')
    });
  } else {
    // Leak the hint header so players know what to change
    res.set('X-Access-Level', 'basic');
    res.status(403).json({ error: "Unauthorized" });
  }
});

// ─── Catch-all 404 ──────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Method Mayhem API running on http://localhost:${PORT}`);
});
