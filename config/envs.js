import {} from 'dotenv/config'

const TYPE_OPTION_DELAY = 200

export const BROWSER_OPTIONS_DEV = { 
    headless: process.env.PUPPETEER_OPEN_BROWSER.toLowerCase() == 'true' ? false: true
};

export const TAB_WAIT_2_REQUESTS = {
    waitUntil: process.env.PUPPETEER_TAB_WAIT_2_REQUESTS_WAITUNTIL
}

export const TYPE_OPTION = {
    delay: 200
}
