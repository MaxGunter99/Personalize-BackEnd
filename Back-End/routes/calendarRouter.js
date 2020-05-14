const router = require('express').Router();
const Events = require('./calendarModel');

// Get all events
router.get( '/', ( req , res ) => {

    Events.find()

        .then( events => {

            res.status( 200 )
            res.json( events );
            
        })

        .catch(error => {
            res.status( 500 ).send({ message: 'Server Error getting events!', error })
        })

});

// Get todays events
router.get( '/today' , ( req , res ) =>{

    Events.findToday()

        .then( events => {

            res.status( 200 )
            res.json( events );

        })

        .catch( error => {

            res.status( 500 ).send({ message: 'Server error getting todays events!' , error })

        })

});

// Get this weeks events
router.get( '/week' , ( req , res ) =>{

    Events.findWeek()

        .then( events => {

            res.status( 200 )
            res.json( events );

        })

        .catch( error => {

            res.status( 500 ).send({ message: 'Server error getting this weeks events!' , error })

        })

});

// Get this months events
router.get( '/month' , ( req , res ) =>{

    Events.findMonth()

        .then( events => {

            res.status( 200 )
            res.json( events );

        })

        .catch( error => {

            res.status( 500 ).send({ message: 'Server error getting this months events!' , error })

        })

});

// Get individual Event
router.get( '/:id' , ( req , res ) => {

    Events.findById( req.params.id )

        .then( event => {

            res.status( 200 )
            res.json( event )

        })

        .catch( error => {

            res.status( 500 ).send({ message: 'Server error getting this event by ID' , error })

        })

})

// Add event
router.post('/', async (req, res) => {

    const data  = req.body;

    if ( data ) {

        try {

            const inserted = await Events.add( data );
            res.status( 201 ).json({ message: 'Success!' , data });

        } catch( error ) {

            res.status( 500 ).json({ message: 'We ran into an error' , error });

        }

    } else {

        res.status( 400 ).json({ message: 'Missing Info' });
        
    }
});

// Update event
router.put( '/:id' , async ( req , res ) => {

    const id = req.params.id;
    const event = req.body;
    console.log( id , event )

    if ( event ) {

        try {

            const inserted = await Events.update( id, event )
            res.status( 200 ).json({ message: "Update Success!" , inserted });

        } catch( error ) {

            res.status( 500 ).json({ message: 'We ran into an error' , error });

        }

    } else {

        res.status( 405 ).json({ message: 'No Data Given' });

    }
});

// Delete event
router.delete( '/:id' , ( req, res ) => {

    const { id } = req.params;

    Events.remove( id )

        .then( count => {

            if ( count ) {

                res.status( 200 ).json({ message: 'Successfully Deleted!' });

            } else {

                res.status( 404 ).json({ message: 'Can not find post to Delete' });

            }

        })

        .catch( error => {

            res.status(500).json({ message: 'Server error deleting post' , error });

        })
});

module.exports = router;