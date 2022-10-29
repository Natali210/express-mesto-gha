const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createNewUser,
  changeUserInfo,
  changeUserAvatar,
} = require('../controllers/users');

// Получение всех пользователей
router.get('/users', getUsers);

// Получение пользователя по _id
router.get('/users/:userId', getUserById);

// Cоздание нового пользователя
router.post('/users', createNewUser);

// Обновление профиля пользователя
router.patch('/users/me', changeUserInfo);

// Обновление аватара пользователя
router.patch('/users/me/avatar', changeUserAvatar);

module.exports = router;
