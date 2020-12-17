const express = require("express");
const welcomeRouter = require("../data/welcome/welcomeRouter");
const accoutsRouter = require('../data/seeds/accoutsRouter');

// const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use("/", welcomeRouter);
server.use("/accounts", accoutsRouter);


module.exports = server;
