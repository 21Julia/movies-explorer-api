const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const AlreadyExistsError = require('../errors/AlreadyExistsError');
const { SECRET_KEY, CREATED_STATUS } = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((newUser) => {
      res.status(CREATED_STATUS).send({
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Ошибка! Не удалось создать пользователя.'));
      }
      if (err.code === 11000) {
        return next(new AlreadyExistsError('Ошибка! Пользователь, с указанным адресом электронной почты, уже существует.'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,
        { expiresIn: '7d' },
      );

      return res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({
          _id: user._id,
          email: user.email,
          name: user.name,
        });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Ошибка! Пользователь не найден.'));
      }
      return next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { email, name }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Ошибка! Не удалось обновить данные пользователя.'));
      }
      if (err.code === 11000) {
        return next(new AlreadyExistsError('Ошибка! Пользователь, с указанным адресом электронной почты, уже существует.'));
      }
      return next(err);
    });
};
