create table clientes (
    id serial primary key,
    nome varchar(200) not null,
    cpfcnpj varchar(18) not null unique,
    email varchar(200),
    telefone varchar(16),
    celular varchar(16),
    endereco varchar(200),
    numero integer,
    complemento varchar(50),
    bairro varchar(60),
    cep varchar(9),
    municipio varchar(200),
    uf varchar(2),
    municipio_ibge integer,
    inativo boolean not null default false
);

create table grupos (
    id serial primary key,
    nome varchar(100) not null,
    inativo boolean not null default false
);

create table medidas (
    id serial primary key,
    abreviacao varchar(10) not null,
    descricao varchar(50) not null,
    quantidade numeric(15,5) not null,
    inativo boolean not null default false
);

create table itens (
    id serial primary key,
    codigo varchar(50) not null unique,
    nome varchar(200) not null,
    medida integer not null,
    grupo integer,
    valor_venda numeric(15,2) not null default 0,
    preco_custo numeric(15,2) not null default 0,
    estoque numeric(15,5) not null default 0,
    inativo boolean not null default false,
    constraint fk_medidas_to_produtos foreign key (medida) references medidas (id),
    constraint fk_grupos_to_produtos foreign key (grupo) references grupos (id)
);

create table vendedores (
    id serial primary key,
    nome varchar(200) not null,
    cpfcnpj varchar(18) not null unique,
    comissao numeric(15,5) not null default 0,
    inativo boolean not null default false
);

create table notas (
    id serial primary key,
    datahora timestamp without time zone not null default now(),
    cliente integer not null,
    vendedor integer not null,
    valor_total numeric(15,2) not null,
    constraint fk_clientes_to_notas foreign key (cliente) references clientes (id),
    constraint fk_vendedores_to_notas foreign key (vendedor) references vendedores (id)  
);

create table nota_itens (
    id serial primary key,
    nota integer not null,
    item integer not null,
    quantidade numeric(15,5) not null,
    valor_unitario numeric(15,2) not null,
    valor_total numeric(15,2) not null,
    constraint fk_notas_to_nota_itens foreign key (nota) references notas (id),
    constraint fk_itens_to_nota_itens foreign key (item) references itens (id)
);