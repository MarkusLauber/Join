let backlogContainer;
let backlog


async function loadBacklog() {
    await serverLoad();
    colors();
    includeHTML();
    backlogContainer = document.getElementById(`backlog`);
    setTimeout(generateBacklog, 100);
    editTask(0);

}

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

function deleteUserInEditmode(i) {
    document.getElementById(`infoUser${i}`).innerHTML = ``
};

function editingTaskOnBacklog(x) {
    let task = tasks[x];
    let deleteBtn = document.getElementById(`editing`);
    deleteBtn.remove();
    let saveBtn = document.getElementById(`editCon`);
    saveBtn.innerHTML = `
    <button id="addUser" class="editAddBtn" onClick="addUserOnEdit()">add User</button>
    <button class="editBtn" onClick="saveEditedTaskOnBacklog(${x})">save</button>`;
    showXMark(task);
    editUrgency(task);
    textEditable();
}

function addUserOnEdit() {
    document.getElementById('addUser').innerHTML = `
    <select name="addingUser" id="selectingUser" placeholder="add User">
    <Option value="
    </select
    `
}

function showXMark(task) {
    for (let i = 0; i < task.users.length; i++) {
        document.getElementById("deleteUser" + i).classList.remove('hide');
        document.getElementById("deleteUser" + i).classList.add('deleteUser');
    }
}

function editUrgency(task) {
    document.getElementById(`prioEditing`).innerHTML = `
    <select name="prio" id="urgence">
    <option value="prio1">Very High</option>
    <option value="prio2">High</option>
    <option value="prio3">Medium</option>
    <option value="prio4">Low</option>
    <option value="prio5">Very Low</option>
    </select>`;
    document.getElementById(`urgence`).value = task.urgency;
}

function textEditable() {
    let newText = document.getElementById('editableText');
    newText.contentEditable = "true";
}

getUsersBacklog = (element) => {
    let userPicString = "";
    element.users.forEach((user) =>
        userPicString += `<img class="memberImg" title="` + generateTitle(user) + `" src="${user.pic}" style="box-shadow: 1px 1px 5px 1px ${user.color}">`)
    return userPicString;
}

closeDetails = () => {
    document.getElementById(`backgroundDetails`).classList = ("fade_out");
    window.setTimeout(function() {
        document.getElementById(`backgroundDetails`).classList = ("hide");
    }, 200);
    document.getElementById(`detailsWindow`).classList.add("fade_out");
}

clearDetails = () => {
    document.getElementById("userDetailed").innerHTML = null;
}

pushToTaskBoard = (x) => {
    tasks[x].status = "toDo";
    serverSave();
    generateBacklog();
    closeDetails();
}