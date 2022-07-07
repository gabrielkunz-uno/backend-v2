const controller = require('../controllers/gruposController');

module.exports = (app) => {
    app.get('/grupos', controller.getAllGrupos)
    app.get('/grupos/:id', controller.getGrupoById)
    app.post('/grupos', controller.persistirGrupo)
    app.delete('/grupos/:id', controller.excluirGrupo)
};