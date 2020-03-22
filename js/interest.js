// Listen for submit

document.getElementById('inflation-form').addEventListener('submit', calculateResults);

// Calculate Results
function calculateResults(e){
    console.log("Working");
    // UI variables
    const amount = getElementById("amount");
    const inflation = getElementById("inflation");
    const years = getElementById("years");
    const monthlyInflation = getElementById("monthly-inflation");
    const totalValue = getElementById("total-value");
    const totalInflation = getElementById("total-inflation");

    const principal = parseFloat(amount.value);
    const calculatedInflation = parseFloat(inflation.value) / 100 / 12;
    const calculatedYears = parseFloat(years.value) * 12;

    // Compute Monthly Payments
    const x = Math.pow(1 + calculatedInflation, calculatedYears);
    const monthly = (principal*x*calculatedInflation)/(x-1);

    if(isFinite(monthly)){
        monthlyInflation.value = monthly.toFixed(2);
        totalValue.value = (monthly * calculatedYears).toFixed(2);
        totalInflation.value = ((monthly * calculatedYears)-principal).toFixed(2);
    } else {
        showError("Please check your numbers");
    }

    e.preventDefault();
}

// Show Error
function showError(error){
    //Create div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add Class
    errorDiv.className = "alert alert-danger";

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

}