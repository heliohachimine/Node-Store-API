'use strict';

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

exports.create = async(data) => {
    var cliente = new Cliente(data);
    await cliente.save();
}

exports.authenticate = async(data) => {
    const res = await Cliente.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}