const express = require("express");
const AccountsRouter = require('./accounts/accounts-router.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
    res.status(200).json({
        message: "The Server is Running, this Endpoint is The Root"
    })
})

module.exports = server;
