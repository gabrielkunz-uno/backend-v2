const controller = require('../controllers/itensController');

module.exports = (app) => {
    app.get('/itens', controller.getAllItens)
    app.get('/itens/:id', controller.getItemById)
    app.post('/itens', controller.persistirItem)
    app.delete('/itens/:id', controller.excluirItem)
};