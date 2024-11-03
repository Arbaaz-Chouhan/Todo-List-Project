const todo = document.getElementById("todo");
const button = document.getElementById("button");
const table = document.getElementById("add-todo");
const formValue = document.getElementById("form-value");
const todoValue = document.getElementById("todo-value");
const changekValue = document.getElementById("change");
const rightvalue = document.getElementById("right");

const body = document.querySelector("body")
const tr = document.createElement("tr");
const id1 = document.createElement("th");
const task = document.createElement("th");
const time = document.createElement("th");

id1.innerText = "id";
task.innerText = "task"
time.innerText = "created time";
tr.append(id1, task, time);
table.append(tr);

button.addEventListener("click", todotext)

let id = 1;
function todotext(e) {
    e.preventDefault();


    const tr = document.createElement("tr");
    const currentId = document.createElement("td");
    const task = document.createElement("td");
    const currentTime = document.createElement("td");

    const time = new Date();

    currentId.innerText = id++;
    task.innerText = todo.value;
    const CurruntHours = time.getHours()
    const CurruntMin = time.getMinutes()
    const CurruntSec = time.getSeconds()
    const CurruntFull = time.getFullYear()
    const CurruntDate = time.getDate()
    const CurruntMonth = time.getMonth()
    currentTime.innerText = `${CurruntHours}:${CurruntMin}:${CurruntSec}(${CurruntDate}/${CurruntMonth}/${CurruntFull})`

    tr.append(currentId, task, currentTime);
    table.append(tr);


    // let data = {
    //     currentId : currentId.value,
    //     task : task.value,
    //     CurruntTime : currentTime.value
    // }

    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = `<i class="fa-solid fa-check"></i>`
    trashbutton.classList.add("trash");
    tr.append(trashbutton);
    table.append(tr)

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`
    deleteButton.classList.add("delete");
    tr.append(deleteButton);
    table.append(tr);

    deleteButton.addEventListener("click", generateUUID);

    function generateUUID() {
        const time = new Date();
        const ms = time.getMilliseconds() * Math.random() * 100;
        let uuid = parseInt(ms);
        const min = 97;
        const max = 122;
        for (let i = 0; i < 10; i++) {
            const randomCharCode = Math.random() * (max - min) + min;
            uuid += String.fromCharCode(randomCharCode);
        }
        return uuid;
    }

    deleteButton.addEventListener("click", () => {
        tr.remove();
    })

    trashbutton.addEventListener("click", trash);

    function trash() {
        tr.style.opacity = "0.5";
        todoValue.value = tr.children[1].innerText;
        formValue.style.display = "grid";
        changekValue.addEventListener("click", change);

        // let storeData = JSON.parse(localStorage.getItem("saveData")) || [];
        // storeData.push(todo);
        localStorage.setItem("savaData", JSON.stringify(todo, currentId, currentTime));
        let get = localStorage.getItem("saveData");
        console.log(get);

        function change(e) {
            e.preventDefault();

            task.innerText = todoValue.value;
            formValue.style.display = "none";
            tr.style.opacity = "1.9";
        }
    }

    rightvalue.addEventListener("click", right);

    function right(e) {
        e.preventDefault();
        formValue.style.display = "none";

    }

    todo.value = "";
}




