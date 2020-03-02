const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, data: Buffer }
  },
  { versionKey: false }
);

module.exports = model('User', schema);
