const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  // ดึง token จากค่า header "Authorization"
  const token = req.header("Authorization")?.split(" ")[1]; // คาดหวังรูปแบบ "Bearer <token>"
  
  // ถ้าไม่มี token ให้ส่งสถานะ 401 (Unauthorized)
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    // ตรวจสอบความถูกต้องของ token โดยใช้ SECRET_KEY
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    // เก็บข้อมูลที่ถอดรหัสได้ไว้ใน req.user เพื่อให้ middleware ถัดไปสามารถใช้งานได้
    req.user = decoded;
    
    next(); // ดำเนินการต่อไปยัง middleware หรือ route handler ถัดไป
  } catch (err) {
    // ถ้า token ไม่ถูกต้อง ให้ส่งสถานะ 403 (Forbidden)
    res.status(403).json({ error: "Invalid token" });
  }
};
