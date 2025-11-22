console.log(document);


const audienceResult = document.querySelector(".audience-result"); // Get the audience-result Div from the confirmation.html page
console.log(audienceResult);

const studentLink = document.createElement("a");
studentLink.setAttribute("href", "https://www.td.com/ca/en/personal-banking/special-offers/student-banking-offer?gclsrc=aw.ds&gad_source=1&gad_campaignid=13177436302&gbraid=0AAAAABXJP2xkhehH9FQ68gwTTiW_-3Iov&gclid=CjwKCAiA24XJBhBXEiwAXElO30glwkFyujJSn3zV0BNH_7Q8i93nS89S-EQNkVqH9j9B92j_99KXdBoCIIcQAvD_BwE");
studentLink.setAttribute("value", "TD Student Banking Package");

// /* Form Submission - Collect all the input from the user */
// const firstNameA = document.getElementById('firstName');
// const lastNameA = document.getElementById('lastName');
// const emailA = document.getElementById('email');
// const passwordA = document.getElementById('password');
// const passwordReA = document.getElementById('confirmPassword');
// const AudienceA = document.getElementById('audience');

// /* track the form submit, show the stored date in the console via console.log */
// const formA = document.querySelector("form");
// console.log(formA);

// formA.addEventListener("submit", function (event) {
//     event.preventDefault();
//     const userAudienceA = AudienceA.value;
//     console.log(`Selected Audience is ${userAudienceA}`)
// }
// );

/* track the form submit */
const formA = document.querySelector("form");

formA.addEventListener("submit", function (event) {
    event.preventDefault();
    const audienceA = document.getElementById('audience'); //get the element now, audience is created on different JS
    if (!audienceA) {
        console.log("Audience element does not exist yet!");
        return;
    }
    console.log(`Selected Audience is ${audienceA.value}`);
});

function appendAudience(event) {
    if (audienceA.value === audience[0].value) {
        audienceResult.appendChild(studentLink);
    }
}

