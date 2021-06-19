const express = require('express');
const { route } = require('../app');
const router = express.Router();

// Buscar todos os laboratórios
router.get('/buscar', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Buscou Laboratórios'
    });
});

// Buscar laboratórios por id
router.get('/buscar/:id', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Buscou Laboratórios por ID'
    });
});

// Buscar laboratórios por nome
router.get('/buscar/:nome', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Buscou Laboratórios por NOME'
    });
});

// Buscar laboratórios por endereco
router.get('/buscar/:endereco', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Buscou Laboratórios por ENDEREÇO'
    });
});

// Buscar laboratórios por status
router.get('/buscar/:status', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Buscou Laboratórios por STATUS'
    });
});

// Criar laboratório
router.post('/criar', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Criou Laboratórios'
    });
});

// Editar laboratório
router.patch('/editar', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Editou Laboratórios'
    });
});

// Excluir laboratório
router.delete('/excluir', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Excluiu Laboratórios'
    });
});

module.exports = router;