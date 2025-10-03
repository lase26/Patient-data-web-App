// 1. Grab the save-el paragrah and store it in a variable called saveEl
let countEl = document.getElementById("count-el")
let saveEl = document.getElementById("save-el")
let resetEl = document.getElementById("reset-el")
let count = 0

function increment() {
    count += 1
    countEl.textContent = count
}

function save() {
    let newV = count + " - "
    saveEl.textContent += newV
   /* countEl.textContent = 0
    count = 0*/
}

function reset(){
    count = 0
    countEl.textContent = 0
    resetEl.textContent += "Value has been reset"
}