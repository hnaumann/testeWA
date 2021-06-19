const express = require('express');
const { route } = require('../app');
const router = express.Router();

// Buscar todos os exames
router.get('/buscar', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Buscou Exames'
    });
});

// Buscar exames por id
router.get('/buscar/:id', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Buscou Exames por ID'
    });
});

// Buscar exames por nome
router.get('/buscar/:nome', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Buscou Exames por NOME'
    });
});

// Buscar exames por tipo
router.get('/buscar/:tipo', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Buscou Exames por TIPO'
    });
});

// Buscar exames por status
router.get('/buscar/:status', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Buscou Exames por STATUS'
    });
});

// Criar exame
router.post('/criar', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Criou Exames'
    });
});

// Editar exame
router.patch('/editar', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Editou Exames'
    });
});

// Excluir exame
router.delete('/excluir', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Excluiu Exames'
    });
});

module.exports = router;