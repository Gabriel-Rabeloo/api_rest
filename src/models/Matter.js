const Sequelize = require('sequelize');
const { Model } = require('sequelize');

module.exports = class Matter extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'matters',
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
    this.hasMany(models.Aluno, { foreignKey: 'aluno_id' });
  }
};
