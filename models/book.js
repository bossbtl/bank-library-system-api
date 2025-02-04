const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String },
  publishedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', BookSchema);