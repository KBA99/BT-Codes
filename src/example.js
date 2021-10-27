import puppeteer from "puppeteer-extra";


(async () => {

const browser = await puppeteer.launch({ headless: false })
const page = await browser.newPage()
const navigationPromise = page.waitForNavigation()

await page.goto('https://shop.bt.com/forms/playstation-5')

await page.setViewport({ width: 1280, height: 1306 })

console.log("selecting script")
await page.waitForSelector('.button2')
await page.click('.button2')


await navigationPromise

await browser.close()

})();
