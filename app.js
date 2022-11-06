const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { createNewUser } = require('./controllers/users');
const { login } = require('./controllers/login');
const { auth } = require('./middlewares/auth');
const handleErrors = require('./middlewares/handleErrors');
const { newUserValidation, loginValidation } = require('./middlewares/validation');

// Берем порт из переменных окружения
const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(MONGO_URL);

const app = express();

// Мидлвэр, чтобы распознавать json
app.use(express.json());

// Мидлвэр, чтобы извлекать данные из заголовка cookie
app.use(cookieParser());

// Роуты, которым авторизация не нужна
app.post('/signup', newUserValidation, createNewUser);
app.post('/signin', loginValidation, login);

// Авторизация для всех других страниц приложения
app.use(auth);

// Выход
app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

// Применяем маршруты как мидлвэры
app.use(userRoutes);
app.use(cardRoutes);

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  // Отображаем в консоли, какой порт приложение слушает
  console.log(`Listening on port ${PORT}`);
});
