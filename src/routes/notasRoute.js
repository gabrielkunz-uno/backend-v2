const controller = require('../controllers/notasController');

module.exports = (app) => {
    app.get('/notas', controller.getAllNotas)
    //app.get('/medidas/:id', controller.getMedidaById)
    app.post('/notas', controller.persistirNota)
    //app.delete('/medidas/:id', controller.excluirMedida)
};