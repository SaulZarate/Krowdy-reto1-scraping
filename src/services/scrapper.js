import {} from 'dotenv/config'

import { getData } from '../scrappers/linkedin.js';


export const start_scrapper = () => {

    const init = performance.now()
    getData('fullstack').then(res => {
        console.log(res)
        console.log('Tamaño del array: ',res.length)
        const end = performance.now()
        console.log('Tiempo de ejecucion: ' +(end - init))
    })
    
}