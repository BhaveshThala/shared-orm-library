module.exports = {
    up: async (queryInterface , Sequelize) => {
        await queryInterface.createTable('Settings', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            IsNotificationEnabled: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            IsNewDashboardEnabled: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            Timezone: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('Settings');
    }
};