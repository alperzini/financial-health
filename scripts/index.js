import axios from "https://esm.sh/axios@1.7.7";
import { apiKey } from "../scripts/products.js";




console.log(apiKey)
const apiUrl = `https://industry-sprint-api-365b460ef11e.herokuapp.com/features?api_key=${apiKey}`






async function getFeatures() {
    console.log('runs')

    const getRes = await axios.get(apiUrl);
    return (getRes.data)

}



//api_key=${apiKey}/
const data = await getFeatures()

async function displayFeatures() {
    const featureList = document.getElementsByClassName('feature__cards')[0]

    for (const element of data) {

        console.log(element)
        const id = element.id
        const name = element.title
        const icon = `https://industry-sprint-api-365b460ef11e.herokuapp.com${element.icon}`
        const description = element.description.paragraph
        

        const featureContent = document.createElement('div')
        featureContent.id = id
        featureContent.classList.add('feature__item')
        
        const featureImage = document.createElement('img')
        featureImage.classList.add('feature__item-icon')
        featureDiv.appendChild(featureImage)
        featureImage.src = image

        const title = document.createElement('h2')
        title.classList.add('feature__item-header')
        featureContent.appendChild(title)
        title.innerHTML = `${name}`

        
        const featureDescription = document.createElement('p')
        featureDescription.classList.add('feature__item-text')
        featureDescription.innerHTML = description
        featureDiv.appendChild(featureDescription)

              
     
        console.log('THIS IS THE URL:', image)


        featureList.appendChild(featureDiv)
        console.log(name, image, description, bulletPoints)
    }

    }


displayFeatures()