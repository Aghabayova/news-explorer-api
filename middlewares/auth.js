const jwt = require('jsonwebtoken');
const AuthorisationErr = require('../errors/authorisation-err');

const { JWT_SECRET } = require('../config/jwt-secret');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  let payload;

  try {
    payload = jwt.verify(
      token,
      JWT_SECRET,
    );
  } catch (err) {
    throw new AuthorisationErr({
      message: 'Необходима авторизация',
    });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
