var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
  download: { type: String },
  whereBuy: { type: String },
  readIn: { type: String },
  name: { type: String, required: true },
  author: { type: String },
  genre: { type: String },
  description: { type: String },
  picture: { type: String },
});

mongoose.model('Books', BookSchema);
