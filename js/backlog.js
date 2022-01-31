let backlog;

async function loadBacklog() {
    includeHTML();
    setURL("http://gruppe-162.developerakademie.net/join/smallest_backend_ever-master");
    await downloadFromServer();
    tasks = await JSON.parse(backend.getItem("tasks"));
    backlog = document.getElementById(`backlog`);
    generateBacklog2();
}



generateBacklog = () => {
    tasks.forEach((task) => {
        backlog.innerHTML += `
    <div class="memberColor" style="background-color:${task.users[0].color}">
    <div class="memberBox">
        <div class="memberImgAndProfil">
             <div class="memberImg"><img class="memberImg" src="${task.users[0].pic}" style="box-shadow: 1px 1px 5px 1px ${task.users[0].color}"</img></div>
              <div class="memberProfil">
                <span class="memberName">${task.users[0].name}</span>
                <span class="memberEmail">${task.users[0].mail}</span>
                <span class="memberPhone">tel. Nr: ${task.users[0].phone}</span>
              </div>
        </div>
        <div class="category">${task.category}</div>
        <div class="details">${task.details}</div>
    </div>
</div>
`;
    })
}

generateBacklog2 = () => {
    backlog.innerHTML = null;
    tasks.forEach((task, i) => {
        backlog.innerHTML += `
<div class="taskMain ${task.urgency}">
    <div class="taskTop">
        <div id="categoryTask${i}" class="taskCategory">${task.category}</div>
        <div id="titleTask${i}" class="taskTitle">${task.title}</div>
        <div id="dateTask${i}" class="taskDate">${task.date}</div>
    </div>
    <div class="taskBottom">
        <div id="detailsTask${i}" class="taskDetails">${task.details}</div>
        <div id="assignedTask${i}" class="taskUsers">` +
            getUsersBacklog(task) + `
        </div>
    </div>
<div>`
    })
}

getUsersBacklog = (element) => {
    let userPicString = "";
    element.users.forEach((user) =>
        userPicString += `<img class="memberImg" src="${user.pic}">`)
    return userPicString;
}