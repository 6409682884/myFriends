let friends;
let result = document.getElementById("result");

genarateForm() //สุ่มจำนวนและสร้างตารางตามจำนวนที่สุ่มได้

function genarateForm() {
    friends = Math.floor(Math.random() * 9) + 1;
    let inputForm = `<form id="form" name="friendForm"><p id="topic">Friends List (${friends} friends)</p>`;
    for (let i = 0; i < friends; i++) {
        inputForm += `${i + 1}. Name: <input type="text" name="friendNickname${i + 1}"> Age: <input type="number" min="1" max="150" name="friendAge${i + 1}"><br>`
    }
    inputForm += `</form>`
    document.getElementById('friendForm').innerHTML = inputForm;
    result.value = "";
}

function getTotalAge() {
    if (isAllInputHaveValue()) {
        let form = document.forms["friendForm"];
        let inputs = form.elements;
        let sum = 0;
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].getAttribute('name').includes('friendAge')) {
                sum += parseInt(inputs[i].value);
            }
        }
        result.value = "Total Age: " + parseInt(sum) + " years";
        return parseInt(sum);
    }
    return null;
}

function getAverageAge() {
    if (isAllInputHaveValue()) {
        let sum = getTotalAge();
        let average = sum / friends;
        result.value = `Average Age: ${average} years`;
        return average;
    }
    return null;
}

function getMinimumAge() {
    if (isAllInputHaveValue()) {
        let form = document.forms["friendForm"];
        let inputs = form.elements;
        let arrayAge = [];
        let minimum;
        let listMinimumFriends = "Minimum Age:\n";
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].getAttribute('name').includes('friendAge')) {
                arrayAge.push(parseInt(inputs[i].value));
            }
        }
        arrayAge.sort((a, b) => a - b);
        minimum = parseInt(arrayAge[0]);
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].getAttribute('name').includes('friendAge')) {
                if (parseInt(inputs[i].value) === minimum) {
                    listMinimumFriends += `\tName:${inputs[i - 1].value} Age:${inputs[i].value} years\n`;
                }
            }
        }
        result.value = listMinimumFriends;
        return listMinimumFriends;
    }
    return null;
}

function getMaximumAge() {
    if (isAllInputHaveValue()) {
        let form = document.forms["friendForm"];
        let inputs = form.elements;
        let arrayAge = [];
        let maximum;
        let listMaximumFriends = "Maximum Age:\n";
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].getAttribute('name').includes('friendAge')) {
                arrayAge.push(parseInt(inputs[i].value));
            }
        }
        arrayAge.sort((a, b) => a - b);
        maximum = parseInt(arrayAge[arrayAge.length - 1]);
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].getAttribute('name').includes('friendAge')) {
                if (parseInt(inputs[i].value) === maximum) {
                    listMaximumFriends += `\tName:${inputs[i - 1].value} Age:${inputs[i].value} years\n`;
                }
            }
        }
        result.value = listMaximumFriends;
        return listMaximumFriends;
    }
    return null;
}

function isAllInputHaveValue() {
    let form = document.forms["friendForm"];
    let inputs = form.elements;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === "") {
            inputs[i].classList.add("inputEmpty");
            alert(`Must fill in the names and ages of ${friends} friends.`);
            result.classList.add("error")
            result.value = `Must fill in the names and ages of ${friends} friends.`;
            return false;
        } else {
            result.classList.remove("error");
            inputs[i].classList.remove("inputEmpty");
        }
    }
    return true;
}

function removeBorderInputEmpty() {
    let form = document.forms["friendForm"];
    let inputs = form.elements;
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("inputEmpty");
    }
}

//เมื่อผู้ใช้กรอก input แล้วให้เอา class inputEmpty ออกจาก class ของ input
checkInputFocus()
function checkInputFocus() {
    document.querySelectorAll('input[type]').forEach(function (input) {
        input.addEventListener("focusout", function (event) {
            let inputText = event.target.value.trim();
            if (inputText) {
                input.classList.remove("inputEmpty");
            }
        });
    });
}


document.getElementById('getSumAge-button').addEventListener('click', getTotalAge);
document.getElementById('getAverageAge-button').addEventListener('click', getAverageAge);
document.getElementById('getMinimumAge-button').addEventListener('click', getMinimumAge);
document.getElementById('getMaximumAge-button').addEventListener('click', getMaximumAge);
document.getElementById('resetForm').addEventListener('click', () => { document.getElementById('form').reset(); removeBorderInputEmpty(); })
document.getElementById('randomFriend').addEventListener('click', () => { genarateForm(); checkInputFocus(); });
