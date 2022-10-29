const mongoose = require('mongoose');
const User = require('../models/user');

// Создание пользователя
const createNewUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    return res.status(201).send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: 'Ошибка в данных пользователя', err });
    }
    return res.status(500).send({ message: 'Ошибка на сервере', err });
  }
};

// Получение списка пользователей
const getUsers = async (req, res) => {
  try {
    const user = await User.find({});
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ message: 'Ошибка получения пользователей с сервера', err });
  }
};

// Получение пользователя по его _id
const getUserById = async (req, res) => {
  try {
    const selectedUser = await User.findById(req.params.userId)
      .orFail(new Error('NotFound'));
    return res.send(selectedUser);
  } catch (err) {
    if (err.message === 'NotFound') {
      return res.status(404).send({ message: 'Пользователь c данным _id не найден' });
    }
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: 'Указан некорректный _id', err });
    }
    return res.status(500).send({ message: 'Ошибка на сервере', err });
  }
};

// Обновление информации о пользователе - проверка, что пользователь есть + обновление информации
const changeUserInfo = async (req, res) => {
  try {
    const { name, about } = req.body;
    // eslint-disable-next-line max-len
    const changedProfile = await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .orFail(new Error('NotFound'));
    return res.send(changedProfile);
  } catch (err) {
    if (err.message === 'NotFound') {
      return res.status(404).send({ message: 'Пользователь c данным _id не найден' });
    }
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: 'Некорректные данные для обновления профиля', err });
    }
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: 'Указан некорректный _id', err });
    }
    return res.status(500).send({ message: 'Ошибка на сервере', err });
  }
};

// Обновление аватара пользователя
const changeUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    // eslint-disable-next-line max-len
    const changedAvatar = await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .orFail(new Error('NotFound'));
    return res.send(changedAvatar);
  } catch (err) {
    if (err.message === 'NotFound') {
      return res.status(404).send({ message: 'Пользователь c данным _id не найден' });
    }
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: 'Указан некорректный _id', err });
    }
    return res.status(500).send({ message: 'Ошибка на сервере', err });
  }
};

module.exports = {
  createNewUser,
  getUsers,
  getUserById,
  changeUserInfo,
  changeUserAvatar,
};
