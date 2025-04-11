document.addEventListener("DOMContentLoaded",loadTasks);

const taskinput = document.getElementById("taskInput");
const addTaskBtn=document.getElementById("addTaskBtn");
const taskList=document.getElementById("taskList");

addTaskBtn.addEventListener("click",addTask);
taskinput.addEventListener("keypress",function(event){
    if(event.key === "Enter") addTask();
});

function addTask(){
    const taskText = taskinput.value.trim();
    if (taskText === "") return;

    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);
    saveTask(taskText);

    taskinput.value="";
}

function createTaskElement(taskText){
    const li = document.createElement("li");
    const span =document.createElement("span");
    span.textContent=taskText;
    span.addEventListener("click",()=>{
        span.classList.toggle("completed");
        updateTaskStatus(taskText);
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent="Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click",()=>{
        li.remove();
        removeTask(taskText);

    });
    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
}
function saveTask(taskText){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({text : taskText, completed:false});
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function removeTask(taskText){
    let task = JSON.parse(localStorage.getItem("tasks"));
    task = task.filter(task => task.task != taskText);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function updateTaskStatus(taskText){
    let tasks=JSON.parse(localStorage.getItem("tasks"));
    tasks=tasks.map(task=>{
        if(task.text === taskText) task.completed != task.completed;
        return task;
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks(){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text);
        if(task.completed)taskItem.querySelector("span").classList.add("completed");
        taskList.appendChild(taskItem);
    });
}