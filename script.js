const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const filterSelect = document.getElementById("filterSelect");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearAllBtn = document.getElementById("clearAllBtn");

// Load tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add Task
addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text === "") return alert("Enter a task!");

    const isUrgent = confirm("Is this task urgent?");
    const category = categorySelect.value;

    const newTask = {
        text,
        done: false,
        urgent: isUrgent,
        category
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskInput.value = "";
});

// Render Tasks
function renderTasks() {
    taskList.innerHTML = "";

    const filter = filterSelect.value;

    tasks
        .filter(t => filter === "All" || t.category === filter)
        .forEach(task => createTaskElement(task));

    updatePendingCount();
}

// Create Task Element
function createTaskElement(task) {
    const li = document.createElement("li");

    const left = document.createElement("div");
    left.className = "task-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
        task.done = checkbox.checked;
        saveTasks();
        updatePendingCount();
    });

    const text = document.createElement("span");
    text.textContent = task.text;

    const category = document.createElement("span");
    category.className = "category-label";
    category.textContent = task.category;

    if (task.urgent) {
        const urgent = document.createElement("span");
        urgent.className = "urgent-label";
        urgent.textContent = "🔥 Urgent";
        left.appendChild(urgent);
    }

    left.appendChild(checkbox);
    left.appendChild(text);
    left.appendChild(category);

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", () => {
        const newText = prompt("Edit task:", task.text);
        if (newText !== null && newText.trim() !== "") {
            task.text = newText;
            saveTasks();
            renderTasks();
        }
    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "🗑";
    deleteBtn.addEventListener("click", () => {
        tasks = tasks.filter(t => t !== task);
        saveTasks();
        renderTasks();
    });

    li.appendChild(left);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update count
function updatePendingCount() {
    const pending = tasks.filter(t => !t.done).length;
    taskCount.textContent = `You have ${pending} pending tasks`;
}

// Clear All
clearAllBtn.addEventListener("click", () => {
    if (!confirm("Clear all tasks?")) return;
    tasks = [];
    saveTasks();
    renderTasks();
});

// Category filter
filterSelect.addEventListener("change", renderTasks);


















