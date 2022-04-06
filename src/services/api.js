import { fast } from "../routes/endpoint.js"
import {} from 'dotenv/config'

const environment= process.env.ENVIRONMENT_DEVELOPMENT.toLowerCase() == 'true'
const api_port=process.env.API_PORT
const api_port_dev=process.env.API_PORT_DEV

const start = async () =>{
    try {
        if(environment){
            await fast.listen(api_port_dev)
            console.log(`Server listening in localhost:${api_port_dev}`)
        }else{
            await fast.listen(api_port, '0.0.0.0')
        }
    } catch (error) {
       fast.log.error(error) 
    }
}

export default start
