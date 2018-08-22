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

exports.delete = (req, res, next) => {
    Produto
    .findOneAndRemove(req.body.id)
    .then(x => {
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao remover produto',
            data: e
        });
    });
};

exports.put = (req, res, next) => {
    Produto
    .findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    }).then(x => {
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao atualizar produto',
            data: e
        });
    });
};