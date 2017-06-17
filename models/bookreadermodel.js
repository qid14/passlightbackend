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
var BookReader = sequelize.define('bookreader', {
        bookreaderid: {
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        bookid: Sequelize.BIGINT,
        readerid: Sequelize.BIGINT,
        sequence: Sequelize.BIGINT,
        startdate: Sequelize.DATE,
        enddate: Sequelize.DATE,
        duration: Sequelize.DECIMAL
    },

    {
        timestamps: false
    }
    // {freezeTableName:true}
);

module.exports = BookReader;