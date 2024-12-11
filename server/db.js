const { Sequelize } = require('sequelize');

// Настройка подключения к базе данных с использованием переменных окружения
const sequelize = new Sequelize(
    process.env.DB_NAME,      // Имя базы данных
    process.env.DB_USER,      // Пользователь базы данных
    process.env.DB_PASSWORD,  // Пароль
    {
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',  // Адрес базы данных (можно использовать 'localhost' или имя контейнера)
        port: process.env.DB_PORT || 5432,          // Порт подключения
        logging: console.log,                       // Логирование SQL запросов
    }
);

module.exports = sequelize;
