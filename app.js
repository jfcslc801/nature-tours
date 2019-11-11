const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

// PUG VIEW ENGINE
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARES
// serving static files
app.use(express.static(path.join(__dirname, 'public')));

// set security http headers
app.use(helmet());

// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour!'
});
app.use('/', limiter);

// body parser, ready data from req.body
app.use(express.json({ limit: '10kb' }));

//data sanitazation against noSQL query injection
app.use(mongoSanitize());

//data sanitazation against XSS
app.use(xss());

// prevent parameter polution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingQuantity',
      'ratingAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// TEST middlewares
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// ROUTES
app.use('/', viewRouter);
app.use('/tours', tourRouter);
app.use('/users', userRouter);
app.use('/reviews', reviewRouter);

// bad link error handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

// global error handler
app.use(globalErrorHandler);

module.exports = app;
