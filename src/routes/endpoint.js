import fastify from "fastify";
import fastifyCors from "fastify-cors";
import { getData } from "../scrappers/linkedin.js";

export const fast = fastify({logger:true})

// CORS
fast.register(fastifyCors, {
    origin:'*',
    methods:['POST', 'GET']
})

// Endpoint del reto
fast.post('/api/linkedin/search/peoples/', async (req, res)=>{
    const { keywords } = req.query
    if(keywords === undefined) res.send({'Error': 'Se necesita el parametro keywords en la petición'})

    const data = await getData(keywords)
    res.send(data)
})


// Tests
fast.get('/',  (req, res)=>{
    res.send('Hola mundo')
})
fast.post('/',  (req, res)=>{
    const {message} = req.body
    res.send(message)
})


/* 
    404
*/
fast.get('*',  (req, res)=>{
    res.status(404)
    res.send({
        status: 404,
        message: 'El recurso que busca no existe'
    })
})