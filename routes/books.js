const express = require('express');
const router = express.Router();
const Book = require('../models/book.js')
const auth = require("../middleware/auth");

router.get('/', auth, async (req, res, next) => {
  Book.find()
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

router.post('/', auth, async (req, res, next) => {
  Book.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

router.put('/:id', auth, async (req, res, next) => {
  Book.findByIdAndUpdate(req.params.id, {$set: req.body})
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

router.delete('/:id', auth, async (req, res, next) => {
  Book.findByIdAndDelete(req.params.id)
    .then((data) => res.status(204).json({ msg: '204 No Content' }))
    .catch((err) => next(err));
});

router.get('/search', auth, async (req, res, next) => {
  try {
    const { title, author, category, publishedDate } = req.query;

    let query = {};

    if (title) query.title = { $regex: title, $options: 'i' };
    if (author) query.author = { $regex: author, $options: 'i' };
    if (category) query.category = { $regex: category, $options: 'i' };

    if (publishedDate) {
      let startDate, endDate;
  
      if (publishedDate.length === 10) {
        startDate = new Date(`${publishedDate}T00:00:00.000Z`);
        endDate = new Date(`${publishedDate}T23:59:59.999Z`);
      } else if (publishedDate.length > 10) {
        startDate = new Date(publishedDate);
        endDate = new Date(publishedDate);
      }
  
      if (startDate && endDate) {
        query.publishedDate = { $gte: startDate, $lte: endDate };
      }
    }
    
    Book.find(query)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router