import mongoose from "mongoose";

/* const Contacto = new mongoose.Schema({
    contacto: [String]
}) */
const Experiencia = new mongoose.Schema({
    cargo: String,
    empresa: String,
    fecha: String,
    ubicacion: String,
})
const Educacion = new mongoose.Schema({
    institucion: String,
    titulo: String,
    fecha: String
})

const DataSchema = new mongoose.Schema({
    keywords: String,
    data: [
        {
            contacto: [String],
            experiencia: [Experiencia],
            educacion : [Educacion]
        }
    ]
})

const Busqueda = mongoose.model('Busqueda', DataSchema) 

export default Busqueda