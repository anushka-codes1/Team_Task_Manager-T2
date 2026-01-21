//Feature 1: Task Creation (Anushka)
const tasks=[]; //Array which stores tasks
const taskTitle=document.getElementById("taskTitle");
const taskDescription=document.getElementById("taskDescription");
const addTaskBtn=document.getElementById("addTaskButton");
addTaskBtn.addEventListener("click",function(){ //Adding the task event
    const title=taskTitle.value.trim();
    const description=taskDescription.value.trim();

    if (title===""){ //Validating title
        alert("Task title is required!");
        return;
    }

    const task= { //Creating the task object
        title: title,
        description: description,
        status: "Pending"
    }

    tasks.push(task); //Storing the task

    taskTitle.value=""; //Clearing task input value
    taskDescription.value=""; //Clearing task description input value

    console.log("Task added:", task); //Task created only, display logic handled in another feature
    console.log("All Tasks:", tasks);

});
