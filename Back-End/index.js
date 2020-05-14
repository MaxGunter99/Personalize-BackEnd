// Server port setup

//IMPORTS ⬇︎
const server = require( './api/server' );
const port = process.env.PORT || 3000;

//SERVER LOCATION ⬇︎
server.listen( port , () => console.log( `\n Server is up on http://localhost:${port}, "Love You 3000" - Tony Stark\n` ));