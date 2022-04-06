import puppeteer from 'puppeteer';
import {} from 'dotenv/config'
import { BROWSER_OPTIONS_DEV, TAB_WAIT_2_REQUESTS, TYPE_OPTION } from '../../config/envs.js';

const pageOptions = TAB_WAIT_2_REQUESTS
const typeOptions = TYPE_OPTION

const email_linkedin = process.env.EMAIL_LINKEDIN
const password_linkedin = process.env.PASSWORD_LINKEDIN


/* 
    -----------------
    ---- GET DATA ---
    -----------------
*/
export const getData = async (keyword) => {
    let browser
    let data = []
    try {
        browser = await puppeteer.launch(BROWSER_OPTIONS_DEV)
        const isLoggin = await validate_login(browser)
        if(!isLoggin) return {message:"No se pudo iniciar sesion"}
        
        // Links de los usuaiors
        const linksUsers = await findUsers(keyword, browser)
        if(!linksUsers) return {message: "No se pudo encontrar usuarios"}
        
        for (const link of linksUsers) {
            const info = await getInfoUser(browser, link)
            data.push(info)
        }

    } catch (error) {
        // Error
    }finally{
        await browser.close()
        return data
    }
}


/* 
    ---------------------
    --- GET DATA USER ---
    ---------------------
*/
export const getInfoUser = async (browser, userURL) => {
    // Url formateada
    const urlUser = formatearURL(userURL)

    // Promises data
    const contacto_promise = findInfoContacto(browser, urlUser)
    const experiencia_promise = findExperiencia(browser, urlUser)
    const educacion_promise = findEducacion(browser, urlUser)
    
    // Data
    const contacto = await contacto_promise
    const experiencia = await experiencia_promise
    const educacion = await educacion_promise

    return {contacto, experiencia, educacion}
}

const findInfoContacto = async(browser, userURL) => {
    let result = null
    let page
    const URL = userURL + 'overlay/contact-info/'
    try {
        page = await browser.newPage()
        await page.goto(URL, pageOptions)

        const handle_section = (await page.$x('//section[*//h2[text()="Información de contacto"]]'))[0]
        result = await handle_section.evaluate(section => {
            let data = []
            const links_contact = section.querySelectorAll('section section a')
            for (const link of links_contact) {
                data.push(link.textContent.trim())
            }
            return data
        })
    } catch (error) {
        // Error
    }finally{
        await page.close()
        return result
    }
}
const findExperiencia = async (browser, userURL) => {
    let result = null
    let page 
    const URL = userURL + 'details/experience/'
    try {
        page = await browser.newPage()
        await page.goto(URL, pageOptions)

        const handle_section_experiencia = (await page.$x('//section[*//h2[text()="Experiencia"]]'))[0]
        // Elemento no encontrado
        if(handle_section_experiencia === undefined) return result
        
        result = await handle_section_experiencia.evaluate( section => {
            let data = []
            const li_items = section.lastElementChild.firstElementChild.firstElementChild.firstElementChild.children

            for (let li of li_items) {
                // Content data
                const div_data = li.firstElementChild.lastElementChild.firstElementChild.firstElementChild
                const list_span = div_data.querySelectorAll('span > span[aria-hidden="true"]')

                const cargo = list_span[0].textContent
                const empresa = list_span[1].textContent
                const fecha = list_span[2].textContent
                const direccion = !list_span[3] ? '' : list_span[3].textContent

                // data
                data.push({cargo, empresa, fecha, direccion})
            } 
            return data
        })

    } catch (error) {
        // Error
    }finally{
        await page.close()
        return result
    }
}
const findEducacion = async (browser, userURL) => {
    let result = null
    let page
    const URL = userURL + 'details/education'
    const text_sin_educacion = 'No hay nada para ver en este momento'
    try {
        page = await browser.newPage()
        await page.goto(URL)

        /* La educacion no esta visible  */
        const handle_element = (await page.$x(`//*[text()= "${text_sin_educacion}"]`))[0]
        if(handle_element !== undefined) return result
        
        const handle_section = (await page.$x('//section[*//h2[text()="Educación"]]'))[0]
        result = await handle_section.evaluate( section => {

            let data = []
            const li_items = section.lastElementChild.firstElementChild.firstElementChild.firstElementChild.children
            
            /* Search info */
            for (let li of li_items) {
                // Content data
                const div_data = li.firstElementChild.lastElementChild.firstElementChild.firstElementChild
                const list_span = div_data.querySelectorAll('span > span[aria-hidden="true"]')

                const institucion = list_span[0].textContent
                const titulo = list_span[1].textContent
                const fecha = list_span[2].textContent

                // data
                data.push({institucion, titulo, fecha})
            }   

            return data
        })
    } catch (error) {
        // Error
    }finally{
        await page.close()
        return result
    }
}

/* 
    -------------------
    --- FIND USERS ----
    -------------------
*/
export const findUsers = async (keyword, browser) => {
    const URL_SEARCH = `https://www.linkedin.com/search/results/people/?keywords=${keyword}`
    let result = null
    let page
    try {
        page = await browser.newPage()
        await page.goto(URL_SEARCH, {
            waitUntil: 'domcontentloaded'
        })

        const handle_ul = (await page.$x('//ul[*//div[@class="entity-result"]]'))[0]
        if(!handle_ul) return result

        result = await handle_ul.evaluate(ul => {
            let links_user = []
            const links = ul.querySelectorAll('div a[aria-hidden="true"]')
            for (let link of links) {
                const clean_link = link.href.trim().split('?')[0] 
                links_user.push(clean_link)
            }
            return links_user
        })
        
    } catch (error) {
        // Error
        //console.log(error)
    }finally{
        await page.close()
        return result
    }
}




/* 
    ----------------
    ---- TESTS -----
    ----------------
*/
export const testLogin = async () => {
    const browser = await puppeteer.launch(BROWSER_OPTIONS_DEV)
    const isLoggin = await validate_login(browser)
    await browser.close()
    return isLoggin
}
export const testGetDataUser = async () => {
    const userURL = process.env.TEST_URL_USER
    let browser 
    let result = false
    try {
        browser = await puppeteer.launch(BROWSER_OPTIONS_DEV)
        const isLoggin = await validate_login(browser)
        if(!isLoggin) return result
        
        // Promises data
        const contacto_promise = findInfoContacto(browser, userURL)
        const experiencia_promise = findExperiencia(browser, userURL)
        const educacion_promise = findEducacion(browser, userURL)
        
        // Data
        const contacto = await contacto_promise
        const experiencia = await experiencia_promise
        const educacion = await educacion_promise

        result = contacto || experiencia || educacion
    } catch (error) {
        // Error
    }finally{
        await browser.close()
        return result
    }
}
export const testFindUsers = async () => {
    const URL_SEARCH = `https://www.linkedin.com/search/results/people/?keywords=${process.env.TEST_KEYWORD}`
    let result = []
    let browser
    try {
        browser = await puppeteer.launch(BROWSER_OPTIONS_DEV)
        // Validate login
        const isLoggin = await validate_login(browser)
        if(!isLoggin) return null

        const page = await browser.newPage()
        await page.goto(URL_SEARCH, {
            waitUntil: 'domcontentloaded'
        })

        const handle_ul = (await page.$x('//ul[*//div[@class="entity-result"]]'))[0]
        if(!handle_ul) return result

        result = await handle_ul.evaluate(ul => {
            let links_user = []
            const links = ul.querySelectorAll('div a[aria-hidden="true"]')
            for (let link of links) {
                const clean_link = link.href.trim().split('?')[0] 
                links_user.push(clean_link)
            }
            return links_user
        })
    } catch (error) {
        // Error
    }finally{
        await browser.close()
        return result.length > 0
    }
}


/* 
    -------------------
    ----- UTILS -------
    -------------------
*/

async function validate_login(browser){
    const page = await browser.newPage()
    await page.goto('https://www.linkedin.com/login', pageOptions)
    
    // Email
    const emailInput = (await page.$x('//input[@validation="email|tel" or aria-label="Email o teléfono"]'))[0]
    await emailInput.type(email_linkedin, typeOptions)
    
    // Password
    const passwordInput = (await page.$x('//input[@type="password" or @validation="password"]'))[0]
    await passwordInput.type(password_linkedin, typeOptions)
    await passwordInput.press('Enter')
    
    // Utilizo domcontentloaded porque solo necesito que se carge el HTML
    // y que se suban las cookies
    await page.waitForNavigation({
        waitUntil: 'domcontentloaded'
    })

    const title = await page.title()
    await page.close()
    return title.includes('Feed | LinkedIn')
}

function formatearURL(url){
    const urlToArray = url.split('/')
    const lengthArray = urlToArray.length
    return urlToArray[lengthArray -1] === '' ? url : url + '/'
}
