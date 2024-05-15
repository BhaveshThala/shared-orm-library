const { createDbConnection , closeConnection} = require('./src/database.js')
const { Umzug , SequelizeStorage} = require('umzug')
const Sequelize  = require('sequelize')

async function initializeDb(dbConfig){
    var dbConnection = createDbConnection(dbConfig)
    await runMigrations(dbConnection)
    return dbConnection
}
function closeDbConnection(databaseConnection){
    return closeConnection(databaseConnection)
}

async function runMigrations(dbConnection) {
    const umzug = new Umzug({
        storage:  new SequelizeStorage({ sequelize : dbConnection , modelName : 'SequelizeMeta' }),
        context: dbConnection.getQueryInterface(),
        migrations: {
            glob: './src/migrations/*.js',
            resolve: ({ name, path, context }) => {
                const migration = require(path || '')
                return {
                    name,
                    up: async () => migration.up(context, Sequelize),
                    down: async () => migration.down(context, Sequelize),
                }
            },
        },
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
module.exports = {closeConnection , initializeDb}