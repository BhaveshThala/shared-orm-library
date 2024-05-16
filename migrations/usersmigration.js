module.exports = {
    up: async (queryInterface , Sequelize) => {
        await queryInterface.createTable('Users', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            FirstName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            LastName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Password: {
                type: Sequelize.STRING,
                allowNull: false
            },
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('Users');
    }
};