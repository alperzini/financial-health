document.addEventListener("DOMContentLoaded", () => {
    const audience = localStorage.getItem("selectedAudience"); // Get the stored audience value

    const map = { // Map audience values, HTML class names
        "Student": ".audience-result__student",
        "Retiree / Soon-to-be Retirees": ".audience-result__retiree",
        "Newcomer to Canada": ".audience-result__canada",
        "Homeowner": ".audience-result__homeowner"
    };
    const targetSelector = map[audience]; // Get the matching class

    if (!targetSelector) return; // safety check

    document.querySelectorAll(".audience-result__card").forEach((card) => { // Hide all audience cards first
        card.style.display = "none";
    });

    const targetDiv = document.querySelector(targetSelector); // Show the correct one
    if (targetDiv) {
        targetDiv.style.display = "flex";
    }
});


