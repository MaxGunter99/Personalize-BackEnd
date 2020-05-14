
exports.up = function(knex) {
    return knex.schema.createTable( 'calendar' , tbl => {

        // IDs
        tbl.increments()

        // Title
        tbl.string( 'title' , 128 )

        // Category
        tbl.string( 'category' , 128 )

        // Day
        tbl.int( 'day' )

        // Month
        tbl.int( 'month' )

        // Year
        tbl.int( 'year' )

        // URL
        tbl.string( 'URL' )

        // Notes
        tbl.string( 'notes' , 500 )

        // Time
        tbl.string( 'time' , 128 )

    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists( 'calendar' )
};
