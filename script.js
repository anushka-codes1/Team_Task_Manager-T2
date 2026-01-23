//Feature 1: Task Creation (Anushka)
const tasks = []; //Array which stores tasks
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const addTaskBtn = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
addTaskBtn.addEventListener("click", function () { //Adding the task event
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    if (title === "") { //Validating title
        alert("Task title is required!");
        return;
    }

    const task = { //Creating the task object
        title: title,
        description: description,
        status: "Pending"
    }

    tasks.push(task); //Storing the task

    taskTitle.value = ""; //Clearing task input value
    taskDescription.value = ""; //Clearing task description input value

    console.log("Task added:", task);
    console.log("All Tasks:", tasks);
    displayTasks(); // Call the function to update the UI

});

function displayTasks() {
    taskList.innerHTML = ""; // Clear current list to prevent duplicates

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
        statusBtn.innerText = "Update Status";
        statusBtn.classList.add("status-btn"); // Add a class for styling

        // Add event listener to handle status changes
        statusBtn.addEventListener("click", function () {
            // Logic to cycle through statuses: Pending -> Ongoing -> Completed -> Pending
            if (task.status === "Pending") {
                task.status = "Ongoing";
            } else if (task.status === "Ongoing") {
                task.status = "Completed";
            } else {
                task.status = "Pending";
            }

            // Re-render the tasks to show the updated status immediately
            displayTasks();
        });

        // Append all elements to the card
        taskCard.appendChild(titleElement);
        taskCard.appendChild(descriptionElement);
        taskCard.appendChild(statusElement);
        taskCard.appendChild(statusBtn);

        // Append the card to the main list container
        taskList.appendChild(taskCard);
    });
}
