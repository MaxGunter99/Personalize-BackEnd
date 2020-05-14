//IMPORTS ⬇︎
const knex = require( 'knex' );
const knexConfig = require( '../knexfile' );

//EXPORTS ⬇︎
module.exports = knex( knexConfig.development );