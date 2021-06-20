const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const rotaLaboratorios = require('./routes/laboratorios');
const rotaExames = require('./routes/exames');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/laboratorios', rotaLaboratorios);
app.use('/exames', rotaExames);

app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;