const DataTypes = require('sequelize')
const createDbConnection = require('../database.js')
const getDbConfig = require('../database.js')

const database = createDbConnection(getDbConfig());

const User = database.define('Users', {
    Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User