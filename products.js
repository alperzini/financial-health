import axios from "https://esm.sh/axios@1.7.7";

async function register() {
    const getRes = await axios.get('https://industry-sprint-api-365b460ef11e.herokuapp.com/register')
    console.log('key:', getRes.data.api_key)
    return (getRes.data.api_key)
}



const apiKey = await register()
const apiUrl = `https://industry-sprint-api-365b460ef11e.herokuapp.com/products?api_key=${apiKey}`




//http://industry-sprint-api-365b460ef11e.herokuapp.com/products?api_key=

async function getProducts() {
    console.log('runs')

    const getRes = await axios.get(apiUrl);
    return (getRes.data)

}



//api_key=${apiKey}/
const data = await getProducts()

async function displayProducts() {
    const productList = document.getElementsByClassName('card__wrapper')[0]

    for (const element of data) {

        console.log(element)
        const id = element.id
        const name = element.name
        const image = `https://industry-sprint-api-365b460ef11e.herokuapp.com${element.image}`
        const description = element.description.paragraph
        const bulletPoints = element.description.bulletPoints

        const productContent = document.createElement('article')
        productContent.id = id
        const productDiv = document.createElement('div')
        productDiv.classList.add('product__content')
        const title = document.createElement('h3')
        title.classList.add('product__title')
        productDiv.appendChild(title)
        title.innerHTML = `TEST-${name}`

        const productImage = document.createElement('img')
        productImage.classList.add('product__image')
        productDiv.appendChild(productImage)
        productImage.src = image

        const productDescription = document.createElement('p')
        productDescription.classList.add('product__details')
        productDescription.innerHTML = description
        productDiv.appendChild(productDescription)

        const productPoints = document.createElement('ul')
        productPoints.classList.add('product__points')
        productDiv.appendChild(productPoints)

        bulletPoints.forEach((element) => {
            console.log(element)
            const bullet = document.createElement('li')
            bullet.innerHTML = element
            productPoints.appendChild(bullet)
        })

        const tags = document.createElement('div')
        tags.classList.add('product__tags')
        productDiv.appendChild(tags)

        const learnButton = document.createElement('button')
        tags.appendChild(learnButton)
        learnButton.classList.add('cta-button')
        learnButton.innerHTML = 'Learn More'
        learnButton.href = '#'

        const secondButton = document.createElement('button')
        secondButton.id = element.id
        tags.appendChild(secondButton)



        console.log('THIS IS THE URL:', image)


        productList.appendChild(productDiv)
        console.log(name, image, description, bulletPoints)
    }

    const financialPulseButton = document.getElementById('R3K9LT')
    financialPulseButton.innerHTML = "Something Divya wrote"

    const finanicalHealthButton = document.getElementById('M8F2QY')
    finanicalHealthButton.innerHTML = 'Real your Financial Health Score'

    const smartAlertsButton = document.getElementById('B9X3JE')
    smartAlertsButton.innerHTML = 'Get smart budget alerts instantly'


}


displayProducts()