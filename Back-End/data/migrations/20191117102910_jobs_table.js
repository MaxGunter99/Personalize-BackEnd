
exports.up = function(knex) {

    return knex.schema.createTable( 'jobs' , tbl => {

        // IDs
        tbl
            .increments()

        // Company Name
        tbl
            .string( 'CompanyName' , 128 )
            .notNullable()
            .unique()

        // Applied Through
        tbl
            .string( 'AppliedThrough' , 128 )
            .notNullable()

        // Role Title
        tbl
            .string( 'Role' , 128 )
            .notNullable()

        // Link To Position
        tbl
            .string( 'URL' , 300 )
            .notNullable()

        // Date Added
        tbl
            .timestamps( true , true )

        // Date Applied
        tbl
            .string( 'DateApplied' , 128 )

        // reply recieved? ( yes or no )
        tbl
            .string( 'ReplyRecieved' , 128 )
            .defaultTo( 'No' )

        // details
        tbl
            .string( 'Details' , 300 )


        // ---------------------------------------

        // Phone Screen ( yes / no )
        tbl
            .string( 'PhoneScreen' , 3 )
            .defaultTo( 'No' )

        // Scheduled Or Completed
        tbl
            .string( 'ScheduledOrCompleted' , 128 )

        // Phone Screen Date
        tbl
            .string( 'PhoneScreenDate' , 128 )

        // Follow Up ( yes / no )
        tbl
            .string( 'FollowUp' , 128 )

        // Follow Up Date
        tbl 
            .string( 'FollowUpDate' , 128 )

        // Follow Up Reply Recieved ( yes / no )
        tbl
            .string( 'FollowUpReply' , 128 )


        // ---------------------------------------

        // On Site
        tbl
            .string( 'OnSite' , 128 )
            .defaultTo( 'No' )

        //  Opportunity Type
        tbl
            .string( 'OpportunityType' , 128 )

        // Initial Compensation
        tbl
            .string( 'InitialCompensation' , 128 )

        //  Negotioated ( yes / no )
        tbl
            .string( 'Negotiated' , 128 )

        // Salary
        tbl
            .string( 'Salary' , 128 )

        // Accepted or Rejected
        tbl
            .string( 'AcceptedOrRejected' , 128 )



    })
};

exports.down = function(knex , promise) {
    return knex.schema.dropTableIfExists( 'jobs' );
};
