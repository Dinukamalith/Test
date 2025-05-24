document.addEventListener('DOMContentLoaded', function () {
    const calculateButton = document.getElementById('calculateButton');
    const futureValueResultEl = document.getElementById('futureValueResult');
    const totalInterestEarnedEl = document.getElementById('totalInterestEarned');

    calculateButton.addEventListener('click', function () {
        // Retrieve input values
        const currentPrincipal = document.getElementById('currentPrincipal').value;
        const monthlyContribution = document.getElementById('monthlyContribution').value;
        const annualInterestRate = document.getElementById('annualInterestRate').value;
        const investmentDuration = document.getElementById('investmentDuration').value;

        // Convert to numbers
        const P = parseFloat(currentPrincipal);
        const PMT = parseFloat(monthlyContribution);
        const rate = parseFloat(annualInterestRate);
        const t = parseFloat(investmentDuration);

        // Basic input validation
        if (isNaN(P) || P < 0) {
            alert("Please enter a valid non-negative Principal Amount.");
            return;
        }
        if (isNaN(PMT) || PMT < 0) { // Assuming positive or zero contributions for now
            alert("Please enter a valid non-negative Monthly Contribution.");
            return;
        }
        if (isNaN(rate) || rate < 0) {
            alert("Please enter a valid non-negative Annual Interest Rate.");
            return;
        }
        if (isNaN(t) || t <= 0) {
            alert("Please enter a valid positive Investment Duration.");
            return;
        }

        // Calculate future value
        const r = rate / 100; // Convert percentage to decimal
        const n = 12; // Compounded monthly
        const nt = n * t;
        const r_n = r / n;

        // FV = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
        let FV;
        if (r_n === 0) { // Handle case where interest rate is 0
            FV = P + (PMT * n * t);
        } else {
            FV = P * Math.pow((1 + r_n), nt) + PMT * ((Math.pow((1 + r_n), nt) - 1) / r_n);
        }
        

        // Calculate total interest earned
        const totalContributions = PMT * n * t;
        const totalInterestEarned = FV - P - totalContributions;

        // Display results
        if (isNaN(FV) || !isFinite(FV)) {
            futureValueResultEl.textContent = "Error in calculation";
            totalInterestEarnedEl.textContent = "-";
        } else {
            futureValueResultEl.textContent = FV.toFixed(2);
            totalInterestEarnedEl.textContent = totalInterestEarned.toFixed(2);
        }
    });
});
