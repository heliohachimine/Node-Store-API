'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//Conecta ao banco
mongoose.connect('mongodb://heliohachimine:helio123@ds018248.mlab.com:18248/node-str');

//Carrega os models
const Produto = require('./models/produto'); 
const Cliente = require('./models/cliente');

//Carrega as rotas
const indexRoute = require('./routes/index-route');
const produtoRoute = require('./routes/produto-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoute);
app.use('/produtos', produtoRoute);

module.exports = app;