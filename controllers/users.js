const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ConflictErr = require('../errors/conflict-err');
const NotFoundErr = require('../errors/not-found-err');

const { JWT_SECRET } = require('../config/jwt-secret');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('Пользователь не найден');
      }
      res.send({
        data: {
          email: user.email,
          name: user.name,
        },
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 8)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new ConflictErr({ message: 'Пользователь с таким email уже зарегистрирован' });
      } else next(err);
    })
    .then((user) => res.status(201).send({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      // отправим токен, браузер сохранит его в куках
      res.cookie('jwt', token, {
        // token - наш JWT токен, который мы отправляем
        maxAge: 3600000 * 24 * 7, // защита от автоматической отправки кук
        httpOnly: true,
        sameSite: false,
      })
        // .send({ message: 'успешная авторизация' });
        .send({
          data: {
            _id: user._id,
            email: user.email,
            name: user.name,
          },
        });
    })
    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  login,
};
