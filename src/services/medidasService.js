const db = require("../config/db");

const getAll = async () => {
  let sql = 'select * from medidas';
  let medidas = await db.query(sql);
  return medidas.rows;
}

const getById = async (params) => {
  let sql = `select * from medidas where id = $1`;
  let medida = await db.query(sql, [params.id]);
  return medida.rows;
}

const persistir = async (params) => {
  if (!params.id) {
    let sql = `insert into medidas (abreviacao, descricao, quantidade, inativo) values ($1, $2, $3, $4) returning id;`
    const { abreviacao, descricao, quantidade, inativo } = params;
    const query = await db.query(sql, [abreviacao, descricao, quantidade, inativo]);

    return { type: 'info', msg: 'Registro incluído com sucesso!', data: { id: query.rows[0].id } };
  }

  let fields = [];

  Object.keys(params).forEach(e => {
    if (e !== 'id') {
      if (params[e] === '' || params[e] == null) {
        fields.push(`${e} = null`)
      } else {
        fields.push(`${e} = '${params[e]}'`)
      }
    }
  });
  fields = fields.join(', ');
  const sql = `update medidas set ${fields} where id = ${params.id}`;

  const response = await db.query(sql);
  const msg = response.rowCount === 0
    ? `Não foi encontrado nenhum registro com o id ${params.id}`
    : `Registro ${params.id} alterado com sucesso!`;

  return { type: 'info', msg }
}

const excluir = async (params) => {
  let sql = 'delete from medidas where id = $1;';
  let query = await db.query(sql, [params.id]);
  return query.rowCount == 1;
}

module.exports.getAllMedidas = getAll;
module.exports.getMedidaById = getById;
module.exports.persistirMedida = persistir;
module.exports.excluirMedida = excluir;