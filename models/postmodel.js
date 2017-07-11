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
var Post = sequelize.define('post', {
        postid: {
            type: Sequelize.BIGINT,
            primaryKey: true
        },

        username: Sequelize.STRING(64),
        content: Sequelize.STRING(500),
        createdAt: Sequelize.BIGINT,
        updatedAt: Sequelize.BIGINT,
        version: Sequelize.BIGINT
    },

    {
        timestamps: false
    }
    // {freezeTableName:true}
);

module.exports = Post;