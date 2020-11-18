const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const {
  errors,
} = require('celebrate');

const limiter = require('./config/rate-limiter');
const router = require('./routes');
const { DB_URL } = require('./config/mongodb');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors({ origin: true }));

// подключаемся к серверу mongo
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // подключаем парсер кук как мидлвэр
app.use(requestLogger); // подключаем логгер запросов

app.use('/', router);

app.use((errorLogger)); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log(`APP listening on port ${PORT}`);
});
