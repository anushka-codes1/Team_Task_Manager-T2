//Feature 1: Task Creation (Anushka)
const tasks = []; //Array which stores tasks
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const addTaskBtn = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const completedTaskList = document.getElementById("completedTaskList");
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
    taskList.innerHTML = ""; // Clear current active list
    completedTaskList.innerHTML = ""; // Clear current completed list

    // Loop through the tasks array to create cards for each task
    tasks.forEach((task) => {
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
        statusBtn.classList.add("status-btn"); // Add a class for styling

        // Check if task is completed to determine button state and location
        if (task.status === "Completed") {
            statusBtn.innerText = "Completed";
            statusBtn.disabled = true; // Disable the button so it cannot be changed
            statusBtn.style.backgroundColor = "grey"; // Visual cue that it's disabled
            statusBtn.style.cursor = "not-allowed";

            // Append all elements to the card
            taskCard.appendChild(titleElement);
            taskCard.appendChild(descriptionElement);
            taskCard.appendChild(statusElement);
            taskCard.appendChild(statusBtn);

            // Add to the completed list section
            completedTaskList.appendChild(taskCard);
        } else {
            statusBtn.innerText = "Update Status";

            // Add event listener to handle status changes only if not completed
            statusBtn.addEventListener("click", function () {
                // Logic to cycle through statuses: Pending -> Ongoing -> Completed
                if (task.status === "Pending") {
                    task.status = "Ongoing";
                } else if (task.status === "Ongoing") {
                    task.status = "Completed";
                }

                // Re-render the tasks to show the updated status
                displayTasks();
            });

            // Append all elements to the card
            taskCard.appendChild(titleElement);
            taskCard.appendChild(descriptionElement);
            taskCard.appendChild(statusElement);
            taskCard.appendChild(statusBtn);

            // Add to the active task list section
            taskList.appendChild(taskCard);
        }
    });
}
