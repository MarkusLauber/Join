let userArea;
let addedUsers;
let currentUsers = [];

init = () => {
    colors();
    includeHTML();
    serverLoad();
    userArea = document.getElementById("userArea");
    addedUsers = document.getElementById("addedUsers");
    updateUsers();
}

clearTask = () => {
    document.getElementById("title").value = null;
    document.getElementById("category").value = "Product";
    document.getElementById("details").value = null;
    document.getElementById("date").value = null;
    document.getElementById("urgency").value = "prio2";
    currentUsers = [];
    users.forEach((user) => { user.assigned = false })
    updateUsers();
}

saveTask = () => {
    let task = {
        "status": "backlog",
        "title": document.getElementById("title").value,
        "category": document.getElementById("category").value,
        "details": document.getElementById("details").value,
        "date": document.getElementById("date").value,
        "urgency": document.getElementById("urgency").value,
        "users": currentUsers
    }
    tasks.push(task);
    serverSave();
    showSavescreen();
    clearTask();
}

updateUsers = () => {
    updateAddedUsers();
}

generateUserArea = () => {
    let screen = document.getElementById("screenContainer");
    let freeUsers = filterFreeUsers();
    let UserAreaString = `<div id="userArea" class="user_area box-shadow">`;
    freeUsers.forEach((user, i) => {

        UserAreaString += `<div class="usercard" onclick="addUser(${users.indexOf(user)})">
                                <div class="userinfo">
                                    <img class="userpic" src="${user.pic}" style="box-shadow: 1px 1px 5px 1px ${user.color}">
                                    <div class="userdata">
                                        <div class="username">${user.name}</div>
                                        <div>
                                            <div class="userdetail"><span class="dark">Email: </span>${user.mail}</div>
                                            <div class="userdetail"><span class="dark">Phone: </span>${user.phone}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
    })
    UserAreaString += "</div>"
    screen.innerHTML = UserAreaString;
    let userArea = document.getElementById("userArea");
    document.addEventListener('click', (event) => {
        if (!userArea.contains(event.target)) { closeUserArea() }
    }, { once: true })
}

updateAddedUsers = () => {
    addedUsers.innerHTML = null;
    currentUsers.forEach((user, i) => {
        addedUsers.innerHTML += `<img title"Remove User" class="userpic pointer"src="${user.pic}" style="box-shadow: 1px 1px 5px 1px ${user.color};" onclick="removeUser(${i},${users.indexOf(user)})">`
    })
    if (currentUsers.length < 3) {
        addedUsers.innerHTML += `<div class="addUserContainer pointer" onclick="generateUserArea(), event.stopPropagation()"><div class="addUser"></div>`
    }
}

closeUserArea = () => {
    document.getElementById("screenContainer").innerHTML = null;
}

addUser = (i) => {
    currentUsers.push(users[i]);
    users[i].assigned = true;
    closeUserArea();
    updateAddedUsers();
}

removeUser = (i, j) => {
    currentUsers.splice(i, 1);
    users[j].assigned = false;
    updateAddedUsers();
}