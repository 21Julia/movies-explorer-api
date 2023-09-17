require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const { DEFAULT_ADDRESS, limiter } = require('./utils/constants');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const { NODE_ENV, PORT = 3000, SERVER_ADDRESS } = process.env;

const app = express();

app.use(cors({
  origin: [
    'https://jkmovies-explorer.nomoredomainsicu.ru',
    'http://localhost:3000',
  ],
  credentials: true,
}));

app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(NODE_ENV === 'production' ? SERVER_ADDRESS : DEFAULT_ADDRESS);

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`Application is running on port ${PORT}`));
