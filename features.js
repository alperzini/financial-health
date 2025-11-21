import axios from "https://esm.sh/axios@1.7.7";

async function register () {
   const getRes = await axios.get('https://industry-sprint-api-365b460ef11e.herokuapp.com/register')
   console.log('key:',getRes.data.api_key)
   return (getRes.data.api_key)
}



const apiKey = await register ()
const apiUrl = `https://industry-sprint-api-365b460ef11e.herokuapp.com/features?api_key=${apiKey}`




//http://industry-sprint-api-365b460ef11e.herokuapp.com/features?api_key=

async function getFeatures () {
    console.log('runs')
    
    const getRes = await axios.get(apiUrl);
    return (getRes.data)

}



//api_key=${apiKey}/
const data = await getFeatures()

async function displayFeatures () {
    const featureList = document.getElementById('features-list')
     
    for (const element of data)  {
      
        console.log(element)
        const id = element.id
        const name = element.name
        const image = `https://industry-sprint-api-365b460ef11e.herokuapp.com${element.image}`
        const description = element.description.paragraph
        const bulletPoints = element.description.bulletPoints
        
        const featureDiv = document.createElement('div')
        featureDiv.id = id
        const featureImage= document.createElement('img')
        featureDiv.appendChild(featureImage)    
        featureImage.src = image
        const featureName = document.createElement('h2')
        featureList.appendChild(featureName)
        featureName.innerHTML = name
        console.log('THIS IS THE URL:',image)


        featureList.appendChild(featureDiv)
        console.log(name,image, description, bulletPoints)
    }
    
}


displayFeatures ()