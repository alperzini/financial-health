import axios from "https://esm.sh/axios@1.7.7";

async function register () {
   const getRes = await axios.get('https://industry-sprint-api-365b460ef11e.herokuapp.com/register')
   console.log('key:',getRes.data.api_key)
   return (getRes.data.api_key)
}



const apiKey = await register ()
const apiUrl = `https://industry-sprint-api-365b460ef11e.herokuapp.com/products?api_key=${apiKey}`




//http://industry-sprint-api-365b460ef11e.herokuapp.com/features?api_key=

async function getProducts () {
    console.log('runs')
    
    const getRes = await axios.get(apiUrl);
    return (getRes.data)

}



//api_key=${apiKey}/
const data = await getProducts()

async function displayProducts () {
    const productsList = document.getElementById('products-list')
     
    for (const element of data)  {
      
        console.log(element)
        const id = element.id
        const name = element.name
        const image = `https://industry-sprint-api-365b460ef11e.herokuapp.com${element.image}`
        const description = element.description.paragraph
        const bulletPoints = element.description.bulletPoints
        
        const productDiv = document.createElement('div')
        productDiv.id = id
        const productImage= document.createElement('img')
        productDiv.appendChild(productImage)    
        productImage.src = image
        const productName = document.createElement('h2')
        productsList.appendChild(productName)
        productName.innerHTML = name
        console.log('THIS IS THE URL:',image)


        productsList.appendChild(productDiv)
        console.log(name,image, description, bulletPoints)
    }
    
}


displayProducts ()