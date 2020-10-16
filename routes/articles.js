const express = require('express');
const { celebrate, Joi } = require('celebrate');
// const urlValidation = require('../helpers/joi-url-validation');
const {
  CelebrateError,
} = require('celebrate');

const validator = require('validator');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

const urlValidation = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError('Некорректный URL');
  }
  return value;
};

const articleRouter = express.Router();

articleRouter.get('/articles', getArticles);

articleRouter.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.string().required().min(2),
    source: Joi.string().required().min(2),
    link: Joi.string().custom(urlValidation).required(),
    image: Joi.string().custom(urlValidation).required(),
  }),
}), createArticle);

articleRouter.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex(),
  }),
}), deleteArticle);

module.exports = articleRouter;
