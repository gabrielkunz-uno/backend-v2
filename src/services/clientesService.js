const db = require("../config/db");

const getAll = async () => {
    let sql = 'select * from clientes';
    let clientes = await db.query(sql);
    return clientes.rows;
}

const getById = async (params) => {
    let sql = `select * from clientes where id = $1`;
    let cliente = await db.query(sql, [params.id]);
    return cliente.rows;
}

const persistir = async (params) => {
    if (!params.id) {
      let sql = `insert into clientes (nome, cpfcnpj, email, telefone, celular, endereco, numero, complemento, bairro, cep, municipio, uf, municipio_ibge, inativo)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning id;`
      const { nome, cpfcnpj, email, telefone, celular, endereco, numero, complemento, bairro, cep, municipio, uf, municipio_ibge, inativo } = params;
      const query = await db.query(sql, [nome, cpfcnpj, email, telefone, celular, endereco, numero, complemento, bairro, cep, municipio, uf, municipio_ibge, inativo]);
  
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
    const sql = `update clientes set ${fields} where id = ${params.id}`;
  
    const response = await db.query(sql);
    const msg = response.rowCount === 0
      ? `Não foi encontrado nenhum registro com o id ${params.id}`
      : `Registro ${params.id} alterado com sucesso!`;
  
    return { type: 'info', msg }
}

const excluir = async (params) => {
    let sql = 'delete from clientes where id = $1;';
    let query = await db.query(sql, [params.id]);
    return query.rowCount == 1;
}

module.exports.getAllClientes = getAll;
module.exports.getClienteById = getById;
module.exports.persistirCliente = persistir;
module.exports.excluirCliente = excluir;