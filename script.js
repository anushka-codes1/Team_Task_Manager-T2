//Feature 1: Task Creation (Anushka)
const tasks = []; //Array which stores tasks
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const addTaskBtn = document.getElementById("addTaskButton");
const pendingTaskList = document.getElementById("pendingTaskList");
const ongoingTaskList = document.getElementById("ongoingTaskList");
const completedTaskList = document.getElementById("completedTaskList");
const pendingSection = document.getElementById("pendingSection");
const ongoingSection = document.getElementById("ongoingSection");
const completedSection = document.getElementById("completedSection");
let editingTaskIndex = -1; // Track the index of the task being edited

addTaskBtn.addEventListener("click", function () { //Adding or Updating the task event
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    if (title === "") { //Validating title
        alert("Task title is required!");
        return;
    }

    if (editingTaskIndex >= 0) {
        // Update existing task
        tasks[editingTaskIndex].title = title;
        tasks[editingTaskIndex].description = description;

        // Reset editing state
        editingTaskIndex = -1;
        addTaskBtn.innerText = "Add Task";
        alert("Task updated successfully!");
    } else {
        // Create new task
        const task = {
            title: title,
            description: description,
            status: "Pending"
        }
        tasks.push(task); //Storing the task
    }

    taskTitle.value = ""; //Clearing task input value
    taskDescription.value = ""; //Clearing task description input value

    console.log("All Tasks:", tasks);
    displayTasks(); // Call the function to update the UI
});

function displayTasks() {
    pendingTaskList.innerHTML = "";
ongoingTaskList.innerHTML = "";
completedTaskList.innerHTML = "";
   pendingSection.style.display = "none";
ongoingSection.style.display = "none";
completedSection.style.display = "none";

    // Loop through the tasks array to create cards for each task
    tasks.forEach((task, index) => {
        // Create the main card container
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");

        // Create and set the title element
        const titleElement = document.createElement("h3");
        titleElement.innerText = task.title;

        // Create and set the description element
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = task.description;

        // Create and set the status element
        const statusElement = document.createElement("p");
        statusElement.classList.add("task-status");
        statusElement.innerText = "Status: " + task.status;

        // Create the status toggle button
        const statusBtn = document.createElement("button");
        statusBtn.classList.add("status-btn");

        // Create the Edit button
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", () => editTask(index));

        // Create the Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => deleteTask(index));

       if (task.status === "Pending") {
        pendingSection.style.display = "block";
    statusBtn.innerText = "Start Task";

    statusBtn.onclick = function () {
    task.status = "Ongoing";
    displayTasks();
};

    taskCard.appendChild(titleElement);
    taskCard.appendChild(descriptionElement);
    taskCard.appendChild(statusElement);
    taskCard.appendChild(statusBtn);
    taskCard.appendChild(editBtn);
    taskCard.appendChild(deleteBtn);

    pendingTaskList.appendChild(taskCard);
}
else if (task.status === "Ongoing") {
    ongoingSection.style.display = "block";
    statusBtn.innerText = "Complete Task";

   statusBtn.onclick = function () {
    task.status = "Completed";
    displayTasks();
};
    taskCard.appendChild(titleElement);
    taskCard.appendChild(descriptionElement);
    taskCard.appendChild(statusElement);
    taskCard.appendChild(statusBtn);
    taskCard.appendChild(editBtn);
    taskCard.appendChild(deleteBtn);

    ongoingTaskList.appendChild(taskCard);
}
else if (task.status === "Completed") {
    completedSection.style.display = "block";
    statusBtn.innerText = "Completed";
    statusBtn.disabled = true;
    statusBtn.style.backgroundColor = "grey";
    statusBtn.style.cursor = "not-allowed";

    taskCard.appendChild(titleElement);
    taskCard.appendChild(descriptionElement);
    taskCard.appendChild(statusElement);
    taskCard.appendChild(deleteBtn);

    completedTaskList.appendChild(taskCard);
}
    });
}

// Function to handle editing a task
function editTask(index) {
    const task = tasks[index];
    taskTitle.value = task.title;
    taskDescription.value = task.description;

    editingTaskIndex = index;
    addTaskBtn.innerText = "Update Task";

    // Scroll to input area
    window.scrollTo(0, 0);
}

// Function to handle deleting a task
function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        displayTasks();

        // If we were editing the deleted task, cancel edit mode
        if (editingTaskIndex === index) {
            editingTaskIndex = -1;
            addTaskBtn.innerText = "Add Task";
            taskTitle.value = "";
            taskDescription.value = "";
        }
    }
}
