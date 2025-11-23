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

    data.forEach(function(item) {
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

    const errorSpan = document.createElement('span');
    errorSpan.classList.add('signup-form__error-message');
    errorSpan.setAttribute('data-error-for', 'audience');
    audienceWrapper.appendChild(errorSpan);
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

    data.forEach(function(item) {
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

    const errorSpan = document.createElement('span');
    errorSpan.classList.add('signup-form__error-message');
    errorSpan.setAttribute('data-error-for', 'income');
    incomeWrapper.appendChild(errorSpan);
};

document.addEventListener('DOMContentLoaded', function() {
    populateAudience(audience);
    populateIncome(income);

    attachValidationListeners();
});

// validating required fields
function inputError(fieldElement, errorMessage) {
    const wrapper = fieldElement.closest('.signup-form__input-wrapper');
    const errorSpan = wrapper.querySelector(`.signup-form__error-message`);
    const labelElement = wrapper.querySelector('label');
    
    if (!wrapper || !errorSpan || !labelElement) return;

    if (errorMessage) {
        wrapper.classList.add('error');
        errorSpan.textContent = errorMessage;
        labelElement.style.display = 'none';
        
        return false;
    } else {
        wrapper.classList.remove('error');
        errorSpan.textContent = '';
        labelElement.style.display = '';
        fieldElement.classList.remove('signup-form__input--error');
        return true;
    }
}

function validateEmail(email) {
    const emailInput = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailInput.test(email);
}

function validateField(field) {
    const value = field.value.trim();
    const name = field.name;
    let displayName = name;

    if (name === 'firstName' || name === 'lastName') {
        displayName = name.charAt(0).toUpperCase() + name.slice(1).replace('n', ' n');
        if (value.length > 64) {
            return inputError(field, `${displayName} is too long (max 64 characters).`);
        }
    } else {
        displayName = name.charAt(0).toUpperCase() + name.slice(1);
    }
    if (value === "" || (field.type === 'select-one' && field.options[field.selectedIndex].disabled)) {
        return inputError(field, `${displayName} cannot be blank.`);
    }


    if (name === 'email') {
        const emailUsername = value.split('@')[0];
        
        if (emailUsername.length > 64) {
            return inputError(field, "Email address username is too long (max 64 characters).");
        }
        if (!validateEmail(value)) {
            return inputError(field, "Enter a valid email address (e.g., abc@example.com).");
        }
    }
    return inputError(field, ""); 
}

function validatePasswordMatch(form) {
    const password = form.querySelector('#password'); 
    const confirmPassword = form.querySelector('#confirmPassword');
    
    if (!password || !confirmPassword) return false; 
    
    let valid = true;

    if (confirmPassword.value === "") {
        return validateField(confirmPassword);
    }
    if (password.value !== confirmPassword.value) {
        inputError(confirmPassword, "Password entered does not match.");
        valid = false;
    } else {
        inputError(confirmPassword, "");
    }
    return valid; 
}

// event listener for form submissions
const apiUrl = "https://industry-sprint-api-365b460ef11e.herokuapp.com";
console.log(apiKey)
const form = document.querySelector(".signup-form__container");
let formFields = [];

function attachValidationListeners() {
    formFields = Array.from(form.querySelectorAll('input, select'));

    formFields.forEach(function(field) {
        if (field.id === 'confirmPassword') {
            field.addEventListener('blur', function() {
                validatePasswordMatch(form);
            });
        } else if (field.name === 'password') {
            field.addEventListener('blur', function() {
                validateField(field);
                validatePasswordMatch(form); 
            });
        } else {
            field.addEventListener('blur', function() {
                validateField(field);
            });
            field.addEventListener('change', function() {
                validateField(field); 
            });
        }
    });
}

form.addEventListener("submit", function(event){
    event.preventDefault();

    let formValid = true;

    formFields.forEach(function(field) {
        const fieldIsValid = validateField(field);
        if (!fieldIsValid) {
            formValid = false;
        }
    });

    const passwordsMatch = validatePasswordMatch(form);
    if (!passwordsMatch) {
        formValid = false;
    }

    if (formValid) {
        const newSignup = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            // password: event.target.password.value,
            // audience: event.target.audience.value, 
            // income: event.target.income.value,
        }
        postSignupData(newSignup);
    } else {
        console.log("Unable to submit. Please fill out all required fields.");
        const firstError = form.querySelector('.signup-form__input-wrapper.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

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