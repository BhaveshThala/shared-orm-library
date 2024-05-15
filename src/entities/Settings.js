const DataTypes = require('sequelize')
const createDbConnection = require('../database.js')
const getDbConfig = require('../database.js')

const database = createDbConnection(getDbConfig());

const Settings = database.define('Settings', {
    Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey : true,
        autoIncrement : true
    },
    IsNotificationEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    IsNewDashboardEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    Timezone: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Settings