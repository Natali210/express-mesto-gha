const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlenght: 2,
    maxlenght: 30,
  },
  about: {
    type: String,
    required: true,
    minlenght: 2,
    maxlenght: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

// Важно: указываем имя в единственном числе, а mongo сам прибавит s в конце слова
module.exports = mongoose.model('user', userSchema);
