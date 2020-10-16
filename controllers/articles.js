const Article = require('../models/article');
const BadRequestErr = require('../errors/bad-request-err');
const NotFoundErr = require('../errors/not-found-err');

const getArticles = (req, res, next) => {
  Article.find({})
    .populate('user')
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};
const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword, title, text, source, link, image, date, owner: req.user._id,
  })
    .catch((err) => {
      throw new BadRequestErr({ message: `Указаны некорректные данные при создании карточки: ${err.message}` });
    })
    .then((newArticle) => res.status(201).send({ data: newArticle }))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findOneAndDelete({ _id: req.params.articleId, owner: req.user._id })
    .orFail(new NotFoundErr('Нет статьи с таким id или вы не являетесь ее автором'))
    .then((article) => {
      res
        .status(200)
        .send({ message: `${article._id} статья успешно удалена` });
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
