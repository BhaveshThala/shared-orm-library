const Sequelize = require('sequelize')

var dbProperties

function createDbConnection(dbConfig) {
    try {
        const database = new Sequelize(dbConfig.databasename, dbConfig.username, dbConfig.password, {
            host: dbConfig.host,
            dialect: dbConfig.dbtype,
            define: {
                timestamps: false,
            },
            logging: false
        });
        dbProperties = dbConfig
        return database

    } catch (error) {
        console.log("Db Connection Error : ", error)
    }
}

function closeConnection(database) {
    database.close()
}

module.exports = { createDbConnection: createDbConnection, closeConnection: closeConnection }
