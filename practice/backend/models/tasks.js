const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, ref: 'User' },
    tasks: [
      {
        task: { type: String },
        addedTime: { type: Date, default: Date.now }
      }
    ]
  },
  { versionKey: false }
);
module.exports = model('Tasks', schema);
