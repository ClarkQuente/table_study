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

    let wrongList = []
    let action = sortAction(multiplication)
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

        let wrongMultiplier = sortWrongMultiplier(wrongList, action, multiplication)
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

function sortAction(correctMultiplier) {

    /*
     * Actions: 
     * 
     * 1- 2 Bottom
     * 2- Mid
     * 3- 2 Upper
    */
    let action = sortBetween(1, 3)
    switch(correctMultiplier) {
        case 0:
            action = 3
            break
        case 1:
            if(action == 1)
                action = sortBetween(2, 3)
            break
        case 9:
            if(action == 3)
                action = sortBetween(1, 2)
            break
        case 10:
            action = 1
            break
    }

    return action
}

function sortWrongMultiplier(wrongList, action, correctMultiplier) {
    let wrong = null;

    while(wrong == null || wrong == correctMultiplier || wrongList.includes(wrong)) {
        switch(action) {
            case 1:
                wrong = sortBetween(correctMultiplier - 2, correctMultiplier)
                break
            case 2:
                wrong = sortBetween(correctMultiplier - 1, correctMultiplier + 1)
                break
            case 3:
                wrong = sortBetween(correctMultiplier, correctMultiplier + 2)
                break
        }
    }

    wrongList.push(wrong)
    return wrong
}

function sortBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}