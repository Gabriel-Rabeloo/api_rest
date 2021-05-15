const { Router } = require('express');
const photoController = require('../controllers/PhotoController');

const loginRequired = require('../middlewares/loginRequired');

const router = new Router();

router.post('/', loginRequired, photoController.store);

module.exports = router;
