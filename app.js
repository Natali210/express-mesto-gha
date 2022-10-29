const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

// Берем порт из переменных окружения
const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(MONGO_URL);

const app = express();

// Мидлвэр, чтобы распознавать json
app.use(express.json());

// Авторизация: мидлвэр для временного решения получения данных автора
app.use((req, res, next) => {
  req.user = {
    _id: '635d209108490bad16ef1ee7',
  };

  next();
});

// Применяем маршруты как мидлвэры
app.use(userRoutes);
app.use(cardRoutes);

// Ошибка, которая отображается при вызове страницы, которой нет в routes
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Cтраница не найдена' });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`Listening on port ${PORT}`);
});
