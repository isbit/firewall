const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const websitesFile = 'felles-nasjonale-nettressurser-edited.txt';

  // Read the websites from the file and split them into an array
  const websites = fs.readFileSync(websitesFile, 'utf-8').split('\n');

  const browser = await chromium.launch();
  const context = await browser.newContext();

  for (const website of websites) {
    // Split each line of the file into website name and URL
    let [name, url] = website.split(' | ');
    name = name.replace('/', ' - ');

    const page = await context.newPage();
    console.log(`     Navigating to ${name} - ${url}`);
    try {
      await page.goto(url);
      console.log(`Up ${name} ${url}`); 
      await page.screenshot({path: `Screenshots/${name} screenshot.png`});
    } catch (error) {
      console.log(`Down ${name} ${url}`);
    }
    await page.close();
  }

  await browser.close();
})();
