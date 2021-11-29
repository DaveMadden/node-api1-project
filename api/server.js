// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model')

const server = express();

server.use(express.json()); //middleware to support JSON

module.exports = server;
