import {apiKey} from "../scripts/config.js";
import axios from "https://esm.sh/axios@1.7.7";

// dropdown fields for audience situation and income

const audience = [
    {id: "audience1", name: "Student", value: "Student"},
    {id: "audience2", name: "Retiree / Soon-to-be Retirees", value: "Retiree / Soon-to-be Retirees"},
    {id: "audience3", name: "Homeowner", value: "Homeowner"},
    {id: "audience4", name: "Newcomer to Canada", value: "Newcomer to Canada"}
]

function populateAudience(data) {
    const audienceWrapper = document.querySelector('[data-audience-container]');

    const selectElement = document.createElement('select');
    selectElement.id = 'audience';
    selectElement.name = 'audience';
    selectElement.classList.add('signup-form__input'); 

    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Situation *";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectElement.appendChild(defaultOption);

    data.forEach(item => {
        const optionElement = document.createElement('option');
        optionElement.value = item.value;
        optionElement.textContent = item.name;
        selectElement.appendChild(optionElement);
    });

    audienceWrapper.appendChild(selectElement);

    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', 'audience');
    labelElement.textContent = 'Select your situation';
    labelElement.classList.add('dropdown-label'); 
    audienceWrapper.appendChild(labelElement);
};

const income = [
    {id: "income1", name: "Under $25,000", value: "Under $25,000"},
    {id: "income2", name: "$25,000 - $49,999", value: "$25,000 - $49,999"},
    {id: "income3", name: "$50,000 - $74,999", value: "$50,000 - $74,999"},
    {id: "income4", name: "$75,000 - $99,999", value: "$75,000 - $99,999"},
    {id: "income5", name: "$100,000 - $149,999", value: "$100,000 - $149,999"},
    {id: "income6", name: "$150,000 or more", value: "$150,000 or more"},
    {id: "income7", name: "Unemployed", value: "Unemployed"}
]

function populateIncome(data) {
    const incomeWrapper = document.querySelector('[data-income-container]');

    const selectElement = document.createElement('select');
    selectElement.id = 'income';
    selectElement.name = 'income';
    selectElement.classList.add('signup-form__input'); 

    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Income *";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectElement.appendChild(defaultOption);

    data.forEach(item => {
        const optionElement = document.createElement('option');
        optionElement.value = item.value;
        optionElement.textContent = item.name;
        selectElement.appendChild(optionElement);
    });

    incomeWrapper.appendChild(selectElement);

    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', 'income');
    labelElement.textContent = 'Select your income';
    labelElement.classList.add('dropdown-label'); 
    incomeWrapper.appendChild(labelElement);
};

document.addEventListener('DOMContentLoaded', () => {
    populateAudience(audience);
    populateIncome(income);
});

// event listener for form submissions

const apiUrl = "https://industry-sprint-api-365b460ef11e.herokuapp.com";
console.log(apiKey)
const form = document.getElementsByClassName("signup-form")[0];
console.log(form)
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
    console.log("POST data:", response.data);
    redirect('confirmation.html')
}

function redirect(targetpage) {
  console.log("redirect");
  const currentPage = encodeURI(window.location.href);
  window.location.href = `${targetpage}?source=${currentPage}`;
}