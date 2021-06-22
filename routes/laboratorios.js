const express = require('express');
const { route } = require('../app');
const router = express.Router();
const laboratoriosControllers = require('../controllers/laboratorios-controller');

router.get('/buscar', laboratoriosControllers.buscarLaboratorios);

router.get('/buscarPorId/:idLaboratorio', laboratoriosControllers.buscarLaboratoriosPorId);

router.get('/buscarPorNome/:nome', laboratoriosControllers.buscarLaboratoriosPorNome);

router.get('/buscarPorEndereco/:endereco', laboratoriosControllers.buscarLaboratoriosPorEndereco);

router.get('/buscarPorStatus/:status', laboratoriosControllers.buscarLaboratoriosPorStatus);

router.post('/criar', laboratoriosControllers.criarLaboratorio);

router.patch('/editar', laboratoriosControllers.editarLaboratorio);

router.delete('/excluir', laboratoriosControllers.excluirLaboratorio);

module.exports = router;