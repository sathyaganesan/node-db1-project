const knex = require("knex");

const knexfile = require("../knexfile.js");

// change to "production" and update knexfile.js to use postgres.
const production = "development";

module.exports = knex(knexfile[production]);
