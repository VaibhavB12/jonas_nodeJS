const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name:{
      type: String,
      required: [true, 'A Tour must have a name'],
      unique: true,
      trim: true
    },
    slug: String,
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
        // enum: {
        //   values: ['easy', 'medium', 'difficult'],
        //   message: 'Difficulty is either: easy, medium, difficult'
        // }
      },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        // min: [1, 'Rating must be above 1.0'],
        // max: [5, 'Rating must be below 5.0']
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
    //  validate: {
    //     validator: function(val) {
    //     // this only points to current doc on NEW document creation
    //     return val < this.price;
    //     },
    //     message: 'Discount price ({VALUE}) should be below regular price'
    // }
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
    secretTour: {
      type: Boolean,
      default: false
    }
  }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

tourSchema.virtual('durationWeeks').get(function(){
  return this.duration / 7; 
});

tourSchema.pre('save', function(next){
  // console.log(this); // logs the document before saving it to database
  // if document is created or name field is updated from document then slug created for that
  if(this.isModified('name')) { 
    this.slug = slugify(this.name, { lower: true } );
  }
  next();
});

// tourSchema.pre('save',function(next){
//   console.log('Will save document ...');
// });

// tourSchema.post('save', function(doc, next){
//   console.log(doc);
//   next(); 
// })

tourSchema.pre(/^find/, function(next){
  this.find({ secretTour: {$ne: true} });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(docs, next){
  console.log(`Query took ${Date.now() - this.start} miliseconds`);
  console.log(docs);
  next();
});

tourSchema.pre('aggregate', function(next){
  this.pipeline().unshift({ $match: { secretTour: { $ne: true }}});
  console.log(this.pipeline());
  next();
})
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;