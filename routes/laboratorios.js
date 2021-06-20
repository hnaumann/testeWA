const express = require('express');
const { route } = require('../app');
const router = express.Router();
const mysql = require('../mysql').pool;

// Buscar todos os laboratórios
router.get('/buscar', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        conn.query(
            `SELECT * 
               FROM Laboratorio;`,
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum laboratório foi encontrato'
                    })
                }

                const response = {
                    Quantidade: result.length,
                    Laboratorios: result.map(lab => {
                        return {
                            idLaboratorio: lab.idLaboratorio,
                            nome: lab.Nome,
                            endereco: lab.Endereco,
                            status: lab.Status
                        }
                    })
                }
                return res.status(200).send(response);
            }
        );
    });
});

// Buscar laboratórios por id
router.get('/buscarPorId/:idLaboratorio', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        conn.query(
            `SELECT * 
               FROM Laboratorio 
              WHERE idLaboratorio = ?;`,
            [req.params.idLaboratorio],
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum laboratório foi encontrato com este ID'
                    })
                }

                const response = {
                    Laboratorio: result.map(lab => {
                        return {
                            idLaboratorio: lab.idLaboratorio,
                            nome: lab.Nome,
                            endereco: lab.Endereco,
                            status: lab.Status
                        }
                    })
                }

                return res.status(200).send(response);
            }
        );
    });
});

// Buscar laboratórios por nome
router.get('/buscarPorNome/:nome', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        conn.query(
            `SELECT * 
               FROM Laboratorio 
              WHERE nome = ?;`,
            [req.params.nome],
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum laboratório foi encontrato com este Nome'
                    })
                }

                const response = {
                    Laboratorio: result.map(lab => {
                        return {
                            idLaboratorio: lab.idLaboratorio,
                            nome: lab.Nome,
                            endereco: lab.Endereco,
                            status: lab.Status
                        }
                    })
                }

                return res.status(200).send(response);
            }
        );
    });
});

// Buscar laboratórios por endereco
router.get('/buscarPorEndereco/:endereco', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        conn.query(
            `SELECT * 
               FROM Laboratorio 
              WHERE endereco = ?;`,
            [req.params.endereco],
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum laboratório foi encontrato com este Endereço'
                    })
                }

                const response = {
                    Laboratorio: result.map(lab => {
                        return {
                            idLaboratorio: lab.idLaboratorio,
                            nome: lab.Nome,
                            endereco: lab.Endereco,
                            status: lab.Status
                        }
                    })
                }

                return res.status(200).send(response);
            }
        );
    });
});

// Buscar laboratórios por status
router.get('/buscarPorStatus/:status', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        conn.query(
            `SELECT * 
               FROM Laboratorio 
              WHERE status = ?;`,
            [req.params.status],
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum laboratório foi encontrato com este Status'
                    })
                }

                const response = {
                    Laboratorio: result.map(lab => {
                        return {
                            idLaboratorio: lab.idLaboratorio,
                            nome: lab.Nome,
                            endereco: lab.Endereco,
                            status: lab.Status
                        }
                    })
                }

                return res.status(200).send(response);
            }
        );
    });
});

// Criar laboratório
router.post('/criar', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }

        if (req.body.status == 'ativo') {
            req.body.status = 1
        }

        if (req.body.status == 'inativo') {
            req.body.status = 0
        }

        if (req.body.status == 0 || req.body.status == 1) {
            conn.query(
                `INSERT INTO Laboratorio (Nome, Endereco, Status) 
                 VALUES (?,?,?)`,
                [req.body.nome, req.body.endereco, req.body.status],
                (error, result, field) => {
                    conn.release();
                    if (error) {
                        return res.status(500).send({
                            error: error,
                            response: null
                        });
                    }
                    const response = {
                        mensagem: 'Laboratório inserido com sucesso',
                        laboratorioCriado: {
                            idLaboratorio: result.insertId,
                            nome: req.body.nome,
                            endereco: req.body.endereco,
                            status: req.body.status
                        }
                    }
                    res.status(201).send(response);
                }
            );
        } else {
            return res.status(404).send({
                mensagem: 'Não é possível criar um laboratório com status diferente de ativo, inativo, 0 para ativo ou 1 para inativo'
            })
        }
    });
});

// Editar laboratório
router.patch('/editar', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }

        conn.query(
            `SELECT * 
               FROM Laboratorio 
              WHERE idLaboratorio = ?;`,
            [req.body.idLaboratorio],
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum laboratório foi encontrato com este ID para ser alterado'
                    })
                } else {
                    conn.query(
                        `UPDATE Laboratorio 
                        SET Nome = ?,
                            Endereco = ?,
                            Status = ?
                      WHERE idLaboratorio = ?`,
                        [req.body.nome, req.body.endereco, req.body.status, req.body.idLaboratorio],
                        (error, result, field) => {
                            conn.release();
                            if (error) {
                                return res.status(500).send({
                                    error: error,
                                    response: null
                                });
                            }

                            const response = {
                                mensagem: 'Laboratório alterado com sucesso'
                            }

                            res.status(202).send(response);
                        }
                    );
                }
            }
        );
    });
});

// Excluir laboratório
router.delete('/excluir', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }

        conn.query(
            `SELECT * 
               FROM Laboratorio 
              WHERE idLaboratorio = ?;`,
            [req.body.idLaboratorio],
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum laboratório foi encontrato com este ID para ser removido'
                    })
                } else {
                    conn.query(
                        `DELETE FROM Laboratorio
                          WHERE idLaboratorio = ?`,
                        [req.body.idLaboratorio],
                        (error, resultado, field) => {
                            conn.release();
                            if (error) {
                                return res.status(500).send({
                                    error: error,
                                    response: null
                                });
                            }

                            const response = {
                                mensagem: 'Laboratório removido com sucesso'
                            }

                            res.status(202).send(response);
                        }
                    );
                }
            }
        );
    });
});

module.exports = router;