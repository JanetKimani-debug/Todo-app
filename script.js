const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");
const taskCount = document.getElementById("taskCount");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => addTaskToDOM(task));
updateCount();

// Add task
addTaskBtn.addEventListener("click", function () {
    const text = taskInput.value.trim();
    if (text === "") return alert("Please enter a task!");

    const newTask = { text: text, done: false };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    addTaskToDOM(newTask);
    taskInput.value = "";
    updateCount();
});

// Function to add a task to the UI
function addTaskToDOM(task) {
    const li = document.createElement("li");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", function () {
        task.done = checkbox.checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateCount();
    });

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.style.fontSize = "16px";
    deleteBtn.addEventListener("click", function () {
        li.remove();
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateCount();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Clear all tasks
clearAllBtn.addEventListener("click", function () {
    li.remove();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskList.innerHTML = "";
    updateCount();
});

// Update pending tasks count
function updateCount() {
    const pending = tasks.filter(t => !t.done).length;
    taskCount.textContent = `You have ${pending} pending tasks`;
}













