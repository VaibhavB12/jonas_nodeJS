const mongoose = require('mongoose');
<<<<<<< HEAD
=======
const slugify = require('slugify');
const validator = require('validator');

>>>>>>> df15769 (completed 08 Using MongoDB with Mongoose)
const tourSchema = new mongoose.Schema({
    name:{
      type: String,
      required: [true, 'A Tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less than 40 characters'],
      minlength: [10, 'A tour name must have more than 40 characters'],
      validate: [validator.isAlpha, 'Tour must only contain characters']
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
      },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty'],
        enum: {
          values: ['easy', 'medium', 'difficult'],
          message: 'Difficulty is either: easy, medium, difficult'
        }
      },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
      },
    ratingsQuantity: {
        type: Number,
        default: 0
      },
    
    rating: {
      type: Number,
      default: 4.5
    },
    price: {
      type: Number,
      required: [true, 'A Tour must have a price']
    },
    priceDiscount: {
     type: Number,
     validate: {
        validator: function(val) {
        // this only points to current doc on NEW document creation NOT for update documents
        return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
    }
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a summary']
    },
    description: {
        type: String,
        trim: true
      },
    imageCover: {
       type: String,
       required: [true, 'A tour must have a cover image']
      },
    images: [String],
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    startDates: [Date],
  }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

tourSchema.virtual('durationWeeks').get(function(){
  return this.duration / 7; 
})  
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;