const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ origin: process.env.DOMAIN }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/user', require('./routes/user'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/token', require('./routes/token'));

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    app.listen(process.env.PORT, process.env.HOST, () =>
      console.log(`App has been started`)
    );
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};
start();
