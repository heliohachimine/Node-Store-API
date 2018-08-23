'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

//Conecta ao banco
mongoose.connect(config.connectionString);

//Carrega os models
const Produto = require('./models/produto'); 
const Cliente = require('./models/cliente');
const Pedido = require('./models/pedido');

//Carrega as rotas
const indexRoute = require('./routes/index-route');
const produtoRoute = require('./routes/produto-route');
const clienteRoute = require('./routes/cliente-route');
const pedidoRoute = require('./routes/pedido-route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

//Habilita o CORS
app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');  
    next();
})

app.use('/', indexRoute);
app.use('/produtos', produtoRoute);
app.use('/clientes', clienteRoute);
app.use('/pedidos', pedidoRoute);

module.exports = app;