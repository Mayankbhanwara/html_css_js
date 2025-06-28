const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

async function populateCurrencies() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    currencies.forEach(currency => {
        document.getElementById("fromCurrency").innerHTML += `<option value="${currency}">${currency}</option>`;
        document.getElementById("toCurrency").innerHTML += `<option value="${currency}">${currency}</option>`;
    });
}

async function convert() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (!amount) {
        alert("Enter a valid amount");
        return;
    }

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    const rate = data.rates[toCurrency];
    const converted = (amount * rate).toFixed(2);
    //.toFixed(2) converts the number to a string with exactly two digits after the decimal point
    
    document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${converted} ${toCurrency}`;
}

populateCurrencies();
