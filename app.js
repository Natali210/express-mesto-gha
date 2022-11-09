const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const handleErrors = require('./middlewares/handleErrors');

// Берем порт из переменных окружения
const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(MONGO_URL);

const app = express();

// Мидлвэр, чтобы распознавать json
app.use(express.json());

// Мидлвэр, чтобы извлекать данные из заголовка cookie
app.use(cookieParser());

app.use(routes);

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  // Отображаем в консоли, какой порт приложение слушает
  console.log(`Listening on port ${PORT}`);
});
