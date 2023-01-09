let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['–', '+', '×', '÷', '%'];

const out = document.querySelector('.calc-screen p');

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
    document.getElementById('p').style.fontSize = '60px';
}
document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('ac')) return;

    let key = event.target.textContent;

    if (digit.includes(key)) {
        if (a === '0') {a = ''};
        if (b === '0') {b = ''};
        if (b === '' && sign === '') {
                if (key === '.' && a.includes('.')) return;
                if (key === '0' && a == '0') return;
                if (key === '.' && a == '') {a = '0'};
            a+=key;
            out.textContent = a;
            fontChange();
        }
        else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            if (key === '.' && b !== '') {b = '0.'};
            out.textContent = b;
            fontChange();
        }
        else {
                if (key === '.' && b.includes('.')) return;
                if (key === '0' && b == '0') return;
                if (key === '.' && a == '') {a = '0'};
                if (key === '.' && b == '') {b = '0'};
            b += key;
            out.textContent = b;
            fontChange();
        }
        return;
    }

    function count() {
        switch (sign) {
            case '+':
                a = +(+a + +b).toFixed(8);
                break;
            case '–':
                a = +(a - b).toFixed(8);
                break;
            case '×':
                a = +(a * b).toFixed(8);
                break;
            case '÷':
                if (b === '0' || b === '0.') {
                    out.textContent = 'Ошибка';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = +(a / b).toFixed(8);
                break;
            case '%':
                if (a < 0 || b < 0) {
                    a = '';
                    b = '';
                    sign = '';
                    out.textContent = 'Ошибка';
                    return;
                } 
                a = +(a / 100 * b).toFixed(8);
                break;
        }
        out.textContent = a;
    }

    if (action.includes(key)) {
            if (a == '') {a = 0};
            if (sign !== '' && !finish) {
                count();
                b = '';
                fontChange();
            }
        sign = key;
        return;
    }

    if (key === '=') {
        if (sign !== '') {
            if (b === '') b = a;
            count();
            finish = true;
            fontChange();
        }
    }  

    if (key === '+⁄-') {
        if (a === '' || a == '0' || a == '0.') return;
        if (b == '0' || b == '0.') return;

        if (b === '' && sign === '') {
        a = a * (-1);
        finish = false;
        out.textContent = a;
        } 
        else if (a !== '' && b !=='' && finish) {
            a = a * (-1);
            finish = true;
            out.textContent = a;
        }
        else {
            if (b === '') return;
        b = b * (-1);  
        finish = false;
        out.textContent = b;    
        }
    }
}

function fontChange() {
    if (out.textContent.length > 8 && out.textContent.length <= 12) {
        document.getElementById('p').style.fontSize = '40px';  
    } else if (out.textContent.length > 12) {
        document.getElementById('p').style.fontSize = '20px';
    }
    else {
        document.getElementById('p').style.fontSize = '60px';
    }
}