const mongoose = require('mongoose');
const validator = require('validator');

const DoNotHavePermissionError = require('../errors/DoNotHavePermissionError');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Invalid Image',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Invalid Trailer-Link',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Invalid Thumbnail',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

movieSchema.statics.checkMovieOwner = function (movieId, userId) {
  return this.findById(movieId)
    .orFail()
    .then((movie) => {
      const movieOwner = movie.owner.toString();
      const matched = movieOwner === userId;

      if (!matched) {
        return Promise.reject(new DoNotHavePermissionError('У вас недостаточно прав для данного действия.'));
      }
      return movie;
    });
};

module.exports = mongoose.model('movie', movieSchema);
