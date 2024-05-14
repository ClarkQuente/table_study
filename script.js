let select = document.getElementById('select-numbers')
let account = document.getElementById('account')
let buttons = document.getElementById('buttons')
let result = document.getElementById('result')
let buttonContinue = document.getElementById('button-continue')

number = 1
multiplication = 1

function generateButton() {
    number = parseInt(select.value)
    
    newMultiplication = sortBetween(1, 10)
    while(multiplication == newMultiplication) {
        newMultiplication = sortBetween(1, 10)
    }
    multiplication = newMultiplication

    account.innerText = `A conta é ${number} x ${multiplication}`
    buttons.innerHTML = ''
    buttonContinue.innerHTML = ''

    let passed = 0
    let correctIndex = sortBetween(0, 2)
    for(let i = 0; i <= 2; i++) {
        
        if(correctIndex == i) {
            let accountResult = number * multiplication

            let correctButton = document.createElement('button')
            correctButton.innerText = `${accountResult}`
            correctButton.onclick = function() {
                checkResponse(accountResult)
            }

            buttons.appendChild(correctButton)
            continue
        }
        
        let checker = passed;
        if(checker == 0) 
            passed = sortBetween(0, 1) == 0 ? -1 : 1
        
        let toIncrease
        if(checker == 0)
            toIncrease = passed == -1 ? 1 : -1
        else
            toIncrease = passed

        let wrongMultiplier = multiplication + toIncrease
        switch(wrongMultiplier) {
            case -1:
                wrongMultiplier = 2
                break
            case 11:
                wrongMultiplier = 8
                break
        }

        let wrongResult = number * wrongMultiplier

        let wrongButton = document.createElement('button')
        wrongButton.innerText = `${wrongResult}`
        wrongButton.onclick = function() {
            checkResponse(wrongResult)
        }

        buttons.appendChild(wrongButton)
    }
}

function checkResponse(number) {
    let correctResult = this.number * multiplication
    let correct = correctResult == number

    result.innerText = `A resposta está: ${correct ? 'CORRETA' : 'ERRADA'}`
    buttonContinue.innerHTML = ''

    if(correct) {
        let continueButton = document.createElement('button')
        continueButton.innerText = 'Continuar'
        continueButton.onclick = function() {
            generateButton()

            result.innerText = ''
        }

        buttonContinue.appendChild(continueButton)
    }
}

function sortBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}