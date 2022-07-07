const controller = require('../controllers/clientesController');

module.exports = (app) => {
    app.get('/clientes', controller.getAllClientes)
    app.get('/clientes/:id', controller.getClienteById)
    app.post('/clientes', controller.persistirCliente)
    app.delete('/clientes/:id', controller.excluirCliente)
};