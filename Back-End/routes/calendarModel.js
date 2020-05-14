
//IMPORTS ⬇︎
const db = require( '../data/dbConfig' );

//EXPORTS ⬇︎
module.exports = {

    add,
    find,
    findToday,
    findWeek,
    findMonth,
    findById,
    update,
    remove

};

// Add event
function add( event ) {

    db( 'calendar' )
        .insert( event )
        .then(([ id ]) => {

            return findById( id );

        });

};

// Find all events
function find() {

    return db( 'calendar' );

};

// Find todays events
function findToday() {

    const today = new Date().toLocaleDateString().split('/')
    const day = today[1]
    const month = today[0]
    const year = today[2]

    // console.log( 'TODAY:' , today )

    return db( 'calendar' )

        .where({ day: day, month: month, year: year })

};

// Find todays events
function findWeek() {

    const lastWeekDays = []
    const lastWeekMonths = []
    const lastWeekYear = []

    const today = new Date().getDate()

    // // Gets calendar date for last 8 days
    for (var i = 0; i < 7; i++) {

        const prev = new Date(today) - i
        const prevDay = new Date().setDate(prev)
        const thatDay = new Date(prevDay).toLocaleDateString()
        const day = thatDay.split('/')

        lastWeekDays.push( Number( day[1] ) )
        lastWeekMonths.push( Number( day[0] ) )
        lastWeekYear.push( Number( day[2] ) )
            
    }
    
    // console.log( '\nLast week:' , lastWeekDays )

    return db( 'calendar' )

        .whereBetween( 'day' , [ lastWeekDays[6] , lastWeekDays[0] ] )
        .whereBetween( 'month' , [ lastWeekMonths[6] , lastWeekMonths[0] ] )
        .whereBetween( 'year' , [ lastWeekYear[6] , lastWeekYear[0] ] )
        

};

// Find this months events
function findMonth() {

    const today = new Date().toLocaleDateString().split('/')
    const day = today[1]
    const month = today[0]
    const year = today[2]

    return db( 'calendar' )
        .where({ month: month, year: year })

};

// Find event by id
function findById( id ) {

    return db( 'calendar' )
        .where({ id: id })

};

// Update event
function update( id , changes ) {

    return db( 'calendar' )
        .where({ id })
        .update( changes )

};

// Remove event
function remove( id ) {

    return db( 'calendar' )
        .where( 'id' , id )
        .del();

};