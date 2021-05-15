const Sequelize = require('sequelize');
const databaseCongif = require('../config/database');
const Aluno = require('../models/Aluno');
const User = require('../models/User');
const Foto = require('../models/Foto');

const models = [Aluno, User, Foto];

const connection = new Sequelize(databaseCongif);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
