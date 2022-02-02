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

    document.getElementById(`categoryInfo`).innerHTML = `<em>Category</em> - ${task.category}`
    for (let i = 0; i < task.users.length; i++) {

        document.getElementById("userDetailed").innerHTML += `
        <div class="memberInfo">
        <img id="detailedImg${i}" class="memberImg big"  src="${task.users[i].pic}" style="box-shadow: 1px 1px 5px 1px ${task.users[i].color}">
        <div>
        <span class="infoUser"><b>Name:</b> ${task.users[i].name}</span> <span class="infoUser"><b>tel.Nr:</b> ${task.users[i].phone}</span> <span class="infoUser"><b>E-mail:</b> ${task.users[i].mail}</span>
        </div>


        `
    };

    document.getElementById(`fullText`).innerHTML = `<p>${task.details}<p>`;
}

getUsersBacklog = (element) => {
    let userPicString = "";
    element.users.forEach((user) =>
        userPicString += `<img class="memberImg" title="` + generateTitle(user) + `" src="${user.pic}" style="box-shadow: 1px 1px 5px 1px ${user.color}">`)
    return userPicString;
}


closeDetails = () => {

    document.getElementById(`backgroundDetails`).classList = "fadeOut";
    document.getElementById(`detailsWindow`).classList.add("hide");
}

clearDetails = () => {
    document.getElementById("userDetailed").innerHTML = null;
}


generateTitle = (user) => {
    return `
${user.name}
${user.mail} 
${user.phone}
`;

}