const service = require('../services/notasService');

// const getAll = async (req, res) => {
//     try {
//         const response = await service.getAllMedidas();
//         res.status(200).send(response);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// }

// const getById = async (req, res) => {
//     try {
//         const response = await service.getMedidaById(req.params);
//         res.status(200).send(response);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// }

const persistir = async (req, res) => {
    try {
        const response = await service.persistirNota(req.body);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
}

// const excluir = async (req, res) => {
//     try {
//         let deletado = await service.excluirMedida(req.params);
//         let response = deletado 
//             ? `Registro ${req.params.id} deletado com sucesso` 
//             : `Não foi encontrado nenhum registro com o id ${req.params.id} para ser deletado`;
//         res.status(200).send({ response });
//     } catch (err) {
//         res.status(500).send(err);
//     }
// }

//module.exports.getAllMedidas = getAll;
//module.exports.getMedidaById = getById;
module.exports.persistirNota = persistir;
//module.exports.excluirMedida = excluir;