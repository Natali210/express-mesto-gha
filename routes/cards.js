const cardRoutes = require('express').Router();
const {
  getCards,
  postNewCard,
  deleteCard,
  putLikeOnCard,
  deleteLikeFromCard,
} = require('../controllers/cards');

// Получение всех карточек
cardRoutes.get('/cards', getCards);

// Cоздание новой карточки
cardRoutes.post('/cards', postNewCard);

// Удаление карточки по идентификатору
cardRoutes.delete('/cards/:cardId', deleteCard);

// Лайк карточке по идентификатору
cardRoutes.put('/cards/:cardId/likes', putLikeOnCard);

// Удаление лайка с карточки по идентификатору /:cardId/likes
cardRoutes.delete('/cards/:cardId/likes', deleteLikeFromCard);

module.exports = cardRoutes;
