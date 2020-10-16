const userRouter = require('express').Router();

const { getUser } = require('../controllers/users');

userRouter.get('/users/me', getUser);

module.exports = userRouter;
