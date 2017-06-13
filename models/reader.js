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
var Reader = sequelize.define('reader', {
    readerid: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    username: Sequelize.STRING(64),
    firstname: Sequelize.STRING(64),
    lastname: Sequelize.STRING(64),
    middlename: Sequelize.STRING(64),
    role:Sequelize.STRING(16),
    password: Sequelize.STRING(64),
    church: Sequelize.STRING(64),
    groups: Sequelize.STRING(64),
    email: Sequelize.STRING(64),
    phonenumber: Sequelize.STRING(64),
    memo: Sequelize.STRING(64),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
    timestamps: false
});

module.exports =Reader;