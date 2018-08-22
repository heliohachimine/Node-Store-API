'use strict';

const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');

exports.get = async(data) => {
    var res = await Pedido
    .find({}, 'number status cliente items')
    .populate('cliente', 'name')
    .populate('items.produto','title');
    return res;
}

exports.create = async(data) => {
    var pedido = new Pedido(data);
    await pedido.save();
}