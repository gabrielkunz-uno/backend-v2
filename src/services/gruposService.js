const db = require("../config/db");

const getAll = async () => {
  let sql = 'select * from grupos';
  let grupos = await db.query(sql);
  return grupos.rows;
}

const getById = async (params) => {
  let sql = `select * from grupos where id = $1`;
  let grupo = await db.query(sql, [params.id]);
  return grupo.rows;
}

const persistir = async (params) => {
  if (!params.id) {
    let sql = `insert into grupos (nome, inativo) values ($1, $2) returning id;`
    const { nome, inativo } = params;
    const query = await db.query(sql, [nome, inativo]);

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
  const sql = `update grupos set ${fields} where id = ${params.id}`;

  const response = await db.query(sql);
  const msg = response.rowCount === 0
    ? `Não foi encontrado nenhum registro com o id ${params.id}`
    : `Registro ${params.id} alterado com sucesso!`;

  return { type: 'info', msg }
}

const excluir = async (params) => {
  let sql = 'delete from grupos where id = $1;';
  let query = await db.query(sql, [params.id]);
  return query.rowCount == 1;
}

module.exports.getAllGrupos = getAll;
module.exports.getGrupoById = getById;
module.exports.persistirGrupo = persistir;
module.exports.excluirGrupo = excluir;