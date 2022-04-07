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

    try {
        const info = await getData(keywords)
        const conexion = await db()
        const data = new Busqueda({keywords, data: info})
        await data.save()
        await conexion.close()
        res.send(data)
        
    } catch (error) {
       fast.log.error(error)
       res.send({message:"Algo ha salido mal"})
    }
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
fast.post('/api/test/', async (req, res) => {
    const { keywords } = req.query
    if(keywords === undefined) res.send('Falta el parametro keywords')
     const dataInfoReal = [
        {
          "contacto": [
            "linkedin.com/in/david-forastieri",
            "github.com/David-Forastieri"
          ],
          "experiencia": [
            {
              "cargo": "FrontEnd React Trainee",
              "empresa": "Webstarted · Jornada completa",
              "fecha": "jun. 2021 - actualidad · 11 meses",
              "direccion": "Provincia de Buenos Aires, Argentina"
            },
            {
              "cargo": "Freelance",
              "empresa": "Profesional independiente",
              "fecha": "ago. 2020 - jun. 2021 · 11 meses",
              "direccion": ""
            }
          ],
          "educacion": [
            {
              "institucion": "Coderhouse",
              "titulo": "Front-end, Tecnología de la información",
              "fecha": "2020 - 2020"
            },
            {
              "institucion": "Escuela de Educacion Tecnica n°1",
              "titulo": "Tecnico electronico, Tecnología/Técnico industrial",
              "fecha": "2005 - 2007"
            }
          ]
        },
        {
          "contacto": [
            "linkedin.com/in/obertogustavo",
            "portfolio-web-blue.vercel.app/"
          ],
          "experiencia": [
            {
              "cargo": "React Developer",
              "empresa": "IBM · Jornada completa",
              "fecha": "nov. 2021 - actualidad · 6 meses",
              "direccion": "Argentina"
            },
            {
              "cargo": "Tutor Desarrollo web",
              "empresa": "Coderhouse · Autónomo",
              "fecha": "sept. 2020 - feb. 2022 · 1 año 6 meses",
              "direccion": "Buenos Aires, Provincia de Buenos Aires, Argentina"
            },
            {
              "cargo": "Desarrollador de front-end",
              "empresa": "Lab Design Web · Jornada completa",
              "fecha": "jul. 2020 - feb. 2022 · 1 año 8 meses",
              "direccion": "Buenos Aires, Argentina"
            },
            {
              "cargo": "ingeniero petroquimico",
              "empresa": "PDVSA Petróleos de Venezuela S.A.",
              "fecha": "mar. 2015 - sept. 2016 · 1 año 7 meses",
              "direccion": "Venezuela"
            },
            {
              "cargo": "Analista de laboratorio",
              "empresa": "COFALQUIM S.A",
              "fecha": "feb. 2014 - mar. 2015 · 1 año 2 meses",
              "direccion": "Venezuela"
            }
          ],
          "educacion": [
            {
              "institucion": "Coderhouse",
              "titulo": "React js, Programación informática, aplicaciones específicas",
              "fecha": "2020 - 2020"
            },
            {
              "institucion": "Coderhouse",
              "titulo": "Diseñador web, Programación informática",
              "fecha": "2019 - 2020"
            },
            {
              "institucion": "DePC Suite",
              "titulo": "Programador Full Stack Jr, Programación informática",
              "fecha": "2019 - 2020"
            },
            {
              "institucion": "Universidad Nacional Experimental Politécnica de la Fuerza Armada",
              "titulo": "Ingeniería, Ingeniería química",
              "fecha": "2011 - 2016"
            }
          ]
        },
        {
          "contacto": [
            "linkedin.com/in/favio-magallanes-desarrollador-react",
            "github.com/FavioMagallanes",
            "magallanes.f@outlook.com"
          ],
          "experiencia": [
            {
              "cargo": " Desarrollador React Jr - Aerolineas Argentinas ",
              "empresa": "Valtech",
              "fecha": "dic. 2021 - actualidad · 5 meses",
              "direccion": "Provincia de Buenos Aires, Argentina"
            },
            {
              "cargo": "Desarrollador React Jr - I + D",
              "empresa": "IT Resources S.A",
              "fecha": "feb. 2021 - oct. 2021 · 9 meses",
              "direccion": "Buenos Aires, Provincia de Buenos Aires, Argentina"
            }
          ],
          "educacion": [
            {
              "institucion": "Power Up Idiomas",
              "titulo": "Ingles nivel B1",
              "fecha": "mar. 2022 - feb. 2023"
            }
          ]
        },
        {
          "contacto": [
            "linkedin.com/in/gabrielcardozo"
          ],
          "experiencia": [
            {
              "cargo": "React Developer",
              "empresa": "Agrofy · Jornada completa",
              "fecha": "feb. 2022 - actualidad · 3 meses",
              "direccion": "Argentina"
            },
            {
              "cargo": "React & Node Developer",
              "empresa": "MG Group S.A. · Jornada completa",
              "fecha": "oct. 2020 - mar. 2022 · 1 año 6 meses",
              "direccion": ""
            },
            {
              "cargo": "React & Node Developer",
              "empresa": "Freelance · Profesional independiente",
              "fecha": "jul. 2020 - mar. 2022 · 1 año 9 meses",
              "direccion": ""
            }
          ],
          "educacion": [
            {
              "institucion": "Universidad Nacional de General Sarmiento",
              "titulo": "Licenciatura en Sistemas, Análisis de sistemas informáticos/Analista",
              "fecha": "2017 - 2023"
            },
            {
              "institucion": "Centro de e-Learning UTN FRBA",
              "titulo": "Experto en diseño de experiencia de usuario e interacciones (ux y ixd)",
              "fecha": "2020 - 2020"
            },
            {
              "institucion": "ComIT",
              "titulo": "Desarrollo en React",
              "fecha": "2020 - 2020"
            },
            {
              "institucion": "ComIT",
              "titulo": "Seminario de SCRUM",
              "fecha": "2020 - 2020"
            },
            {
              "institucion": "Platzi",
              "titulo": "Fundamentos de Javascript",
              "fecha": "2020 - 2020"
            },
            {
              "institucion": "Platzi",
              "titulo": "Fundamentos de HTML y CSS",
              "fecha": "2019 - 2020"
            }
          ]
        },
        {
          "contacto": [
            "linkedin.com/in/christian-de-diego"
          ],
          "experiencia": [
            {
              "cargo": "React Native Developer",
              "empresa": "Fizzmod · Jornada completa",
              "fecha": "jun. 2021 - actualidad · 11 meses",
              "direccion": ""
            },
            {
              "cargo": "Full Stack Developer",
              "empresa": "Creative Coefficient · Jornada completa",
              "fecha": "dic. 2020 - jun. 2021 · 7 meses",
              "direccion": ""
            },
            {
              "cargo": "Front-end developer",
              "empresa": "Fizzmod · Jornada completa",
              "fecha": "ene. 2020 - dic. 2020 · 1 año",
              "direccion": ""
            },
            {
              "cargo": "Desarrollador web",
              "empresa": "Freelance · Autónomo",
              "fecha": "ene. 2019 - may. 2020 · 1 año 5 meses",
              "direccion": ""
            },
            {
              "cargo": "Soporte técnico para Telecentro",
              "empresa": "Konecta",
              "fecha": "ene. 2018 - ene. 2020 · 2 años 1 mes",
              "direccion": "Gran Buenos Aires, Argentina"
            }
          ],
          "educacion": [
            {
              "institucion": "Universidad Nacional de La Matanza",
              "titulo": "Desarrollador web, programación",
              "fecha": "2019 - 2022"
            },
            {
              "institucion": "EducacionIT",
              "titulo": "React Developer",
              "fecha": "2019 - 2019"
            },
            {
              "institucion": "Udemy ",
              "titulo": "Primeros pasos en React",
              "fecha": "2019 - 2019"
            }
          ]
        },
        {
          "contacto": [
            "linkedin.com/in/eugenio-rossetto-4b2961144"
          ],
          "experiencia": [
            {
              "cargo": "React Developer",
              "empresa": "Distillery · Jornada completa",
              "fecha": "ago. 2021 - actualidad · 9 meses",
              "direccion": ""
            },
            {
              "cargo": "Desarrollador Web UI",
              "empresa": "Globant · Jornada completa",
              "fecha": "nov. 2020 - ago. 2021 · 10 meses",
              "direccion": ""
            },
            {
              "cargo": "Developer",
              "empresa": "SAETECH S.A. · Jornada completa",
              "fecha": "mar. 2018 - mar. 2020 · 2 años 1 mes",
              "direccion": "Buenos Aires, Argentina"
            }
          ],
          "educacion": [
            {
              "institucion": "Universidad Nacional de San Martín",
              "titulo": "Tecnicatura, Programación informática",
              "fecha": "2016 - 2020"
            }
          ]
        },
        {
          "contacto": null,
          "experiencia": [
            {
              "cargo": "Fullstack Developer",
              "empresa": "VORTEX-IT.COM · Jornada completa",
              "fecha": "jun. 2021 - actualidad · 11 meses",
              "direccion": ""
            },
            {
              "cargo": "Software Developer",
              "empresa": "Gobierno de la Ciudad de Buenos Aires · Jornada completa",
              "fecha": "abr. 2021 - may. 2021 · 2 meses",
              "direccion": ""
            },
            {
              "cargo": "Técnico de soporte de TI",
              "empresa": "Acindar | Grupo ArcelorMittal · Jornada completa",
              "fecha": "nov. 2018 - abr. 2021 · 2 años 6 meses",
              "direccion": "La Tablada, Gran Buenos Aires, Argentina"
            }
          ],
          "educacion": null
        },
        {
          "contacto": [
            "linkedin.com/in/fernando-ayala-16a88a14b"
          ],
          "experiencia": [
            {
              "cargo": "React Developer",
              "empresa": "AVroad · Jornada completa",
              "fecha": "feb. 2021 - actualidad · 1 año 3 meses",
              "direccion": "Provincia de Buenos Aires, Argentina"
            },
            {
              "cargo": "Técnico de reparación de PC",
              "empresa": "Casa · Autónomo",
              "fecha": "ene. 2014 - actualidad · 8 años 4 meses",
              "direccion": "Buenos Aires, Argentina"
            },
            {
              "cargo": "Encargado de almacén",
              "empresa": "Agro Garden · Jornada completa",
              "fecha": "dic. 2013 - feb. 2021 · 7 años 3 meses",
              "direccion": "Argentina"
            },
            {
              "cargo": "Vendedor",
              "empresa": "Verdulería",
              "fecha": "dic. 2009 - nov. 2013 · 4 años",
              "direccion": "Argentina"
            }
          ],
          "educacion": [
            {
              "institucion": "Universidad Nacional de La Matanza",
              "titulo": "Ingeniero en Informática, Ingeniería informática",
              "fecha": "2014 - 2024"
            },
            {
              "institucion": "EducacionIT",
              "titulo": "Introducción a Base de Datos, Programación",
              "fecha": "2019 - 2019"
            },
            {
              "institucion": "EducacionIT",
              "titulo": "Paradigma Orientada a Objetos, Programación informática",
              "fecha": "2019 - 2019"
            },
            {
              "institucion": "EducacionIT",
              "titulo": "Introducción a .Net, Programación",
              "fecha": "2019 - 2019"
            },
            {
              "institucion": "EducacionIT",
              "titulo": "Java para no programadores, Programación informática",
              "fecha": "2018 - 2018"
            }
          ]
        },
        {
          "contacto": [
            "linkedin.com/in/lindolfoayala",
            "github.com/otromaximiliano"
          ],
          "experiencia": null,
          "educacion": null
        },
        {
          "contacto": [
            "linkedin.com/in/alessandra24",
            "github.com/alessandra24x"
          ],
          "experiencia": [
            {
              "cargo": "Web3 Frontend Developer",
              "empresa": "Rather Labs, Inc · Jornada completa",
              "fecha": "mar. 2022 - actualidad · 2 meses",
              "direccion": "Argentina"
            },
            {
              "cargo": "React Developer",
              "empresa": "intive · Jornada completa",
              "fecha": "mar. 2021 - actualidad · 1 año 2 meses",
              "direccion": "Buenos Aires Province, Argentina"
            },
            {
              "cargo": "Community Manager",
              "empresa": "Apexit Finance · Profesional independiente",
              "fecha": "abr. 2021 - oct. 2021 · 7 meses",
              "direccion": "Buenos Aires Province, Argentina"
            },
            {
              "cargo": "Software Developer",
              "empresa": "Natural Tech House · Jornada completa",
              "fecha": "feb. 2020 - mar. 2021 · 1 año 2 meses",
              "direccion": "Greater Buenos Aires, Argentina"
            },
            {
              "cargo": "QA Analyst",
              "empresa": "Galicia Bank · Jornada completa",
              "fecha": "ago. 2019 - feb. 2020 · 7 meses",
              "direccion": "Greater Buenos Aires, Argentina"
            },
            {
              "cargo": "Auxiliar Administrativa",
              "empresa": "La Caja de Ahorro y Seguro",
              "fecha": "oct. 2018 - mar. 2019 · 6 meses",
              "direccion": "Greater Buenos Aires, Argentina"
            },
            {
              "cargo": "Community Manager",
              "empresa": "Animal Libre Argentina",
              "fecha": "may. 2016 - ago. 2018 · 2 años 4 meses",
              "direccion": "Gran Buenos Aires, Argentina"
            },
            {
              "cargo": "Asistente Contable",
              "empresa": "Nu Skin Enterprises",
              "fecha": "nov. 2016 - feb. 2018 · 1 año 4 meses",
              "direccion": "CABA, Argentina"
            },
            {
              "cargo": "Analista Administrativo",
              "empresa": "Servicio Autónomo Sistema Integrado de Atención de Emergencias 911 Aragua",
              "fecha": "jun. 2014 - feb. 2016 · 1 año 9 meses",
              "direccion": "Aragua, Venezuela"
            },
            {
              "cargo": "Asistente Administrativo",
              "empresa": "Unidad Médica Quirúrgica Dra. Haidee Rodriguez, C.A.",
              "fecha": "oct. 2012 - jun. 2014 · 1 año 9 meses",
              "direccion": "Aragua, Venezuela"
            }
          ],
          "educacion": [
            {
              "institucion": "Universidad Tecnológica Nacional",
              "titulo": "Tecnicatura en Programación Web, Computer Technology/Computer Systems Technology",
              "fecha": "2019 - 2021"
            },
            {
              "institucion": "Ada  ITW",
              "titulo": "Frontend Development, Programación Web",
              "fecha": "2018 - 2019"
            },
            {
              "institucion": "freeCodeCamp",
              "titulo": "Frontend Development, Computer Software Engineering",
              "fecha": "2018 - 2019"
            },
            {
              "institucion": "Google / Comunidad IT",
              "titulo": "Marketing Digital, Marketing",
              "fecha": "2018 - 2018"
            },
            {
              "institucion": "Instituto Uiversitario de Tecnología \"Juan Pablo Perez Alfonzo\"",
              "titulo": "Técnica Superior Universitaria en Administración de Empresas, Administración de Empresas",
              "fecha": "2010 - 2013"
            }
          ]
        }
      ]
    try {
        /* const dataInfo = [
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
                contacto: null, 
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
        ] */
        const conexion = await db()
        const data = new Busqueda({keywords, data: dataInfoReal})
        //await data.save()
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