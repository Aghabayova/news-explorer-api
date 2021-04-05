const validator = require('validator');

const {
  CelebrateError,
} = require('celebrate');

const urlValidation = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError('Некорректный URL');
  }
  return value;
};

module.export = urlValidation;
