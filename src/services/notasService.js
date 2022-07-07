const db = require('../config/db')

const persistir = async (params) => {
    const valorTotal = calcularTotalNota(params.itens);
    const { datahora, cliente, vendedor } = params;
    let sqlNota = `insert into notas (datahora, cliente, vendedor, valor_total)
        values ($1, $2, $3, $4) returning id;`
    let response = await db.query(sqlNota, [datahora, cliente, vendedor, valorTotal]);
    let idNota = response.rows[0].id;
    
    //gravar itens da nota;
    let sqlItens = `
        insert into nota_itens 
        (nota, item, quantidade, valor_unitario, valor_total) values 
        ($1, $2, $3, $4, $5);
    `;

    params.itens.forEach(async itemNota => {
        let { item, quantidade, valor_unitario, valor_total } = itemNota;
        await db.query(sqlItens, [idNota, item, quantidade, valor_unitario, valor_total]) 
    });

    return { msg: 'Nota cadastrada com sucesso', data: { idNota } }
}

const calcularTotalNota = (itens) => {
    return itens
        .map(item => item.valor_total)
        .reduce((soma, valorAtual) => soma + valorAtual);
}

module.exports.persistirNota = persistir;