import fastify from "fastify";
import fastifyCors from "fastify-cors";
import { getData } from "../scrappers/linkedin.js";
import db from "../services/database.js";
import Busqueda from "../models/Busqueda.js";

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


/* 
    Tests 
*/
fast.get('/', (req, res)=>{
    res.send('Hola mundo')
})
fast.post('/', (req, res)=>{
    const {message} = req.body
    res.send(message)
})
// Conection MongoDB
fast.post('/api/test', async (req, res) => {
    const { keywords } = req.query
    if(keywords === undefined) res.send('Falta el parametro keywords')
     
    try {
        const dataInfo = [
            {
                contacto: ["algo@gmail.com","algo2@gmail.com"], 
                experiencia: [
                    {cargo: "asd", empresa:"asd",fecha:"21/2",ubicacion:"asd"},
                    {cargo: "fas", empresa:"fas",fecha:"14/2",ubicacion:"fas"}
                ], 
                educacion: [
                    {institucion: "gasd", titulo:"gasd",fecha:"02/10"},
                    {institucion: "tas", titulo:"tas",fecha:"01/1"}
                ]
            },
            {
                contacto: ["algo3@gmail.com"], 
                experiencia: [
                    {cargo: "asd3", empresa:"asd3",fecha:"21/2",ubicacion:"asd3"}
                ], 
                educacion: []
            },
            {
                contacto: ["algo4@gmail.com"], 
                experiencia: [], 
                educacion: [
                    {institucion: "gasd4", titulo:"gasd4",fecha:"02/10"}
                ]
            },
            {
                contacto:["algo2@gmail.com"], 
                experiencia: [
                    {cargo: "asd2", empresa:"asd2",fecha:"21/2",ubicacion:"asd2"},
                    {cargo: "fas2", empresa:"fas2",fecha:"14/2",ubicacion:"fas2"}
                ], 
                educacion: [
                    {institucion: "gasd2", titulo:"gasd2",fecha:"02/10"},
                    {institucion: "tas2", titulo:"tas2",fecha:"01/1"}
                ]
            }
        ]
        const conexion = await db()
        const data = new Busqueda({keywords, data: dataInfo})
        await data.save()
        await conexion.close()
        res.send(data)
        
    } catch (error) {
       fast.log.error(error)
       res.send({message:"Algo ha salido mal"})
    }
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