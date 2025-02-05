const express = require('express');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const router = express.Router();

// เส้นทางสำหรับเข้าสู่ระบบ (Login)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // ตรวจสอบ username และ password แบบง่าย ๆ (ในระบบจริงควรใช้ฐานข้อมูล)
    if (username === 'admin' && password === 'password') {
      const SECRET_KEY = process.env.SECRET_KEY || "fallback_default_key"; // ใช้ค่าเริ่มต้นถ้าไม่มี SECRET_KEY
      
      // สร้าง JWT token โดยกำหนดให้หมดอายุใน 1 ชั่วโมง
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      
      return res.json({ token }); // ส่ง token กลับไปให้ผู้ใช้
    }
    
    return res.status(401).json({ error: 'Invalid username or password' }); // แจ้งเตือนเมื่อข้อมูลไม่ถูกต้อง
  } catch (err) {
    res.status(500).json({ error: err.message }); // ส่งสถานะ 500 หากเกิดข้อผิดพลาดภายในเซิร์ฟเวอร์
  }
});

module.exports = router;