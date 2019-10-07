const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

//uncaught exceptions
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION: SHUTTING DOWN!');
  console.log(err.name, err.message);
  process.exit(1);
});

// mongoose db
const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// mongoose connect
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection Successful!'));

// START SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// unhandled rejections
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION: SHUTTING DOWN!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
