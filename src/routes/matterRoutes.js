const { Router } = require('express');
const matterController = require('../controllers/MatterController');

const router = new Router();

router.post('/', matterController.index);

module.exports = router;
