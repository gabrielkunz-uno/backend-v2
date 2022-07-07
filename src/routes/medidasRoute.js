const controller = require('../controllers/medidasController');

module.exports = (app) => {
    app.get('/medidas', controller.getAllMedidas)
    app.get('/medidas/:id', controller.getMedidaById)
    app.post('/medidas', controller.persistirMedida)
    app.delete('/medidas/:id', controller.excluirMedida)
};