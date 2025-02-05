var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

// ตรวจสอบว่ามีค่าของ SECRET_KEY หรือไม่ ถ้าไม่มีให้หยุดการทำงานของแอปพลิเคชัน
if (!SECRET_KEY) {
  throw new Error("Missing SECRET_KEY in environment variables");
}

const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db');

mongoose.Promise = global.Promise;
// เชื่อมต่อกับฐานข้อมูล MongoDB โดยใช้ URL จากไฟล์ .env
mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log('database successfully connected')) // แสดงข้อความเมื่อเชื่อมต่อสำเร็จ
        .catch((err) => console.error(err)); // แสดงข้อผิดพลาดถ้าเชื่อมต่อไม่สำเร็จ

// นำเข้าไฟล์ routes ต่างๆ
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var booksRouter = require('./routes/books');

var app = express();

// ตั้งค่า view engine และโฟลเดอร์ที่ใช้เก็บ views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// ใช้ middleware ต่างๆ ในแอปพลิเคชัน
app.use(logger('dev')); // แสดง log ของ request ต่างๆ
app.use(express.json()); // รองรับการรับส่งข้อมูลในรูปแบบ JSON
app.use(express.urlencoded({ extended: false })); // รองรับการรับข้อมูลแบบ URL-encoded
app.use(cookieParser()); // จัดการกับ cookie
app.use(express.static(path.join(__dirname, 'public'))); // ตั้งค่าโฟลเดอร์ public สำหรับไฟล์ static
app.use(bodyParser.json()); // รองรับการรับส่งข้อมูล JSON (ซ้ำกับ express.json())
app.use(bodyParser.urlencoded({ extended: true })); // รองรับการรับส่งข้อมูล URL-encoded (ซ้ำกับ express.urlencoded())
app.use(cors()); // เปิดใช้งาน CORS เพื่อให้สามารถเรียก API จากโดเมนอื่นได้

// กำหนดเส้นทาง (routes) ให้กับ API
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/books', booksRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;