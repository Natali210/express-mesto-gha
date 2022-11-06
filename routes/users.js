const router = require('express').Router();
const {
  getUsers,
  getUserById,
  currentUser,
  changeUserInfo,
  changeUserAvatar,
} = require('../controllers/users');
const { IdValidation, profileValidation, avatarValidation } = require('../middlewares/validation');

// Получение всех пользователей
router.get('/users', getUsers);

// Получение пользователя по _id
router.get('/users/:userId', IdValidation('userId'), getUserById);

// Получение информации о пользователе
router.get('/users/me', currentUser);

// Обновление профиля пользователя
router.patch('/users/me', profileValidation, changeUserInfo);

// Обновление аватара пользователя
router.patch('/users/me/avatar', avatarValidation, changeUserAvatar);

module.exports = router;
