const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET /verify — misleading response
app.get('/verify', (req, res) => {
  const { user, auth } = req.query;

  // Fake flag hidden in a comment-like response to tempt participants
  res.json({
    status: 'ok',
    message: "Nothing useful here 👀",
    hint: "Maybe try a different method?",
    // totally not a flag: FLAG{frontend_fake}
    debug: "GET is not the way."
  });
});

// POST /verify — real logic
app.post('/verify', (req, res) => {
  const { user, auth } = req.body;

  // Wrong data → fake flag
  if (!user || !auth) {
    return res.json({
      status: 'fail',
      flag: 'FLAG{try_harder_fake}',
      message: 'Missing parameters.'
    });
  }

  if (user !== 'admin' || auth !== 'true') {
    return res.json({
      status: 'fail',
      flag: 'FLAG{not_this_one}',
      message: 'Access denied. Wrong credentials.'
    });
  }

  // Correct POST with user=admin&auth=true → real flag (Base64 encoded)
  // HW{you_seeyousoon} → SFd7eW91X3NlZXlvdXNvb259
  return res.json({
    status: 'success',
    message: '✅ Identity verified. Here is your reward:',
    encoded_flag: 'SFd7eW91X3NlZXlvdXNvb259',
    note: 'Decode the encoded_flag using Base64 to get your flag.'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
