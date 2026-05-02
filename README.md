# 🧩 CTF Challenge: The Lying Button

> "Not everything you see is what it does."

---

## 🗂️ Project Structure

```
/
├── frontend/
│   ├── index.html       ← Static site (deploy to Render Static)
│   └── render.yaml
└── backend/
    ├── server.js        ← Express API (deploy to Render Web Service)
    ├── package.json
    └── render.yaml
```

---

## 🚀 Deployment (Render)

### Backend (Web Service)
1. Create a new **Web Service** on Render
2. Point it to the `backend/` folder
3. Build command: `npm install`
4. Start command: `npm start`
5. Note the deployed URL (e.g. `https://lying-button-backend.onrender.com`)

### Frontend (Static Site)
1. Create a new **Static Site** on Render
2. Point it to the `frontend/` folder
3. Before deploying, update `BACKEND_URL` in `index.html`:
   ```js
   const BACKEND_URL = 'https://your-backend.onrender.com';
   ```

---

## ⚙️ How It Works

| Request | Response |
|---|---|
| `GET /verify?user=guest&auth=false` | Misleading message, no flag |
| `POST /verify` with wrong body | Fake flag |
| `POST /verify` with `user=admin&auth=true` | Base64 encoded real flag |

---

## 🏁 Flag

Real flag: `HW{you_seeyousoon}`  
Encoded: `SFd7eW91X3NlZXlvdXNvb259`

---

## 🎭 Fake Flags (Confusion Layer)

| Location | Fake Flag |
|---|---|
| HTML comment | `FLAG{frontend_fake}` |
| JS comment | `FLAG{not_this_one}` |
| JS comment | `FLAG{try_harder_fake}` |
| Wrong POST body response | `FLAG{not_this_one}` |
| Missing params response | `FLAG{try_harder_fake}` |

---

## 🧪 Solving the Challenge

1. Open the page and click **Verify Me**
2. Intercept the request in **Burp Suite**
3. Change `GET` → `POST`
4. Move params to the body: `user=admin&auth=true`
5. Set `Content-Type: application/x-www-form-urlencoded`
6. Send — receive the encoded flag
7. Decode `SFd7YnVycF9zdWl0ZV9tYXN0ZXJ9` from Base64 → `HW{burp_suite_master}`
