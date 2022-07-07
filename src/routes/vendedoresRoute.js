const controller = require('../controllers/vendedoresController');

module.exports = (app) => {
    app.get('/vendedores', controller.getAllVendedores)
    app.get('/vendedores/:id', controller.getVendedorById)
    app.post('/vendedores', controller.persistirVendedor)
    app.delete('/vendedores/:id', controller.excluirVendedor)
};