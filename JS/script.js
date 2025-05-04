const todo = document.getElementById("todo");
const button = document.getElementById("button");
const table = document.getElementById("add-todo");
const formValue = document.getElementById("form-value");
const todoValue = document.getElementById("todo-value");
const changekValue = document.getElementById("change");
const rightvalue = document.getElementById("right");

let id = 1;
let currentEditingRow = null;

// Header Row
const tr = document.createElement("tr");
["ID", "Task", "Created Time", "Actions"].forEach(text => {
    const th = document.createElement("th");
    th.innerText = text;
    tr.appendChild(th);
});
table.appendChild(tr);

// Add Task
button.addEventListener("click", (e) => {
    e.preventDefault();
    if (todo.value.trim() === "") return;

    const tr = document.createElement("tr");
    const tdId = document.createElement("td");
    const tdTask = document.createElement("td");
    const tdTime = document.createElement("td");
    const tdActions = document.createElement("td");

    tdId.innerText = id++;
    tdTask.innerText = todo.value;
    const now = new Date();
    tdTime.innerText = `${now.toLocaleTimeString()} (${now.toLocaleDateString()})`;

    // Done Button
    const doneBtn = document.createElement("button");
    doneBtn.className = "trash";
    doneBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
    doneBtn.addEventListener("click", () => {
        tr.style.opacity = "0.5";
        todoValue.value = tdTask.innerText;
        formValue.style.display = "grid";
        currentEditingRow = tdTask;
    });

    // Delete Button
    const delBtn = document.createElement("button");
    delBtn.className = "delete";
    delBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    delBtn.addEventListener("click", () => tr.remove());

    tdActions.append(doneBtn, delBtn);
    tr.append(tdId, tdTask, tdTime, tdActions);
    table.appendChild(tr);
    todo.value = "";
});

// Change Edited Task
changekValue.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentEditingRow) {
        currentEditingRow.innerText = todoValue.value;
        formValue.style.display = "none";
        currentEditingRow.parentElement.style.opacity = "1";
        currentEditingRow = null;
    }
});

// Cancel Edit
rightvalue.addEventListener("click", (e) => {
    e.preventDefault();
    formValue.style.display = "none";
    if (currentEditingRow) {
        currentEditingRow.parentElement.style.opacity = "1";
        currentEditingRow = null;
    }
});
