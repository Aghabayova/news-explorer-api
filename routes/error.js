const express = require('express');
const NotFoundErr = require('../errors/not-found-err');

const error = express.Router();

error.all('/*', (req, res) => {
  throw new NotFoundErr('Запрашиваемый ресурс не найден');
});

module.exports = error;
