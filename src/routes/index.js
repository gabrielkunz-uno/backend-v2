const clientes = require('./clientesRoute');
const grupos = require('./gruposRoute');
const itens = require('./itensRoute');
const medidas = require('./medidasRoute');
const vendedores = require('./vendedoresRoute');
const notas = require('./notasRoute');

module.exports = (app) => {
    clientes(app)
    grupos(app)
    itens(app)
    medidas(app)
    vendedores(app)
    notas(app)
};