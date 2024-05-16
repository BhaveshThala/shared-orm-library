const { createDbConnection , closeConnection} = require('./src/database.js')
const { Umzug , SequelizeStorage} = require('umzug')
const Sequelize  = require('sequelize')
const pathLib = require('path')

async function initializeDb(dbConfig){
    var dbConnection = createDbConnection(dbConfig)
    await runMigrations(dbConnection)
}

async function getDbConnection(dbConfig)
{
    return createDbConnection(dbConfig)
}

function closeDbConnection(databaseConnection){
    return closeConnection(databaseConnection)
}

async function runMigrations(dbConnection) {
    const umzug = new Umzug({
        storage:  new SequelizeStorage({ sequelize : dbConnection , modelName : 'SequelizeMeta' }),
        migrations: {
            glob: ['\*.js',{cwd : pathLib.resolve(__dirname,'migrations')}],
            resolve: ({ name, path, context }) => {
                const migration = require(path)
                return {
                    name,
                    up: async () => migration.up(context, Sequelize),
                    down: async () => migration.down(context, Sequelize),
                }
            },
        },
        context: dbConnection.getQueryInterface(),
        logger: console
    });

    try {
        const migrations = await umzug.up()
        console.log('Migrations executed successfully:', migrations);
    } catch (error) {
        await umzug.down();
        console.error('Error executing migrations:', error);
    }
}
module.exports = { closeConnection: closeConnection , initializeDb : initializeDb , getDbConnection : getDbConnection}