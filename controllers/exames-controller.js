const mysql = require('../mysql').pool;

exports.buscarExames = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        conn.query(
            `SELECT * 
               FROM Exame;`,
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum Exame foi encontrato'
                    })
                }

                const response = {
                    Quantidade: result.length,
                    Exames: result.map(lab => {
                        return {
                            idExame: lab.idExame,
                            nome: lab.Nome,
                            tipo: lab.Tipo,
                            Status: lab.Status
                        }
                    })
                }
                return res.status(200).send(response);
            }
        );
    });
};

exports.buscarExamesPorId = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        conn.query(
            `SELECT * 
               FROM Exame 
              WHERE idExame = ?;`,
            [req.params.idExame],
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum exame foi encontrato com este ID'
                    })
                }

                const response = {
                    Exames: result.map(lab => {
                        return {
                            idExame: lab.idExame,
                            nome: lab.Nome,
                            tipo: lab.Tipo,
                            status: lab.Status
                        }
                    })
                }

                return res.status(200).send(response);
            }
        );
    });
};

exports.buscarExamesPorNome = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        conn.query(
            `SELECT * 
               FROM Exame 
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
                        mensagem: 'Nenhum exame foi encontrato com este Nome'
                    })
                }

                const response = {
                    Exames: result.map(lab => {
                        return {
                            idExame: lab.idExame,
                            nome: lab.Nome,
                            tipo: lab.Tipo,
                            status: lab.Status
                        }
                    })
                }

                return res.status(200).send(response);
            }
        );
    });
};

exports.buscarExamesPorTipo = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        conn.query(
            `SELECT * 
               FROM Exame 
              WHERE tipo = ?;`,
            [req.params.tipo],
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum exame foi encontrato com este Tipo'
                    })
                }

                const response = {
                    Exames: result.map(lab => {
                        return {
                            idExame: lab.idExame,
                            nome: lab.Nome,
                            tipo: lab.Tipo,
                            status: lab.Status
                        }
                    })
                }

                return res.status(200).send(response);
            }
        );
    });
};

exports.buscarExamesPorStatus = (req, res, next) => {
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
                   FROM Exame 
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
                            mensagem: 'Nenhum exame foi encontrato com este Status'
                        })
                    }

                    const response = {
                        Exames: result.map(lab => {
                            return {
                                idExame: lab.idExame,
                                nome: lab.Nome,
                                tipo: lab.Tipo,
                                status: lab.Status
                            }
                        })
                    }

                    return res.status(200).send(response);
                }
            );
        } else {
            return res.status(404).send({
                mensagem: 'Não é possível buscar um exame com status diferente de ativo, inativo, 0 para ativo ou 1 para inativo'
            })
        }
    });
};

exports.buscarExamesLaboratoriosPorNome = (req, res, next) => {
    global.responseLaboratorio = [];
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }

        conn.query(
            `SELECT ex.nome as nomeExame,
            ex.tipo,
            ex.status as statusExame,
            lab.nome as nomeLaboratorio,
            lab.endereco,
            lab.status as statusLaboratorio
                    FROM Exame AS ex
                    INNER JOIN LaboratoriosExames as labex
                      on labex.idExame = ex.idExame
                      inner join Laboratorio as lab
                      on lab.idLaboratorio = labex.idLaboratorio
                   WHERE ex.nome = ?;`,
            [req.params.nome],
            (error, resultExame, fields) => {
                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }

                if (resultExame.length) {
                    return res.status(404).send({
                        mensagem: 'Nenhum exame foi encontrato com este Nome'
                    })
                }

                resultExame.forEach(element => {
                    responseLaboratorio = [...responseLaboratorio, {
                        Laboratorio: {
                            nomeLaboratorio: element.nomeLaboratorio,
                            endereco: element.endereco,
                            statusLaboratorio: element.statusLaboratorio,
                        }
                    }]
                });
                
                return res.status(200).send({
                    Exame: {
                        nomeExame: resultExame[0].nomeExame,
                        tipo: resultExame[0].tipo,
                        statusExame: resultExame[0].statusExame,
                    }, ...responseLaboratorio
                });

            }
        )
    });
};

exports.criarExame = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }

        req.body.idLaboratorio.forEach(idLab => {
            conn.query(
                `SELECT *
                   FROM Laboratorio
                  WHERE idLaboratorio = ?
                    AND Status = 1;`,
                [idLab],
                (error, result, fields) => {
                    if (error) {
                        return res.status(500).send({
                            error: error
                        });
                    }
                    if (result.length == 0) {
                        return res.status(404).send({
                            mensagem: 'O laboratório informado não está ativo'
                        })
                    } else {
                        if (req.body.status == 'ativo') {
                            req.body.status = 1
                        }

                        if (req.body.status == 'inativo') {
                            req.body.status = 0
                        }

                        if (req.body.status == 0 || req.body.status == 1) {
                            conn.query(
                                `INSERT INTO Exame (Nome, Tipo, Status) 
                                 VALUES (?,?,?);`,
                                [req.body.nome, req.body.tipo, req.body.status],
                                (error, resultInsertExame, field) => {
                                    conn.release();
                                    if (error) {
                                        return res.status(500).send({
                                            error: error,
                                            response: null
                                        });
                                    }

                                    conn.query(
                                        `INSERT INTO LaboratoriosExames (idLaboratorio, idExame)
                                         VALUES (?,?);`,
                                        [idLab, resultInsertExame.insertId],
                                        (error, resultExame, fiefl) => {
                                            if (error) {
                                                return res.status(500).send({
                                                    error: error,
                                                    response: null
                                                });
                                            }
                                        }
                                    )
                                }
                            );
                        } else {
                            return res.status(404).send({
                                mensagem: 'Não é possível criar um laboratório com status diferente de ativo, inativo, 0 para ativo ou 1 para inativo'
                            })
                        }
                    }
                }
            )
        });

        res.status(201).send(({ mensagem: 'Exame(s) inserido(s) com sucesso' }));
    });
};

exports.editarExame = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }

        conn.query(
            `SELECT *
               FROM Laboratorio
              WHERE idLaboratorio = ?
                AND Status = 1`,
            [req.body.idLaboratorio],
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'O laboratório informado não está ativo'
                    })
                } else {
                    conn.query(
                        `SELECT * 
                           FROM Exame 
                          WHERE idExame = ?;`,
                        [req.body.idExame],
                        (error, result, fields) => {
                            if (error) {
                                return res.status(500).send({
                                    error: error
                                });
                            }
                            if (result.length == 0) {
                                return res.status(404).send({
                                    mensagem: 'Nenhum exame foi encontrato com este ID para ser alterado'
                                })
                            } else {
                                conn.query(
                                    `UPDATE Exame 
                                        SET Nome = ?,
                                            Tipo = ?,
                                            Status = ?
                                      WHERE idExame = ?;`,
                                    [req.body.nome, req.body.tipo, req.body.status, req.body.idExame],
                                    (error, result, field) => {
                                        conn.release();
                                        if (error) {
                                            return res.status(500).send({
                                                error: error,
                                                response: null
                                            });
                                        }

                                        conn.query(
                                            `UPDATE LaboratoriosExames
                                                SET idLaboratorio = ?,
                                                    idExame = ?
                                              WHERE idExame = ?;`,
                                            [req.body.idLaboratorio, req.body.idExame, req.body.idExame],
                                            (error, result, fields) => {
                                                if (error) {
                                                    return res.status(500).send({
                                                        error: error,
                                                        response: null
                                                    });
                                                }

                                                const response = {
                                                    mensagem: 'Exame alterado com sucesso'
                                                }

                                                res.status(202).send(response);
                                            }
                                        )
                                    }
                                );
                            }
                        }
                    );
                }
            }
        )
    });
};

exports.excluirExame = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
        conn.query(
            `SELECT * 
               FROM Exame 
              WHERE idExame = ?;`,
            [req.body.idExame],
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({
                        error: error
                    });
                }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum exame foi encontrato com este ID para ser removido'
                    })
                } else {
                    conn.query(
                        `DELETE FROM LaboratoriosExames
                          WHERE idExame = ?;`,
                        [req.body.idExame],
                        (error, result, fields) => {
                            if (error) {
                                return res.status(500).send({
                                    error: error
                                });
                            }

                            conn.query(
                                `DELETE FROM Exame
                                  WHERE idExame = ?`,
                                [req.body.idExame],
                                (error, result, field) => {
                                    conn.release();
                                    if (error) {
                                        return res.status(500).send({
                                            error: error,
                                            response: null
                                        });
                                    }

                                    const response = {
                                        mensagem: 'Exame removido com sucesso'
                                    }

                                    res.status(202).send(response);
                                }
                            );
                        }
                    )
                }
            }
        );
    });
};