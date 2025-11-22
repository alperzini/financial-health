const apiUrl = "https://industry-sprint-api-365b460ef11e.herokuapp.com/";
import { apiKey } from "../products.js";

const form = document.getElementById("form");

form.addEventListener("submit", function(event){
    event.preventDefault();
    console.log(event.target.firstName.value);

    const newSignup = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
    }
    postSignupData(newSignup);
})

async function postSignupData(signupObject){
    console.log(signupObject);
    const response = await axios.post(`${apiUrl}/signups?api_key=${apiKey}`, signupObject)
}