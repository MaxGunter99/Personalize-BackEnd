const router = require('express').Router();
const puppeteer = require('puppeteer');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


router.get( '/' , async ( req , res ) => {

    // INDEED

    // Entry level Web Developer ( Austin - All )
    // var url =  'https://www.indeed.com/jobs?q=web+developer+-java&l=Austin,+TX&radius=50&explvl=entry_level&sort=date'

    // Entry level Front end developer ( Austin )
    // var url = 'https://www.indeed.com/jobs?q=Front+end+developer+-java&l=Austin,+TX&radius=50&explvl=entry_level&sort=date'

    // Front End Developer ( Austin - All )
    // const url = 'https://www.indeed.com/jobs?q=front+end+developer&l=Austin%2C+TX'

    // Entry level Web Developer ( Austin - filters out senior level jobs )
    var url = 'https://www.indeed.com/jobs?as_and=Developer&as_phr=&as_any=&as_not=Senior+Java+PHP+.NET+sr+Sr+lead+principal+administrator+ios+manager+ux+automation+webmaster&as_ttl=&as_cmp=&jt=all&st=&sr=directhire&as_src=&salary=%2450%2C000+-+%2490%2C000&radius=50&l=Bee+Cave%2C+TX&fromage=any&limit=50&sort=date&psf=advsrch&from=advancedsearch'
    // let url = 'https://www.indeed.com/jobs?q=(bootcamp+or+Junior+or+Web+or+frontend+or+fullstack)+title:developer+-Senior+-Java+-PHP+-.NET+-sr+-Sr+-lead+-principal+-administrator+-ios+-manager+-ux+-automation+-webmaster&l=Bee+Cave,+TX&radius=50&explvl=entry_level&sort=date&limit=50&sr=directhire'
    // var url = 'https://www.indeed.com/jobs?q=%28react+or+javascript+or+Junior+or+Jr+or+Full-Stack+or+Front-End+or+Developer+or+engineer%29+title%3Adeveloper+-Senior+-Java+-PHP+-.NET+-sr+-Sr+-lead+-principal+-administrator+-ios+-manager+-ux+-automation+-webmaster&l=Bee+Cave%2C+TX&radius=25&sort=date'


    // Whole US
    // var url = 'https://www.indeed.com/jobs?q=(react+or+javascript)+title%3Adeveloper+-Senior+-Java+-PHP+-.NET+-sr+-ux+-Sr+-lead+-principal+-administrator+-ios+-manager+-automation+-webmaster+$50,000+-+$90,000&l=United+States&radius=0&explvl=entry_level&limit=50'
    // var url = 'https://www.indeed.com/jobs?as_and=&as_phr=&as_any=react+javascript+Junior+Jr&as_not=C%2B%2B+Angular+Senior+Java+PHP+.NET+sr+ux+Sr+lead+principal+administrator+ios+manager+automation+webmaster&as_ttl=developer&as_cmp=&jt=all&st=&sr=directhire&as_src=&salary=%2450%2C000+-+%2490%2C000&radius=0&l=United+States&fromage=any&limit=50&sort=date&psf=advsrch&from=advancedsearch'
    // var url = 'https://www.indeed.com/jobs?q=(react+or+javascript+or+Junior+or+Jr+or+Full-Stack+or+Front-End)+title%3Adeveloper+-C%2B%2B+-Angular+-Senior+-Java+-PHP+-.NET+-sr+-ux+-Sr+-lead+-principal+-administrator+-ios+-manager+-automation+-webmaster+$50,000+-+$90,000&l=United+States&radius=0&explvl=entry_level&sort=date&limit=50&sr=directhire'

    const browser = await puppeteer.launch({
        // headless: false,
    });

    const page = await browser.newPage();

    await page.goto( url , { waitUntil: 'networkidle2' });

    let indeedData = async ( finalData = [] ) => {

        const PagesData = [];
        let max = 1;

        for ( let x = 0; x < max; x++ ) {

            const loop = await page.evaluate( () => {

                let data = [];
                let puppeteerData = []
                let elements = document.querySelectorAll('h2[class="title"]')
                let summary = document.querySelectorAll('div[class="summary"]')
                let company = document.querySelectorAll('span[class="company"]')
                let location = document.querySelectorAll('[class="location accessible-contrast-color-location"')
                let index = 0;

                for ( let e of elements ) {
                    data.push( [ e.innerText, e.firstElementChild.href ] )
                }

                for ( let s of summary ) {
                    data[ index ].push( s.innerText )
                    index += 1
                }

                index = 0

                for ( let c of company ) {
                    data[ index ].push( c.innerText )
                    index += 1
                }

                index = 0

                for ( let l of location ) {
                    data[ index ].push( l.innerText )
                    index += 1
                }

                for ( let jobData = 0; jobData < data.length; jobData++ ) {

                    let current = data[ jobData ];
                    let currentFormatted = { 
                        id: jobData, 
                        title: current[0], 
                        URL: current[1], 
                        description: current[2], 
                        company: current[3], 
                        location: current[4], 
                        jobBoard: 'Indeed' 
                    }

                    puppeteerData.push( currentFormatted );

                }

                return puppeteerData;

            });

            for ( let item of loop ) {
                finalData.push( item );
                PagesData.push( item );

            };

            try {
                await page.click( 'path[d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"]' );
                max += 1

            } catch {
                console.log( 'No more pages' )

            };

            await page.goto( page.url() );
            // await page.waitFor( 1000 )

        };

        return finalData;

    };



    // // LINKEDIN
    // // let url2 = 'https://www.linkedin.com/jobs/search/?distance=25&f_E=2&f_PP=104472865&geoId=104472865&keywords=web%20developer&location=Austin%2C%20Texas%2C%20United%20States'
    // let url2 = 'https://www.linkedin.com/jobs/search/?distance=25&f_E=2&f_TPR=r604800&geoId=104472865&keywords=full%20stack%20developer&location=Austin%2C%20Texas%2C%20United%20States&sortBy=DD'

    // // await page.goto( url2 , { waitUntil: 'networkidle2' });
    // let linkedInData = await page.evaluate(async () => {

    //     let data = [];
    //     let LinkedInData = [];
    //     let title = document.querySelectorAll('h3[class="result-card__title job-result-card__title"]');
    //     let company = document.querySelectorAll('a[class="result-card__subtitle-link job-result-card__subtitle-link"]')
    //     let summary = document.querySelectorAll('p[class="job-result-card__snippet"]')
    //     let location = document.querySelectorAll('span[class="job-result-card__location"]')
    //     let URL = document.querySelectorAll('a[class="result-card__full-card-link"]')


    //     let index = 0;

    //     for (let t of title) {
    //         data.push([{ title: t.innerText }])

    //     }

    //     index = 0

    //     for (let u of URL) {
    //         data[index][0]['URL'] = u.href
    //         index += 1
    //     }

    //     index = 0

    //     for (let c of company) {
    //         data[index][0]['company'] = c.innerText
    //         index += 1
    //     }

    //     index = 0

    //     for (let s of summary) {
    //         data[index][0]['jobBoard'] = 'LinkedIn'
    //         index += 1
    //     }

    //     index = 0

    //     for (let l of location) {
    //         data[index][0]['location'] = l.innerText
    //         index += 1
    //     }

    //     index = 0

    //     for (let s of summary) {
    //         data[index][0]['description'] = s.innerTextdata
    //         data[index][0]['id'] = index
    //         index += 1
    //     }

    //     for (var x = 0; x < data.length; x++) {
    //         let current = data[x]
    //         LinkedInData.push(current[0])
    //     }

    //     return LinkedInData

    // });

    // let info = [ indeedData , linkedInData ]
    let info = [ await indeedData() ]
    // let info = [ linkedInData ]
    browser.close();
    res.send( info )

});


// Custom search
const customSearch = async ( details ) => {

    const browser = await puppeteer.launch({
        // headless: false,
    });

    const page = await browser.newPage();

    let url = 'https://www.indeed.com/advanced_search?q=&l=Austin%2C+TX'

    await page.goto( url , { waitUntil: 'networkidle2' });

    // FORMATTED
    // {
    //     "WithAllOfTheseWords": "aaa"
    //     "WithTheExactPhrase": "1+ years",
    //     "WithAtLeastOneOfTheseWords": "React Javascript",
    //     "WithNoneOfTheseWords": "C++ Java Sr Senior",
    //     "WithTheseWordsInTitle": "developer",
    //     "FromThisCompany": "Apple"
    // }

    // Input "With all of these words"
    if ( details.WithAllOfTheseWords ) {
        await page.focus( 'input[name="as_and"]' );
        await page.keyboard.type( details.WithAllOfTheseWords )
    }

    // Input "With the exact phrase"
    if ( details.WithTheExactPhrase ) {
        await page.focus( 'input[name="as_phr"]' );
        await page.keyboard.type( details.WithTheExactPhrase );
    }

    // Input "With at least one of these words"
    if ( details.WithAtLeastOneOfTheseWords ) {
        await page.focus( 'input[name="as_any"]' );
        await page.keyboard.type( details.WithAtLeastOneOfTheseWords );
    }

    // Input "With none of these words"
    if ( details.WithNoneOfTheseWords ) {
        await page.focus( 'input[name="as_not"]' );
        await page.keyboard.type( details.WithNoneOfTheseWords );
    }

    // Input "With these words in the title"
    if ( details.WithTheseWordsInTitle ) {
        await page.focus( 'input[name="as_ttl"]' );
        await page.keyboard.type( details.WithTheseWordsInTitle );
    }

    // Input "From this company"
    if ( details.FromThisCompany ) {
        await page.focus( 'input[name="as_cmp"]' );
        await page.keyboard.type( details.FromThisCompany );
    }

    // Submit search
    await page.click( 'button[ value="Find Jobs" ]' )

    const newURL = await page.url()
    browser.close();
    return newURL

}

router.post( '/' , async ( req , res ) => {


    url = await customSearch( req.body )

    console.log( 'Done! URL: ' , url )

    // INDEED

    const browser = await puppeteer.launch({
        // headless: false,
    });

    const page = await browser.newPage();

    await page.goto( url , { waitUntil: 'networkidle2' });

    let indeedData = async ( finalData = [] ) => {

        const PagesData = [];
        let max = 1;

        for ( let x = 0; x < max; x++ ) {

            const loop = await page.evaluate( () => {

                let data = [];
                let puppeteerData = []
                let elements = document.querySelectorAll('h2[class="title"]')
                let summary = document.querySelectorAll('div[class="summary"]')
                let company = document.querySelectorAll('span[class="company"]')
                let location = document.querySelectorAll('[class="location accessible-contrast-color-location"')
                let index = 0;

                for ( let e of elements ) {
                    data.push( [ e.innerText, e.firstElementChild.href ] )
                }

                for ( let s of summary ) {
                    data[ index ].push( s.innerText )
                    index += 1
                }

                index = 0

                for ( let c of company ) {
                    data[ index ].push( c.innerText )
                    index += 1
                }

                index = 0

                for ( let l of location ) {
                    data[ index ].push( l.innerText )
                    index += 1
                }

                for ( let jobData = 0; jobData < data.length; jobData++ ) {

                    let current = data[ jobData ];
                    let currentFormatted = { 
                        id: jobData, 
                        title: current[0], 
                        URL: current[1], 
                        description: current[2], 
                        company: current[3], 
                        location: current[4], 
                        jobBoard: 'Indeed' 
                    }

                    puppeteerData.push( currentFormatted );

                }

                return puppeteerData;

            });

            for ( let item of loop ) {
                finalData.push( item );
                PagesData.push( item );

            };

            try {
                await page.click( 'path[d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"]' );
                if ( max < 20 ) {
                    max += 1
                }

            } catch {
                console.log( 'No more pages' )

            };

            await page.goto( page.url() );
            // await page.waitFor( 1000 )

        };

        return finalData;

    };

    let info = [ await indeedData() ]
    browser.close();
    res.send( info )

});

module.exports = router;