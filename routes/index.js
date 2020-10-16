const router = require('express').Router();

const authenticationRouter = require('./authentication');
const userRouter = require('./users');
const articleRouter = require('./articles');
const errorRouter = require('./error');

const auth = require('../middlewares/auth');

router.use('/', authenticationRouter);
router.use(auth);
router.use('/', userRouter);
router.use('/', articleRouter);
router.use('/*', errorRouter);

module.exports = router;
