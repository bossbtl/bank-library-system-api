const express = require('express');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
      const SECRET_KEY = process.env.SECRET_KEY || "fallback_default_key";
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      return res.json({ token });
    }
    return res.status(401).json({ error: 'Invalid username or password' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
