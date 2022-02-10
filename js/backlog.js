let backlogContainer;
let backlog

/**
 * Initiale Backlog-Page
 */
async function loadBacklog() {
    await serverLoad();
    colors();
    includeHTML();
    backlogContainer = document.getElementById(`backlog`);
    setTimeout(generateBacklog, 100);
}

/**
 * Generate Backlog-Page
 */
generateBacklog = () => {
    backlogContainer.innerHTML = null;
    let backlog = tasks.filter(item => item.status == 'backlog');
    backlog.sort(urgencySort);
    backlog.forEach((task, i) => {
        backlogContainer.innerHTML += `

<div id="${tasks.indexOf(task)}" class="taskMain ${task.urgency}">
    <div class="taskTop">
        <div id="categoryTask${i}" class="taskCategory">${task.category}</div>
        <div id="titleTask${i}" class="taskTitle">${task.title}</div>
        <div id="dateTask${i}" class="taskDate">${task.date}</div>
    </div>
    <div id="details${i}" onClick="openDetails(${tasks.indexOf(task)})" class="taskBottom">
        <div class="taskDetails">
        <div id="detailsTask${i}" class="innerTaskDetails">${task.details}</div>
        </div>
        <div id="assignedTask${i}" class="taskUsers">` +
            getUsersBacklog(task) + `
        </div>
    </div>
<div>`
    })
}

/**
 * Open Details
 * @param {number} x - Index of Tasks
 */
openDetails = (x) => {
    let task = tasks[x];
    clearDetails();
    document.getElementById(`backgroundDetails`).classList = "fadeIn";
    document.getElementById(`detailsWindow`).classList.remove("hide");
    document.getElementById(`detailsWindow`).classList.remove("fade_out");
    document.getElementById(`deadline`).innerHTML = `<div id="date" class="date"><b>DEADLINE:  </b>   ${tasks[x].date}</div>`;
    document.getElementById(`categoryInfo`).innerHTML = `
    <div class=categoryInfo><em>Category</em> - ${task.category}</div>
    <div id="prioEditing" class=prioEdit>${tasks[x].urgency}</div> 
    `;
    "editingTaskOnBacklog(${x})"
    for (let i = 0; i < task.users.length; i++) {
        document.getElementById("userDetailed").innerHTML += `
        <div id="infoUser${i}" class="memberInfo">
        <img id="detailedImg${i}" class="memberImg big"  src="${task.users[i].pic}" style="box-shadow: 1px 1px 5px 1px ${task.users[i].color}">
        <div>
        <span id="deleteUser${i}" onClick="deleteUserInEditmode(${i})" class="hide">X</Span>
        </div>
        `
        document.getElementById("pushBtn").onclick = () => { pushToTaskBoard(x) };
    };

    document.getElementById(`fullText`).innerHTML = `<p id="editableText" contenteditable="false">${task.details}<p>`;
    document.getElementById(`btnSection`).innerHTML = `
    <div id="editCon"><button id="editing" class="backlogButton" onClick="editTask(${x})">edit</button></div>
    `
}

/**
 * Genrate Userstring
 * @param {object} element - Tasks.Users Array
 */
getUsersBacklog = (element) => {
    let userPicString = "";
    element.users.forEach((user) =>
        userPicString += `<img class="memberImg" title="` + generateTitle(user) + `" src="${user.pic}" style="box-shadow: 1px 1px 5px 1px ${user.color}">`)
    return userPicString;
}

/**
 * Closes the details-container.
 */
closeDetails = () => {
    document.getElementById(`backgroundDetails`).classList = ("fade_out");
    window.setTimeout(function() {
        document.getElementById(`backgroundDetails`).classList = ("hide");
    }, 200);
    document.getElementById(`detailsWindow`).classList.add("fade_out");
}

/**
 * Clears the details-container.
 */
clearDetails = () => {
    document.getElementById("userDetailed").innerHTML = null;
}

/**
 * push the task from backlog to the draganddrop Area in toDo. 
 * @param {number} x - Index of Tasks 
 */
pushToTaskBoard = (x) => {
    tasks[x].status = "toDo";
    serverSave();
    generateBacklog();
    closeDetails();
}