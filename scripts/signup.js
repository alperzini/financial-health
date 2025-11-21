const audience = [
    {id: 1, name: "Student", value: "Student"},
    {id: 2, name: "Retiree / Soon-to-be Retirees", value: "Retiree / Soon-to-be Retirees"},
    {id: 3, name: "Homeowner", value: "Homeowner"},
    {id: 4, name: "Newcomer to Canada", value: "Newcomer to Canada"}
]

function populateAudience(data) {
    const audienceWrapper = document.querySelector('[data-audience-container]');

    const label = document.createElement('label');
    label.setAttribute('for', 'audience');
    label.textContent = 'Situation';
    audienceWrapper.appendChild(label);

    const select = document.createElement('select');
    select.id = 'audience';
    select.name = 'audience';

    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.value;
        option.textContent = item.name;
        select.appendChild(option);
    });

    audienceWrapper.appendChild(select);
};

populateAudience(audience);

const apiUrl = "https://industry-sprint-api-365b460ef11e.herokuapp.com/";
const apiKey = "e9731023-5287-4340-9b98-22aada555c9c";

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