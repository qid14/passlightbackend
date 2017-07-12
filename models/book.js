const Sequelize = require('sequelize'); //ORM替代直接操作的mysql
var config = require('../config');
var sequelize = new Sequelize(config.database, config.connection.user, config.connection.password, {
    host: config.connection.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
var Book = sequelize.define('book', {
    bookid: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    bookname: Sequelize.STRING(64),
    author: Sequelize.STRING(64),
    version: Sequelize.STRING(64),
    price: Sequelize.STRING(64),
    location:Sequelize.STRING(64)
}, {
    timestamps: false
});

module.exports = Book;