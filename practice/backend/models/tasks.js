const { Schema, model } = require('mongoose');

const schema = new Schema({
    tasks: [
      {
        task: { type: String },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        addedTime: { type: Date, default: Date.now }
      }
    ]
  },
  { versionKey: false }
);
module.exports = model('Tasks', schema);
