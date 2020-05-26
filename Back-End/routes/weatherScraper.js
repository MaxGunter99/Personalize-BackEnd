const router = require('express').Router();
const puppeteer = require('puppeteer');

router.get( '/' , async ( req , res ) => {

    let initialURL = 'https://www.google.com/';

    const browser = await puppeteer.launch({
        // headless: false,
    });

    const page = await browser.newPage();

    await page.goto( initialURL , { waitUntil: 'networkidle2' });

    await page.focus( 'input' );
    await page.keyboard.type( 'Weather' );
    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    let Weather = await page.evaluate( () => {

        let WeatherData = {};
        WeatherData[ 'Location' ] = document.querySelector( 'div[class="vk_gy vk_h"]' ).innerText
        WeatherData[ 'Description' ] = document.querySelector( 'span[class="vk_gy vk_sh"]' ).innerText
        WeatherData[ 'ImageURL' ] = document.querySelector( 'img[id="wob_tci"]' ).src
        WeatherData[ 'Temperature' ] = document.querySelector( 'div[class="vk_gy"]' ).innerText

        // This Week weather

        // let thisWeekDays = document.querySelectorAll( 'div[class="wob_df"]' )
        // let index = 0
        // for ( var individual of thisWeekDays ) {
        //     let contents = {}
        //     contents[ 'Day' ] = individual.innerText
        //     // contents[ 'Image' ] = individual.offsetParent.children.querySelector( 'img[data-atf="1"]' ).src
        //     // contents[ 'max' ] = individual.document.querySelector('div[class="vk_gy"]').outerText
        //     index += 1
        //     WeatherData[ "Day-" + String( index ) ] = contents
        // }

        return WeatherData

    });

    await browser.close();
    res.send( Weather )


});

module.exports = router;