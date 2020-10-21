const express = require('express');
const NotFoundErr = require('../errors/not-found-err');

const error = express.Router();

error.all('/*', () => {
  throw new NotFoundErr({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = error;
