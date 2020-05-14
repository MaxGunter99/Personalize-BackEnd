const router = require('express').Router();
const Jobs = require('./jobsModel');

// Get All Jobs
router.get('/', (req, res) => {

    Jobs.find()

        .then( jobs => {

            res.json( jobs )

        })

        .catch(error => {

            res.send({ message: 'Server Error getting Jobs', error })

        })

});

// Get Specific Job
router.get('/:id', (req, res) => {

    Jobs.findById( req.params.id )

        .then( jobs => {

            res.json( jobs );

        })

        .catch(error => {

            res.send({ message: 'Server Error getting Jobs', error })

        })

});

// Add A Job
router.post('/', async (req, res) => {

    const job  = req.body;

    if (job) {

        try {
            
            const inserted = await Jobs.add({ 
                CompanyName: job.CompanyName , 
                AppliedThrough: job.AppliedThrough , 
                Role: job.Role , 
                URL: job.URL , 
                DateApplied: job.DateApplied , 
                ReplyRecieved: job.ReplyRecieved , 
                Details: job.Details , 
                PhoneScreen: job.PhoneScreen , 
                ScheduledOrCompleted: job.ScheduledOrCompleted ,
                PhoneScreenDate: job.PhoneScreenDate ,
                FollowUp: job.FollowUp ,
                FollowUpDate: job.FollowUpDate ,
                FollowUpReply: job.FollowUpReply ,
                OnSite: job.OnSite ,
                OpportunityType: job.OpportunityType,
                InitialCompensation: job.InitialCompensation,
                Negotiated: job.Negotiated ,
                Salary: job.Salary ,
                AcceptedOrRejected: job.AcceptedOrRejected
            });
            res.status( 201 ).json( inserted );

        } catch( error ) {

            res.status( 500 ).json({ message: 'We ran into an error' , error });

        }

    } else {

        res.status( 400 ).json({ message: 'Missing Info' });

    }
});

//Update Job
router.put( '/:id' , async ( req , res ) => {

    const id = req.params.id;
    const job = req.body;
    console.log( id , job )

    if ( job ) {

        try {

            const inserted = await Jobs.update( id, job )
            res.status( 200 ).json({ message: "Update Success!" , inserted });

        } catch( error ) {

            res.status( 500 ).json({ message: 'We ran into an error' , error });

        }

    } else {

        res.status( 405 ).json({ message: 'No Data Given' });

    }
});

//DELETE post
router.delete( '/:id' , ( req, res ) => {

    const { id } = req.params;

    Jobs.remove( id )

        .then( count => {

            if ( count ) {

                res.status( 200 ).json({ message: 'Successfully Deleted!' , count });

            } else {

                res.status( 404 ).json({ message: 'Can not find post to Delete' });

            }
        })

        .catch( err => {

            res.status(500).json({ message: 'Server error deleting post' });

        })
        
});

module.exports = router;