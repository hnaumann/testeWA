const express = require('express');
const { route } = require('../app');
const router = express.Router();
const examesController = require('../controllers/exames-controller');

router.get('/buscar', examesController.buscarExames);

router.get('/buscarPorId/:idExame', examesController.buscarExamesPorId);

router.get('/buscarPorNome/:nome', examesController.buscarExamesPorNome);

router.get('/buscarPorTipo/:tipo', examesController.buscarExamesPorTipo);

router.get('/buscarPorStatus/:status', examesController.buscarExamesPorStatus);

router.get('/buscarExamesLaboratoriosPorNome/:nome', examesController.buscarExamesLaboratoriosPorNome);

router.post('/criar', examesController.criarExame);

router.patch('/editar', examesController.editarExame);

router.delete('/excluir', examesController.excluirExame);

module.exports = router;