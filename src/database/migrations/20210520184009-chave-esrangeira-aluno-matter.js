module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'alunos',
    'matter_id',
    {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'matters',
        key: 'id',
      },
    },
  ),

  down: () => {},
};
