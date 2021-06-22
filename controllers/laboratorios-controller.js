const mysql = require('../mysql').pool;

exports.buscarLaboratorios = (req, res, next) => {
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
};

exports.buscarLaboratoriosPorId = (req, res, next) => {
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
};

exports.buscarLaboratoriosPorNome = (req, res, next) => {
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
};

exports.buscarLaboratoriosPorEndereco = (req, res, next) => {
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
};

exports.buscarLaboratoriosPorStatus = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }

        if (req.params.status == 'ativo') {
            req.params.status = 1;
        }

        if (req.params.status == 'inativo') {
            req.params.status = 0;
        }

        if (req.params.status == 0 || req.params.status == 1) {
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
        } else {
            return res.status(404).send({
                mensagem: 'Não é possível buscar um laboratório com status diferente de ativo, inativo, 0 para ativo ou 1 para inativo'
            })
        }
    });
};

exports.criarLaboratorio = (req, res, next) => {
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
};

exports.editarLaboratorio = (req, res, next) => {
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
};

exports.excluirLaboratorio = (req, res, next) => {
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
                        `DELETE FROM Exame
                          WHERE idLaboratorio = ?;`,
                        [req.body.idLaboratorio],
                        (error, result, field) => {
                            conn.release();
                            if (error) {
                                return res.status(500).send({
                                    error: error,
                                    response: null
                                });
                            } else {
                                conn.query(
                                    `DELETE FROM Laboratorio
                                      WHERE idLaboratorio = ?;`,
                                    [req.body.idLaboratorio],
                                    (error, result, field) => {
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
                                )
                            }
                        }
                    );
                }
            }
        );
    });
};