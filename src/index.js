import puppeteer from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'

puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))


// Add adblocker plugin to block all ads and trackers (saves bandwidth)
// That's it, the rest is puppeteer usage as normal 😊
    console.time('Request time:')
    puppeteer.launch({ headless: false }).then(async browser => {

    const page = await browser.newPage()
    await page.setViewport({ width: 800, height: 600 })


  /* Tests
    console.log(`Testing adblocker plugin..`)
    await page.goto('https://www.vanityfair.com')
    await page.waitForTimeout(1000)
    await page.screenshot({ path: 'adblocker.png', fullPage: true })

    console.log(`Testing the stealth plugin..`)
    await page.goto('https://bot.sannysoft.com')
    await page.waitForTimeout(5000)
    await page.screenshot({ path: 'stealth.png', fullPage: true })

//   console.log(`All done, check the screenshots. ✨`)
*/


    await page.goto('https://shop.bt.com/forms/playstation-5', {
        waitUntil: 'domcontentloaded'
    });

    cookieModal = await page.$('#cookieModal')
    

    console.timeEnd('Request time:')

    // await browser.close()

})