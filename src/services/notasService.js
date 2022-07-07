const db = require('../config/db');

const getAll = async () => {
    let sql = `
        select
            n.id as nota,
            to_char(n.datahora, 'DD/MM/YYYY HH24:MI:SS') as datahora,
            c.*,
            n.valor_total,
            v.*,
            i.itens
        from notas as n
        inner join clientes as c on (c.id = n.cliente)
        inner join vendedores as v on (v.id = n.vendedor)
        inner join (
            select
                ni.nota,
                array_agg(jsonb_build_object(
                    'item', ni.item,
                    'nome', it.nome,
                    'qtd', ni.quantidade,
                    'unit', ni.valor_unitario,
                    'total', ni.valor_total
                )) as itens
            from nota_itens ni
            inner join itens it on (it.id = ni.item)
            group by ni.nota
        ) as i on (i.nota = n.id)
    `;
    let notas = await db.query(sql);
    return notas.rows;
}

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
module.exports.getAllNotas = getAll;