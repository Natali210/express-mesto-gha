const token = require('jsonwebtoken');
const { SECRET_JWT } = require('../utils/constants');
const AuthorizationError = require('../errors/AuthorizationError');

module.exports.auth = (req, res, next) => {
  const { jwt } = req.cookies;
  let payload;

  console.log(jwt);
  if (!jwt) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  try {
    payload = token.verify(jwt, SECRET_JWT);
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
