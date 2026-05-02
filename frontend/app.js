// ── Config ────────────────────────────────────────────────────────────────────
// Update API_BASE to your deployed backend URL when hosting on Render.
// Replace the URL below with your actual Render backend URL.
const API_BASE = 'https://method-mayhem-api.onrender.com'; // ← replace with your actual Render backend URL

// ── checkStatus ───────────────────────────────────────────────────────────────
async function checkStatus() {
  const btn = document.getElementById('checkBtn');
  const box = document.getElementById('response-box');
  const output = document.getElementById('response-output');

  btn.classList.add('loading');
  btn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/api/check`, {
      method: 'GET'
    });

    const data = await res.json();
    box.classList.remove('hidden');
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    box.classList.remove('hidden');
    output.style.color = '#ff5f5f';
    output.textContent = `Error: ${err.message}\n\nMake sure the backend is running.`;
  } finally {
    btn.classList.remove('loading');
    btn.disabled = false;
  }
}
