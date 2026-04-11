const display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operator = null;

function updateDisplay() {
    display.innerText = currentInput;
}

function appendNumber(number) {
    // Evita múltiplos pontos decimais
    if (number === '.' && currentInput.includes('.')) return;
    
    // Substitui o zero inicial ou concatena o número
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') return;
    
    // Se já tiver um número anterior, calcula antes de adicionar o novo operador
    if (previousInput !== '') {
        calculate();
    }
    
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    // Se faltar algum número, não faz nada
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Erro: Divisão por zero!");
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // Arredonda resultados com muitas casas decimais para evitar bugs visuais
    currentInput = Math.round(result * 100000000) / 100000000;
    operator = null;
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}