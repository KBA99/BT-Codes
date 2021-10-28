import puppeteer from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

puppeteer.use(StealthPlugin())

const emails = "src/emails.txt";
const successfullyEntered = "src/successfullyEntered.txt";
const proxies = "src/proxies.txt"

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

try {
    const importedProxies = fs.readFileSync(proxies, "utf8");
    console.log(`Proxies imported`)
    
    let allProxies = importedProxies.split("\n");
    console.log(allProxies)
    } catch (error) {
        console.log(error);
    }



let start = async (email, proxy) => {
    const split_proxy = proxy.split(":")
    console.log(split_proxy)
    const proxyHostPort = `--proxy-server=${split_proxy[0]}:${split_proxy[1]}`
    const proxyUserName = `${split_proxy[2]}`
    const proxyPassword = `${split_proxy[3]}`

    console.log({proxyHostPort, proxyUserName, proxyPassword})

    console.log("==> Starting Browser")

    console.time('Request time:')

    console.log("==> Adding Proxy")

    const browser = await puppeteer.launch({
        headless: false, slowMo: 50,
        args: [proxyHostPort]
    });

    const page = await browser.newPage();
        await page.authenticate({
        username: proxyUserName,
        password: proxyPassword
        });

    console.log("==> Proxy Added")

    await page.setViewport({ width: 900, 
                             height: 600 })


    /* Tests
        console.log(`Testing the stealth plugin..`)
        await page.goto('https://bot.sannysoft.com')
        await page.waitForTimeout(5000)
        await page.screenshot({ path: 'stealth.png', fullPage: true })
    //   console.log(`All done, check the screenshots. ✨`)
    */


    
    console.log("==> Navigating to Page")

    await page.goto('https://shop.bt.com/forms/playstation-5')
    
    console.log("==> On BT Page")
    
    console.log("==> Waiting for cookie selector")
    
    await page.waitForSelector(btPage.cookieBanner)

    console.log("==> Found cookie selector")

    await page.click(btPage.cookieBanner)

    console.log("==> Closed cookie banner")
    
    console.log("==> Searching for email selector")
    await page.waitForSelector(btPage.emailAddress)

    console.log("==> Entering Email")
    await page.type(btPage.emailAddress, email)
    await page.click(btPage.submit)
    console.log("==> Email submitted")
    

    console.timeEnd('Request time:')

    await browser.close()

    }



try {
    start('','')
} catch (error) {
    console.log('we had an error')
    console.log("keep executing")
}

// const btStart = () => {
//     for (let index = 0; index < array.length; index++) {
//         const element = array[index];
        
//     }
// }