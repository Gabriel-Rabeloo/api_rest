const { Router } = require('express');
const userController = require('../controllers/UserController');

const loginRequired = require('../middlewares/loginRequired');

const router = new Router();

// Não deveria existir
router.get('/', userController.index); // Lista usuários
router.get('/:id', userController.show); // Lista usuário

router.post('/', userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

module.exports = router;

/*
index -> Lista todos os usuários -> GET
strore/create -> cria um novo usuário -> POST
delete -> apaga um usuário -> DELETE
show -> mostra um usuario -> GET
update -> atualiza um usuário -> PATCH OU PUT
*/
