//we have to grab the responses from the api
import axios from "https://esm.sh/axios@1.7.7";
import { apiKey } from "./products.js";

async function testPost () {
    const testObj = {
        firstName: 'Alper',
        lastName: 'Bubnik',
        email: 'email@gmail.com'
    }

    const response = await axios.post(`https://industry-sprint-api-365b460ef11e.herokuapp.com/signups?api_key=${apiKey}`, testObj)
    console.log('apikey:', apiKey)
    console.log(response)
}



async function pullResponses () {
    testPost().then(async result =>{

const getRes = await axios.get(`https://industry-sprint-api-365b460ef11e.herokuapp.com/signups?api_key=${apiKey}`)
   console.log('key:',getRes)
   return (getRes.data)

    })
   
}
//once the responses are organized, send them to responses.html

pullResponses()

//