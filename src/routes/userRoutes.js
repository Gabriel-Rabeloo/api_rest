import { Router } from 'express';
import userController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Não deveria existir
// router.get('/', userController.index); // Lista usuários
// router.get('/:id', userController.show); // Lista usuário

router.post('/', loginRequired, userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;

/*
index -> Lista todos os usuários -> GET
strore/create -> cria um novo usuário -> POST
delete -> apaga um usuário -> DELETE
show -> mostra um usuario -> GET
update -> atualiza um usuário -> PATCH OU PUT
*/
