
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.post('/login', (req, res) => {
  const { uid, pass, otp } = req.body;
  console.log("Login attempt:", uid);
  res.json({ success: true, message: "Login placeholder" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
