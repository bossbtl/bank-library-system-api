const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// กำหนดโครงสร้าง (Schema) สำหรับ collection "Book"
let BookSchema = new Schema({
  title: { type: String, required: true }, // ชื่อหนังสือ (ต้องใส่ค่าเสมอ)
  author: { type: String, required: true }, // ชื่อผู้เขียน (ต้องใส่ค่าเสมอ)
  category: { type: String }, // หมวดหมู่ของหนังสือ (ไม่จำเป็นต้องใส่)
  publishedDate: { type: Date, default: Date.now }, // วันที่ตีพิมพ์ (ถ้าไม่ระบุจะใช้วันที่ปัจจุบัน)
});

module.exports = mongoose.model('Book', BookSchema);