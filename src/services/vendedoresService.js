const db = require("../config/db");

const getAll = async () => {
  let sql = 'select * from vendedores';
  let vendedores = await db.query(sql);
  return vendedores.rows;
}

const getById = async (params) => {
  let sql = `select * from vendedores where id = $1`;
  let vendedor = await db.query(sql, [params.id]);
  return vendedor.rows;
}

const persistir = async (params) => {
  if (!params.id) {
    let sql = `insert into vendedores (nome, cpfcnpj, comissao, inativo) values ($1, $2, $3, $4) returning id;`
    const { nome, cpfcnpj, comissao, inativo } = params;
    const query = await db.query(sql, [nome, cpfcnpj, comissao, inativo]);

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
  const sql = `update vendedores set ${fields} where id = ${params.id}`;

  const response = await db.query(sql);
  const msg = response.rowCount === 0
    ? `Não foi encontrado nenhum registro com o id ${params.id}`
    : `Registro ${params.id} alterado com sucesso!`;

  return { type: 'info', msg }
}

const excluir = async (params) => {
  let sql = 'delete from vendedores where id = $1;';
  let query = await db.query(sql, [params.id]);
  return query.rowCount == 1;
}

module.exports.getAllVendedores = getAll;
module.exports.getVendedorById = getById;
module.exports.persistirVendedor = persistir;
module.exports.excluirVendedor = excluir;