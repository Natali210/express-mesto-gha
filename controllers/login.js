/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthorizationError = require('../errors/AuthorizationError');
const { SECRET_JWT } = require('../utils/constants');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(new AuthorizationError('Отсутствует email или пароль'));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AuthorizationError('Некорректный email или пароль'));
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return next(new AuthorizationError('Ошибка авторизации: некорректные данные'));
    }
    const signToken = jwt.sign({ _id: user._id }, SECRET_JWT, { expiresIn: '7d' });
    console.log({ _id: user._id });
    res.cookie('jwt', signToken, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send({ message: 'Успешная авторизация' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
