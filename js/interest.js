// Listen for submit

document.getElementById("inflation-form").addEventListener("submit", calculateResults);

// Calculate Results
function calculateResults(e){
    // console.log("Testing");
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
        console.log("Please check your numbers");
    }

    e.preventDefault();
}