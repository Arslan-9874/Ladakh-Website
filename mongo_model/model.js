const mongoose = require("mongoose");
const validator = require('validator');

const regSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: {
      type: String,
      required: true,
      validate: [ validator.isEmail, "Email should have a valid syntax e.g: example@example.com" ]
    },
    gender: String,
    country: String
  });

  const newReg = mongoose.model('detail', regSchema);

  module.exports = newReg;