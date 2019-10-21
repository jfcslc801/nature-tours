const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');
// const validator = require('validator');

// Tour Schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name.'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A tour name must have less or equal then 40 characters.'
      ],
      minlength: [10, 'A tour name must have more or equal than 10 characters.']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration.']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size.']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty.'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty must be: easy, medium or difficult'
      }
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price!']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price.'
      }
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a descriptuon.']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image.']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point']
        },
        coordintes: [Number],
        address: String,
        description: String,
        day: Number
      }
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//duration
tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

//runs ONLY for save() or create() not update()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// populate guides with restricted fields
tourSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordResetExpires -passwordResetToken -passwordChangedAt'
  });
  next();
});

//filter secret tours
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

// aggregation middleware
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

// console log new saved doc
// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// Tour Model
const Tour = mongoose.model('Tour', tourSchema);

// export tour
module.exports = Tour;
