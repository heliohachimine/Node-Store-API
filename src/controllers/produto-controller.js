'use strict';

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

exports.get = (req, res, next) =>{
    Produto
    .find({ active: true }, 'title price slug')
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getBySlug = (req, res, next) =>{
    Produto
    .findOne({ slug: req.params.slug,
         active: true 
        }, 
        'title description price slug tags')
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getById = (req, res, next) =>{
    Produto
    .findById(req.params.id)
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getByTag = (req, res, next) =>{
    Produto
    .find({
        tags: req.params.tag,
        active: true
    }, 'title description price slug tags')
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}


exports.post = (req, res, next) => {
    var produto = new Produto(req.body);
    produto
        .save()
        .then(x => {
            res.status(201).send({ 
                message: 'Produto cadastrado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({ 
                message: 'Falha ao cadastrar produto!', 
                data: e 
            });
        });
};

exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send({ 
        id: id, 
        item: req.body 
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};