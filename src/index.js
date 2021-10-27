import puppeteer from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
import fs from 'fs'
import useProxy from 'puppeteer-page-proxy'

puppeteer.use(StealthPlugin())
// puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

const emails = "src/emails.txt";
const successfullyEntered = "src/successfullyEntered.txt";

const emailAddress = 'test@ukfastprime.com'

const btPage = {
    emailAddress: "#EmailAddress",
    submit: "#contentbody > div > div > form > div.button-bar.bottom.float-right > button",
    cookieBanner: '#spanAboutCookiesOk > button'
}

let successEnter = (email) => {
    fs.appendFile(successfullyEntered, `${email}}\n`, function (err) {
        if (err) console.log(err);
    });
    console.log('\x1b[32m%s\x1b[0m', `${email} successfully entered`);
};

try {
    const importedEmails = fs.readFileSync(emails, "utf8");
    fs.appendFile(successfullyEntered, `\n${new Date()}\n`, function (err) {
        if (err) console.log(err);
    });
    console.log(`Appended date ${new Date()} to Success file`)
    
    let allData = importedEmails.split("\n");
    console.log(allData)
    } catch (error) {
        console.log(error);
    }



let start = async () => {

            console.log("==> Starting Browser")

    // Add adblocker plugin to block all ads and trackers (saves bandwidth)
    // That's it, the rest is puppeteer usage as normal 😊
        console.time('Request time:')

        const browser = await puppeteer.launch(
            {headless: false, slowMo: 50},
            {args: ['--proxy-server=zproxy.lum-superproxy.io:22225']}
            )


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

    console.log("==> Adding Proxy")


    // await useProxy(page, 'http://127.0.0.1:24000');
    console.log("==> Proxy Added")

    
    // const data = await useProxy.lookup(page);
    // console.log(data.ip);

    console.log("==> Navigating to Page")

    await page.goto('https://shop.bt.com/forms/playstation-5')
    
    console.log("==> On BT Page")
    
    await page.setViewport({ width: 1280, height: 1306 })

        console.log("==> Waiting for cookie selector")
        
        await page.waitForSelector(btPage.cookieBanner)
        await page.click(btPage.cookieBanner)

        console.log("==> Found cookie selector")

        await page.click(btPage.cookieBanner)

        console.log("==> Closed cookie banner")
        
        console.log("==> Searching for email selector")
        await page.waitForSelector(btPage.emailAddress)

        console.log("==> Entering Email")
        await page.type(btPage.emailAddress, emailAddress)
        await page.click(btPage.submit)
        console.log("==> Email submitted")
        

        console.timeEnd('Request time:')

        await browser.close()

    }


start()