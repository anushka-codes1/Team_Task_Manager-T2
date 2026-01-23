//Feature 1: Task Creation (Anushka)
const tasks = []; //Array which stores tasks
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const addTaskBtn = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const completedTaskList = document.getElementById("completedTaskList");
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
    taskList.innerHTML = ""; // Clear current active list
    completedTaskList.innerHTML = ""; // Clear current completed list

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

        // Check if task is completed to determine button state and location
        if (task.status === "Completed") {
            statusBtn.innerText = "Completed";
            statusBtn.disabled = true;
            statusBtn.style.backgroundColor = "grey";
            statusBtn.style.cursor = "not-allowed";

            // Append elements
            taskCard.appendChild(titleElement);
            taskCard.appendChild(descriptionElement);
            taskCard.appendChild(statusElement);
            // Completed tasks get Delete button
            taskCard.appendChild(deleteBtn);
            // Completed tasks might not need Edit, but user asked for "Edit option also". 
            // Often we don't edit completed history, but I will allow it for flexibility or disable it.
            // Let's allow editing for all as interpreted.
            taskCard.appendChild(editBtn);

            completedTaskList.appendChild(taskCard);
        } else {
            statusBtn.innerText = "Update Status";

            statusBtn.addEventListener("click", function () {
                if (task.status === "Pending") task.status = "Ongoing";
                else if (task.status === "Ongoing") task.status = "Completed";
                displayTasks();
            });

            // Append elements
            taskCard.appendChild(titleElement);
            taskCard.appendChild(descriptionElement);
            taskCard.appendChild(statusElement);
            taskCard.appendChild(statusBtn);
            // Active tasks get Edit button
            taskCard.appendChild(editBtn);
            // Active tasks get Delete button too (good UX)
            taskCard.appendChild(deleteBtn);

            taskList.appendChild(taskCard);
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
