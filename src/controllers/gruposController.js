const service = require('../services/gruposService');

const getAll = async (req, res) => {
    try {
        const response = await service.getAllGrupos();
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getById = async (req, res) => {
    try {
        const response = await service.getGrupoById(req.params);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
}

const persistir = async (req, res) => {
    try {
        const response = await service.persistirGrupo(req.body);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
}

const excluir = async (req, res) => {
    try {
        let deletado = await service.excluirGrupo(req.params);
        let response = deletado
            ? `Registro ${req.params.id} deletado com sucesso`
            : `Não foi encontrado nenhum registro com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ response });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.getAllGrupos = getAll;
module.exports.getGrupoById = getById;
module.exports.persistirGrupo = persistir;
module.exports.excluirGrupo = excluir;