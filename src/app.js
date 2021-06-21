// a
const dotenv = require('dotenv');
const { resolve } = require('path');

dotenv.config();

require('./database');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const alunoRoutes = require('./routes/alunoRoutes');
const photoRoutes = require('./routes/photoRoutes');

const whiteList = [
  'http://localhost:3000',
  'https://gabriel-react-escola.netlify.app',
  '0.0.0.0',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/alunos', alunoRoutes);
    this.app.use('/photos', photoRoutes);
  }
}

module.exports = new App().app;
