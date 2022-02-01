let backlogContainer;
let backlog

async function loadBacklog() {
    includeHTML();
    setURL("http://gruppe-162.developerakademie.net/join/smallest_backend_ever-master");
    await downloadFromServer();
    tasks = await JSON.parse(backend.getItem("tasks"));
    backlogContainer = document.getElementById(`backlog`);
    generateBacklog();
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
    <div id="details${i}" onClick="openDetails(${i})" class="taskBottom">
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

openDetails = (i) => {
    document.getElementById(`details`).classList.remove("hide");


}

getUsersBacklog = (element) => {
    let userPicString = "";
    element.users.forEach((user) =>
        userPicString += `<img class="memberImg" onmouseover="hover()" title="` + generateTitle(user) + `" src="${user.pic}" style="box-shadow: 1px 1px 5px 1px ${user.color}">`)
    return userPicString;
}


hover = () => {
    console.log("hallo")
}

generateTitle = (user) => {
    return `
${user.name}
${user.mail} 
${user.phone}
`;

}