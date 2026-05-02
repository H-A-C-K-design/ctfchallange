# 🕵️ CTF Challenge: Method Mayhem

**Category:** Web Exploitation  
**Difficulty:** Intermediate  
**Flag:** `HW{method_switch_master}`

---

## Project Structure

```
method-mayhem/
├── backend/
│   ├── server.js        # Express API
│   ├── package.json
│   └── render.yaml      # Render deployment config
├── frontend/
│   ├── index.html       # Challenge UI
│   ├── style.css
│   └── app.js
└── README.md
```

---

## Running Locally

### Backend

```bash
cd backend
npm install
npm start
# API available at http://localhost:3000
```

### Frontend

Open `frontend/index.html` directly in a browser, or serve it with any static server:

```bash
npx serve frontend
```

> Make sure `API_BASE` in `frontend/app.js` points to your backend URL.

---

## Challenge Flow

| Stage | Action | Endpoint |
|-------|--------|----------|
| 1 | Click "Check Status" → GET request | `/api/check` |
| 2 | Change GET → POST (Burp Suite) | `/api/check` |
| 3 | Decode Base64 response → fake flag + hint | — |
| 4 | Discover `/api/secret` → 403 Unauthorized | `/api/secret` |
| 5 | Add header `X-Access-Level: admin` | `/api/secret` |
| 6 | Decode Base64 `encoded_flag` → real flag | — |

---

## Fake Flags (Intentional Decoys)

- `HW{this_is_not_real}`
- `HW{easy_flag}`
- `HW{try_again}`

---

## Deploying to Render

1. Push `backend/` to a GitHub repo
2. Create a new **Web Service** on [Render](https://render.com) pointing to that repo
3. Render auto-detects `render.yaml`
4. Update `API_BASE` in `frontend/app.js` with your Render service URL
5. Deploy `frontend/` as a **Static Site** on Render (or Netlify/GitHub Pages)

---

## Skills Tested

- HTTP method manipulation (GET vs POST)
- Burp Suite request interception
- Base64 decoding
- Custom header injection
- Hidden endpoint discovery
