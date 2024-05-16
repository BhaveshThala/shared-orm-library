const DataTypes = require('sequelize')
const {createDbConnection} = require('../database.js')

function getSettingsModel(dbConfig)
{
    var database = createDbConnection(dbConfig)
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
    return Settings
}

module.exports = {getSettingsModel : getSettingsModel}