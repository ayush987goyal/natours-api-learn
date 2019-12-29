const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    tour: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.']
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: [true, 'Review must be authored by a user.']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
