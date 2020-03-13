const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    id: { type: String, required: true },
    token: { type: String, required: true },
    refreshToken: { type: String, required: true }
  },
  { versionKey: false }
);

module.exports = model('Session', schema);
