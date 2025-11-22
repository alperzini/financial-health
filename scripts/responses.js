//we have to grab the responses from the api
import axios from "https://esm.sh/axios@1.7.7";
import { apiKey } from "../scripts/config.js";




async function pullResponses () {
    

const getRes = await axios.get(`https://industry-sprint-api-365b460ef11e.herokuapp.com/signups?api_key=${apiKey}`)
  
   return getRes.data
  
}
//once the responses are organized, send them to responses.html
document.addEventListener('DOMContentLoaded', async () => {
    const data = await pullResponses()
    displayResponses(data)
})


 function displayResponses (data) {
    const responseList = document.getElementById('responses-table__body')
    console.log(data)

    data.forEach((element) => {

    const name = element.firstName
   const lastName = element.lastName
   const email = element.email
   const id = element.id 

        const row = document.createElement('tr')
        row.id = id

        row.innerHTML = ` <td>${element.firstName}</td>
        <td>${element.lastName}</td>
        <td>${element.email}</td>
        <td><button onclick="window.location.href='mailto:${element.email}'">Contact</button></td>
        
        `;
        
     responseList.appendChild(row);


        
    })


   
    
}

