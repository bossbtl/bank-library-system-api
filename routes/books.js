const express = require('express');
const router = express.Router();
const Book = require('../models/book.js');
const auth = require("../middleware/auth");

// ดึงข้อมูลหนังสือทั้งหมด (ต้องผ่านการตรวจสอบสิทธิ์)
router.get('/', auth, async (req, res, next) => {
  Book.find()
    .then((data) => res.json(data)) // ส่งข้อมูลหนังสือในรูปแบบ JSON
    .catch((err) => next(err)); // ส่งต่อ error ไปยัง middleware ถัดไป
});

// เพิ่มหนังสือใหม่ (ต้องผ่านการตรวจสอบสิทธิ์)
router.post('/', auth, async (req, res, next) => {
  Book.create(req.body)
    .then((data) => res.json(data)) // ส่งข้อมูลหนังสือที่เพิ่มในรูปแบบ JSON
    .catch((err) => next(err)); // ส่งต่อ error ไปยัง middleware ถัดไป
});

// แก้ไขข้อมูลหนังสือตาม ID (ต้องผ่านการตรวจสอบสิทธิ์)
router.put('/:id', auth, async (req, res, next) => {
  Book.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((data) => res.json(data)) // ส่งข้อมูลหนังสือที่แก้ไขในรูปแบบ JSON
    .catch((err) => next(err)); // ส่งต่อ error ไปยัง middleware ถัดไป
});

// ลบหนังสือตาม ID (ต้องผ่านการตรวจสอบสิทธิ์)
router.delete('/:id', auth, async (req, res, next) => {
  Book.findByIdAndDelete(req.params.id)
    .then((data) => res.status(204).json({ msg: '204 No Content' })) // ส่งสถานะ 204 หากลบสำเร็จ
    .catch((err) => next(err)); // ส่งต่อ error ไปยัง middleware ถัดไป
});

// ค้นหาหนังสือตามพารามิเตอร์ (ต้องผ่านการตรวจสอบสิทธิ์)
router.get('/search', auth, async (req, res, next) => {
  try {
    const { title, author, category, publishedDate } = req.query;
    let query = {};

    // ตรวจสอบพารามิเตอร์และสร้าง query สำหรับค้นหา
    if (title) query.title = { $regex: title, $options: 'i' }; // ค้นหาด้วยชื่อหนังสือ (ไม่สนใจตัวพิมพ์ใหญ่เล็ก)
    if (author) query.author = { $regex: author, $options: 'i' }; // ค้นหาด้วยชื่อผู้เขียน (ไม่สนใจตัวพิมพ์ใหญ่เล็ก)
    if (category) query.category = { $regex: category, $options: 'i' }; // ค้นหาด้วยหมวดหมู่ (ไม่สนใจตัวพิมพ์ใหญ่เล็ก)

    if (publishedDate) {
      let startDate, endDate;
  
      // ตรวจสอบรูปแบบวันที่
      if (publishedDate.length === 10) { // รูปแบบวันที่ YYYY-MM-DD
        startDate = new Date(`${publishedDate}T00:00:00.000Z`);
        endDate = new Date(`${publishedDate}T23:59:59.999Z`);
      } else if (publishedDate.length > 10) { // รูปแบบวันที่ที่มีเวลารวมด้วย
        startDate = new Date(publishedDate);
        endDate = new Date(publishedDate);
      }
  
      if (startDate && endDate) {
        query.publishedDate = { $gte: startDate, $lte: endDate }; // ค้นหาภายในช่วงวันที่ที่ระบุ
      }
    }
    
    Book.find(query)
      .then((data) => res.json(data)) // ส่งผลลัพธ์การค้นหาในรูปแบบ JSON
      .catch((err) => next(err)); // ส่งต่อ error ไปยัง middleware ถัดไป
  } catch (err) {
    res.status(500).json({ error: err.message }); // ส่งสถานะ 500 หากเกิดข้อผิดพลาดในเซิร์ฟเวอร์
  }
});

module.exports = router;