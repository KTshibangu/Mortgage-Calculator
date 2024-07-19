

const defaultText = document.getElementById("default-text");
const calculationContainer = document.getElementById("calculation-container");

const calculateBtn = document.getElementById("calculate-btn");
const clearBtn = document.getElementById("clear-btn");


document.querySelectorAll('.mortgage-type').forEach(input => {
    input.addEventListener('change', function() {
        document.querySelectorAll('.radio-inputs').forEach(div => {
            div.classList.remove('selected');
        })

        if(this.checked) {
            this.parentElement.classList.add('selected');
        }
    })
})


calculateBtn.addEventListener('click', () => {
    const amount = parseFloat(document.getElementById("mortgage-amount").value);
    const term = parseFloat(document.getElementById("mortgage-term").value);
    const rate = parseFloat(document.getElementById("mortgage-rate").value)/ 100;
    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');
    
    let isValid = true;

    document.querySelectorAll('.form-flex').forEach(el => {
        el.classList.remove('error');
    })

    if(isNaN(amount) || amount <= 0){
        document.getElementById('amount-alert').style.display = 'blcok';
        document.getElementById('mortgage-amount-main').classList.add = 'error';
        isValid = false;
    } else {
        document.getElementById('amount-alert').style.display = 'none';
    }

    if(isNaN(term) || amount <= 0){
        document.getElementById('term-alert').style.display = 'blcok';
        document.getElementById('mortgage-term-main').classList.add = 'error';
        isValid = false;
    } else {
        document.getElementById('term-alert').style.display = 'none';
    }

    if(isNaN(rate) || rate <= 0){
        document.getElementById('rate-alert').style.display = 'blcok';
        document.getElementById('mortgage-rate-main').classList.add = 'error';
        isValid = false;
    } else {
        document.getElementById('rate-alert').style.display = 'none';
    }

    if(!mortgageType) {
        document.getElementById('mortgage-type-alert').style.display = 'blcok';
        document.querySelectorAll('.radio-inputs').forEach(el => {
            el.classList.add('error');
        })
        isValid = false;
    } else {
        document.getElementById('mortgage-type-alert').style.display = 'none';
        document.querySelectorAll('.radio-inputs').forEach(el => {
            el.classList.remove('error');
        })
    }


    if(isValid) {
        let monthlyRepayment = 0;
        let totalRepayment = 0;

        defaultText.classList.add('hide');
        calculationContainer.classList.add('show');

        if(mortgageType.value === 'repayment') {
            const r = rate / 12;
            const n = term * 12;
            monthlyRepayment = (amount * r) / (1 - Math.pow((1 + r), -n));
            totalRepayment = monthlyRepayment * n;
        } else if (mortgageType.value === 'interest-only') {
            monthlyRepayment = (amount * rate) / 12;
            totalRepayment = monthlyRepayment * term * 12;
        }

        document.getElementById('result').innerText = `$${monthlyRepayment.toFixed(2)}`;
        document.getElementById('term-result').innerText = `$${totalRepayment.toFixed(2)}`;
    } else {
        document.getElementById('result').innerText = '';
        document.getElementById('term-result').innerText = '';

        defaultText.classList.remove('hide');
        calculationContainer.classList.remove('show');
    }

})


clearBtn.addEventListener('click', () => {
    document.getElementById('mortgage-form').reset();
    document.getElementById('result').innerText = '';
    document.getElementById('term-result').innerText = '';

    document.querySelectorAll('.form-alert').forEach(alert => {
        alert.style.display = 'none';
    })

    defaultText.classList.remove('hide');
    calculationContainer.classList.remove('show');

    document.querySelectorAll('radio-inouts').forEach(div => {
        div.classList.remove('selected');
    })

    document.querySelectorAll('.form-flex').forEach(el => {
        el.classList.remove('error');
    
    })

})

 


   