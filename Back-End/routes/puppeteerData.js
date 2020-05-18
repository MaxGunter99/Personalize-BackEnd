const router = require('express').Router();
const puppeteer = require('puppeteer');

router.get( '/' , async ( req , res ) => {

    // INDEED
    // var url = 'https://www.indeed.com/jobs?q=web+developer+-Senior+-Java+-PHP+-.NET+-sr+-Sr+-lead+-principal+-administrator+-ios+-manager+-ux+-automation+-webmaster+$50,000+-+$90,000&l=Bee+Cave,+TX&radius=50&explvl=entry_level&limit=50'
    var url = 'https://www.indeed.com/jobs?as_and=Developer&as_phr=&as_any=&as_not=Senior+Java+PHP+.NET+sr+Sr+lead+principal+administrator+ios+manager+ux+automation+webmaster&as_ttl=&as_cmp=&jt=all&st=&sr=directhire&as_src=&salary=%2450%2C000+-+%2490%2C000&radius=50&l=Bee+Cave%2C+TX&fromage=any&limit=50&sort=date&psf=advsrch&from=advancedsearch'

    // var url = 'https://www.indeed.com/jobs?q=developer+-Senior+-Java+-PHP+-.NET+-sr+-ux+-Sr+-lead+-principal+-administrator+-ios+-manager+-automation+-webmaster+$50,000+-+$90,000&l=Austin,+TX&radius=50&explvl=entry_level&limit=50'

    // Whole US
    // var url = 'https://www.indeed.com/jobs?q=(react+or+javascript)+title%3Adeveloper+-Senior+-Java+-PHP+-.NET+-sr+-ux+-Sr+-lead+-principal+-administrator+-ios+-manager+-automation+-webmaster+$50,000+-+$90,000&l=United+States&radius=0&explvl=entry_level&limit=50'
    // var url = 'https://www.indeed.com/jobs?as_and=&as_phr=&as_any=react+javascript+Junior+Jr&as_not=C%2B%2B+Angular+Senior+Java+PHP+.NET+sr+ux+Sr+lead+principal+administrator+ios+manager+automation+webmaster&as_ttl=developer&as_cmp=&jt=all&st=&sr=directhire&as_src=&salary=%2450%2C000+-+%2490%2C000&radius=0&l=United+States&fromage=any&limit=50&sort=date&psf=advsrch&from=advancedsearch'
    // var url = 'https://www.indeed.com/jobs?q=(react+or+javascript+or+Junior+or+Jr+or+Full-Stack+or+Front-End)+title%3Adeveloper+-C%2B%2B+-Angular+-Senior+-Java+-PHP+-.NET+-sr+-ux+-Sr+-lead+-principal+-administrator+-ios+-manager+-automation+-webmaster+$50,000+-+$90,000&l=United+States&radius=0&explvl=entry_level&sort=date&limit=50&sr=directhire'

    var browser = await puppeteer.launch({
        headless: false,
    });

    var page = await browser.newPage();

    await page.goto( url , { waitUntil: 'networkidle2' });

    let indeedData = async ( finalData = [] ) => {

        console.log('start')

        const PagesData = []
        let max = 1

        for ( var x = 0; x < max; x++ ) {

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

                for ( let i of summary ) {
                    data[ index ].push( i.innerText )
                    index += 1
                }

                index = 0

                for ( let x of company ) {
                    data[ index ].push( x.innerText )
                    index += 1
                }

                index = 0

                for ( let y of location ) {
                    data[ index ].push( y.innerText )
                    index += 1
                }

                for ( var x = 0; x < data.length; x++ ) {

                    let current = data[x];
                    let currentFormatted = { 
                        id: x, 
                        title: current[0], 
                        URL: current[1], 
                        description: current[2], 
                        company: current[3], 
                        location: current[4], 
                        jobBoard: 'Indeed' 
                    }

                    puppeteerData.push( currentFormatted )

                }

                return puppeteerData

            });

            for ( var item of loop ) {
                finalData.push( item )
                PagesData.push( item )
            }

            try {
                await page.click( 'path[d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"]' )
                max += 1
            } catch {
                console.log( 'No more pages' )
            }

            await page.goto( page.url() )

        }

        return finalData

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
    res.send(info)

});

module.exports = router;