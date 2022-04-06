import axios from 'axios';
import chai from 'chai';
import { testFindUsers, testGetDataUser, testLogin } from '../src/scrappers/linkedin.js';

const should = chai.should()

describe('Test API', () => {

    it('Request GET', async () => {
        const response = await axios.get('http://127.0.0.1:3000/')
        response.status.should.equal(200)
    })
    it('Request POST', async () => {
        const response = await axios.post('http://127.0.0.1:3000/',{
            'message': 'Hola mundo'
        })
        response.status.should.equal(200)
    })
})

describe('Test de Linkedin', () => {

    it('Inicio de sesión', () => {
        testLogin().then(res => res.should.equal(true))
    })

    it('Busqueda de información del usuario', () => {
        testGetDataUser().then(res => res.should.equal(true))
    })

    it('Buscar links de usuarios por keyword', () => {
        testFindUsers().then(res => res.should.equal(true))
    })

})
