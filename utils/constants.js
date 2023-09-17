const rateLimit = require('express-rate-limit');

const CREATED_STATUS = 201;
const SECRET_KEY = 'some-secret-key';
const DEFAULT_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb';

const regex = /^https?:\/\/(www\.)?[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = {
  CREATED_STATUS,
  SECRET_KEY,
  DEFAULT_ADDRESS,
  regex,
  limiter,
};
