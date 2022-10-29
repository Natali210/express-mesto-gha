const mongoose = require('mongoose');
const Card = require('../models/card');

// Получение карточек
const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send({ message: 'Получены карточки:', cards });
  } catch (err) {
    res.status(500).send({ message: 'Ошибка на сервере при получении карточек', err });
  }
};

// Создание новой карточки
const postNewCard = async (req, res) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner });
    return res.send(card);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: 'Некорректные данные карточки', err });
    }
    return res.status(500).send({ message: 'Ошибка на сервере', err });
  }
};

// Удаление карточки
const deleteCard = async (req, res) => {
  try {
    // eslint-disable-next-line max-len
    const card = await Card.findByIdAndRemove(req.params.cardId)
      .orFail(new Error('NotFound'));
    return res.send(card);
  } catch (err) {
    if (err.message === 'NotFound') {
      return res.status(404).send({ message: 'Карточка c данным _id не найдена', err });
    }
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: 'Данные карточки некорректны', err });
    }
    return res.status(500).send({ message: 'Ошибка на сервере', err });
  }
};

// Лайк на карточке
const putLikeOnCard = async (req, res) => {
  try {
    const likeOnCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    ).orFail(new Error('NotFound'));
    return res.send(likeOnCard);
  } catch (err) {
    if (err.message === 'NotFound') {
      return res.status(404).send({ message: 'Карточка c данным _id не найдена', err });
    }
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: 'Переданы некорректные данные', err });
    }
    return res.status(500).send({ message: 'Ошибка на сервере', err });
  }
};

// Удаление лайка с карточки
const deleteLikeFromCard = async (req, res) => {
  try {
    const dislikeCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    ).orFail(new Error('NotFound'));
    return res.send(dislikeCard);
  } catch (err) {
    if (err.message === 'NotFound') {
      return res.status(404).send({ message: 'Карточка c данным _id не найдена', err });
    }
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: 'Переданы некорректные данные', err });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка', err });
  }
};

module.exports = {
  getCards,
  postNewCard,
  deleteCard,
  putLikeOnCard,
  deleteLikeFromCard,
};
