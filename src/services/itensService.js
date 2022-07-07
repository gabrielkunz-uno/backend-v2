const db = require("../config/db");

const getAll = async () => {
    let sql = 'select * from itens';
    let itens = await db.query(sql);
    return itens.rows;
}

const getById = async (params) => {
    let sql = `select * from itens where id = $1`;
    let item = await db.query(sql, [params.id]);
    return item.rows;
}

const persistir = async (params) => {
    if (!params.id) {
      let sql = `insert into itens (codigo, nome, medida, grupo, valor_venda, preco_custo, estoque, inativo) 
        values ($1, $2, $3, $4, $5, $6, $7, $8) returning id;`;
      const { codigo, nome, medida, grupo, valor_venda, preco_custo, estoque, inativo } = params;
      const query = await db.query(sql, [codigo, nome, medida, grupo, valor_venda, preco_custo, estoque, inativo]);
  
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
    const sql = `update itens set ${fields} where id = ${params.id}`;
  
    const response = await db.query(sql);
    const msg = response.rowCount === 0
      ? `Não foi encontrado nenhum registro com o id ${params.id}`
      : `Registro ${params.id} alterado com sucesso!`;
  
    return { type: 'info', msg }
}

const excluir = async (params) => {
    let sql = 'delete from itens where id = $1;';
    let query = await db.query(sql, [params.id]);
    return query.rowCount == 1;
}

module.exports.getAllItens = getAll;
module.exports.getItemById = getById;
module.exports.persistirItem = persistir;
module.exports.excluirItem = excluir;