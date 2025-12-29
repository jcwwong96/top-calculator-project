function add(num_1, num_2){
    return num_1 + num_2;
};
function substract(num_1, num_2) {
    return num_1 - num_2;
};
function multiply(num_1, num_2) {
    return num_1 * num_2;
};
function divide(num_1, num_2) {
    return num_1 / num_2
};




//global variables
let num_1 = null;
let num_2;
let f_operator = "";
let errorMessage = "Error!";
let isEquated = false;
let counter = 0;
let isDecimalPressed = false;





function operate(num_1, num_2, operator) {
    console.log(`[function operate]: The funciton of operate has been executed! with operator = ${operator} num_1 = ${num_1} and num_2 = ${num_2}`)
    
    let result = operator(num_1, num_2);
    
    console.log(`[function operate]: Result is ${result}`)
    return result
};





const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#delete");
const equate = document.querySelector("#equate");
const decimalDot = document.querySelector("#decimalDot");




const func_numbers = (event) => {
    if (display.textContent == errorMessage || isEquated == true) {
        display.textContent = "";
    };

    if (event.type === "keydown") {
        display.textContent += event.key;
    } else {
        display.textContent += event.target.textContent;
    }

    isEquated = false;
}
for (const number of numbers) {
    number.addEventListener("click", func_numbers)
};
/*for(const number of numbers) {
    number.addEventListener("click", (event) => {
        if(display.textContent == errorMessage || isEquated == true) {
            display.textContent = "";
        }
        const output = event.target.textContent;
        display.textContent += output;
        isEquated = false;
    })
}*/





const func_operator = (event) => {
    let result;
    
    if (event.type === "keydown") {
        display.textContent += ` ${event.key} `;
    } else {
        display.textContent += ` ${event.target.textContent} `;//to add operator symbol on display
    }

    if(num_1 === null && !Number.isNaN(result) && result !== Infinity) {
        num_1 = display.textContent.slice(0, -3) //to remove the spaces and operator symbol
    } else {
        num_2 = display.textContent.slice(String(num_1).length + 3, -3) //to remove the spaces and pressed operator that are not visible on the display
        if(num_2 === ""){ // in case operator button is being pressed for the second consecutive time
            num_2 = null;
        }
    }

    f_s_operator = f_operator;// always undefined on first click
    if (event.type === "keydown") {
        f_operator = event.key;
    } else {
        f_operator = event.target.textContent;
    }

    let operator;
    switch(f_s_operator) {
    case "+":
        operator = add;
        break;
    case "-":
        operator = substract;
        break;
    case "*":
        operator = multiply;
        break;
    case "/":
        operator = divide;
        break;
    };

    //console.log(`[operator] f_s_operator: ${f_s_operator}`)
    //console.log(`[operator] f_operator: ${f_operator}`);
    
    if(counter !== 0) { // the logic still works without this counter, work on this later.
        result = Math.round((operate(Number(num_1), Number(num_2), operator)) * 1000) / 1000;
        if(num_2 !== null && !Number.isNaN(result) && result !== Infinity) {//!Number.isNaN(result)){
            num_1 = result;
            num_2 = null;
            display.textContent = `${result} ${f_operator} `;
        } else if(Number.isNaN(result) || !Number.isFinite(result)) {
            display.textContent = errorMessage;
            num_1 = null;
            num_2 = null;
            counter = 0;
            result = undefined;
            f_s_operator = "";
            f_operator = "";
            event.preventDefault();
        } else {
            display.textContent = display.textContent.slice(0, -6) + ` ${f_operator} `;
            event.preventDefault();
        }
    }
    
    counter += 1;
    isEquated = false;
    isDecimalPressed = false;
};
for (const operator of operators) {
    operator.addEventListener("click", func_operator)
};
/*for(const operator of operators) {

    let f_s_operator = ""

    operator.addEventListener("click", (event) => {
        let result;
        
        display.textContent += ` ${event.target.textContent} `;//to add operator symbol on display

        if(num_1 === null && !Number.isNaN(result) && result !== Infinity) {
            num_1 = display.textContent.slice(0, -3) //to remove the spaces and operator symbol
        } else {
            num_2 = display.textContent.slice(String(num_1).length + 3, -3) //to remove the spaces and pressed operator that are not visible on the display
            if(num_2 === ""){ // in case operator button is being pressed for the second consecutive time
                num_2 = null;
            }
        }

        f_s_operator = f_operator;// always undefined on first click
        f_operator = event.target.textContent;

        let operator;
        switch(f_s_operator) {
        case "+":
            operator = add;
            break;
        case "-":
            operator = substract;
            break;
        case "x":
            operator = multiply;
            break;
        case "/":
            operator = divide;
            break;
        };

        //console.log(`[operator] f_s_operator: ${f_s_operator}`)
        //console.log(`[operator] f_operator: ${f_operator}`);
        
        if(counter !== 0) { // the logic still works without this counter, work on this later.
            result = Math.round((operate(Number(num_1), Number(num_2), operator)) * 1000) / 1000;
            if(num_2 !== null && !Number.isNaN(result) && result !== Infinity) {//!Number.isNaN(result)){
                num_1 = result;
                num_2 = null;
                display.textContent = `${result} ${f_operator} `;
            } else if(Number.isNaN(result) || !Number.isFinite(result)) {
                display.textContent = errorMessage;
                num_1 = null;
                num_2 = null;
                counter = 0;
                result = undefined;
                f_s_operator = "";
                f_operator = "";
                event.preventDefault();
            } else {
                display.textContent = display.textContent.slice(0, -6) + ` ${event.target.textContent} `;
                event.preventDefault();
            }
        }
        
        counter += 1;
        isEquated = false;
        isDecimalPressed = false;
    })
}*/





const func_equate = (event) => {
    num_2 = display.textContent.slice(String(num_1).length + 3) //num_2 is the last digit(s) on the display 
        
        if(num_2 === ""){ // in case operator button is being pressed for the second consecutive time
                    num_2 = null;
                }

        let operator;  
        switch(f_operator) {
            case "+":
                operator = add;
                break;
            case "-":
                operator = substract;
                break;
            case "*":
                operator = multiply;
                break;
            case "/":
                operator = divide;
                break;
        };

        let result = Math.round((operate(Number(num_1), Number(num_2), operator)) * 1000) / 1000;
        
        if(num_2 !== null && !Number.isNaN(result) && result !== Infinity){//!Number.isNaN(result))
            display.textContent = result;
            num_1 = null;
            num_2 = null;
            counter = 0;
        } else if(Number.isNaN(result) || !Number.isFinite(result)) {
            display.textContent = errorMessage;
            num_1 = null;
            num_2 = null;
            counter = 0;
            f_operator = "";
            result = undefined;
            event.preventDefault();
        } else {
            event.preventDefault();
        };
        
        isEquated = true;
        isDecimalPressed = false;
        //console.log(`[equate]: Is num_2 a null? ${num_2 === null}`);
        console.log(`[equate]: Is result a NaN? ${Number.isNaN(result)}`);

};
equate.addEventListener("click", func_equate);
/*equate.addEventListener("click", (event) => {

    num_2 = display.textContent.slice(String(num_1).length + 3) //num_2 is the last digit(s) on the display 
    
    if(num_2 === ""){ // in case operator button is being pressed for the second consecutive time
                num_2 = null;
                console.log(num_2)
            }

    let operator;  
    switch(f_operator) {
        case "+":
            operator = add;
            break;
        case "-":
            operator = substract;
            break;
        case "x":
            operator = multiply;
            break;
        case "/":
            operator = divide;
            break;
    };

    let result = Math.round((operate(Number(num_1), Number(num_2), operator)) * 1000) / 1000;
    
    if(num_2 !== null && !Number.isNaN(result) && result !== Infinity){//!Number.isNaN(result))
        display.textContent = result;
        num_1 = null;
        num_2 = null;
        counter = 0;
    } else if(Number.isNaN(result) || !Number.isFinite(result)) {
        display.textContent = errorMessage;
        num_1 = null;
        num_2 = null;
        counter = 0;
        f_operator = "";
        result = undefined;
        event.preventDefault();
    } else {
        event.preventDefault();
    }
    
    isEquated = true;
    isDecimalPressed = false;
    //console.log(`[equate]: Is num_2 a null? ${num_2 === null}`);
    console.log(`[equate]: Is result a NaN? ${Number.isNaN(result)}`);

})*/





const func_clear = (event) => {
    display.textContent = "";
    num_1 = null;
    num_2 = null;
    f_operator = "";
    counter = 0;
};
clear.addEventListener("click", func_clear);





const func_decimalDot = (event) => {
        if(isDecimalPressed == false && display.textContent.slice(-1) !== " " && isEquated == false) {
            display.textContent += ".";
            isDecimalPressed = true;
        } else {
            event.preventDefault();
        }
};
decimalDot.addEventListener("click", func_decimalDot);





const func_backspace = function func_backspace(event) {
    display.textContent = display.textContent.slice(0, -1);
};
backspace.addEventListener("click", func_backspace);





document.addEventListener("keydown", (event) => {
    
    //console.log(event.key);

    if (event.key === ".") {
        func_decimalDot(event);
    };

    if (event.key === "Backspace") {
        func_backspace(event);
    };

    if (event.key === "Escape") {
        func_clear(event);
    };

    if (event.key === "=") {
        func_equate(event);
    };

    if (("+-*/").includes(event.key)) {
        func_operator(event);
    };

    if (("0123456789").includes(event.key)) {
        func_numbers(event);
    }
});





const buttons = document.querySelector("#buttons");
buttons.addEventListener(("mousedown"), (event) => {
    if (event.target.tagName === "BUTTON") {
        //event.target.style.backgroundColor = "black";
    }
})

buttons.addEventListener(("mouseup"), (event) => {
    if (event.target.tagName === "BUTTON") {
        //event.target.style.backgroundColor = "";
    }
})





//known bugs
//1. after / is pressed, pressing any other operators will cause infinity error.
//2. when = is pressed by accident, it triggers the intented action of overriding the display when new numbers are pressed.
//3. need double backspaces to remove operator.
//4. "." will be shown on display in cleared state after pressing it.
