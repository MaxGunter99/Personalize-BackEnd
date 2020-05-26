
// Imports
const express = require( 'express' );
const server = express();
const morgan = require( 'morgan' );
const helmet = require( 'helmet' );
const cors = require( 'cors' );

// Routers
const jobs = require( '../routes/jobsRouter' );
const calendar = require( '../routes/calendarRouter' );
const puppeteerData = require( '../routes/puppeteerData' );
const weather = require( '../routes/weatherScraper' );

// Apply Middleware
server.use( express.json() );
server.use( morgan( 'short' ) );
server.use( helmet() );
server.use( cors() );

// Router extensions
server.use( '/jobs' , jobs );
server.use( '/events' , calendar );
server.use( '/puppeteer' , puppeteerData );
server.use( '/weather' , weather );

// Sanity Check
server.use( '/' , ( req , res ) => {
    res.send( 'Your Good' );
});

// Exports
module.exports = server;