const mongoose = require('mongoose');

const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const { CREATED_STATUS } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const ownerId = req.user._id;

  Movie.find({ owner: ownerId })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const ownerId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: ownerId,
  })
    .then((newMovie) => res.status(CREATED_STATUS).send(newMovie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Ошибка! Не удалось добавить новый фильм.'));
      }
      return next(err);
    });
};

module.exports.deleteById = (req, res, next) => {
  const userId = req.user._id;
  const { movieId } = req.params;

  Movie.checkMovieOwner(movieId, userId)
    .then((movie) => Movie.findByIdAndRemove(movie._id, { new: true }))
    .then(() => res.send({ message: 'Фильм удален.' }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Ошибка при удалении фильма! Переданы некорректные данные.'));
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Ошибка при удалении фильма! Данного фильма нет в базе.'));
      }
      return next(err);
    });
};
