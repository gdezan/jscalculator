const buttons = document.querySelectorAll('.button');
const screen = document.querySelector('.screen-text');

let error = true;
let calcCheck = false;
const operations = ['÷','x','-','+'];
let result = 0;

buttons.forEach(btn => {
    let first = 0;
    let operation = '';
    btn.addEventListener('click', () => {
        screenWrite(btn);
    })
    btn.addEventListener('touch', () => {
        screenWrite(btn);
    })
})

function screenWrite(btn){
    if (btn.classList.contains('btn1')){ // AC
        screen.innerHTML = "0";
        error = true;
        result = 0;  
    } else if (btn.classList.contains('btn2')){ // CE
        screen.innerHTML = "0";
        error = true;  
    } else if (btn.classList.contains('btn3')){ // %
        let n = Number(screen.innerHTML) / 100;
        if (isNaN(n)){
            screen.innerHTML="ERROR";
        } else {
            screen.innerHTML=(n.toString()).substring(0,10);
        }
        error = true;  
    } else if (btn.classList.contains('btn4') || btn.classList.contains('btn8') || btn.classList.contains('btn12') || btn.classList.contains('btn16')){ // +, -, / or *
        first = Number(screen.innerHTML);
        operation = btn.textContent;
        screen.innerHTML = operation;
        error = true;
        calcCheck = true;
    } else if (error){
        screen.innerHTML = btn.textContent;
        error = false;
    } else if (btn.classList.contains('btn19')){ // =
        let n = Number(result);
        if (isNaN(n)){
            screen.innerHTML="ERROR";
        } else {
            screen.innerHTML=n;
        }
        error = true;
    } else if (screen.innerHTML.length <= 10){ // any number
        screen.innerHTML += btn.textContent;
    }

    if (calcCheck && operations.indexOf(screen.innerHTML) === -1){
        second = Number(screen.innerHTML);
        result = ((calculation(operation, first, second))).toString();
        if ((calculation(operation, first, second)) > 99999999999){
            result = "ERROR";
        }
        if (result.length > 10){
            result = result.substring(0,10);
        }
    }

}

function calculation(op, a, b){
    if (op == 'x'){
        return a*b;
    } else if (op == '÷'){
        return a/b;
    } else if (op == '-'){
        return a-b;
    } else if (op == '+'){
        return a+b;
    }
}