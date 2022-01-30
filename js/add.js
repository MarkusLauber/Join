let userArea;
let addedUsers;
let currentUsers = [];

init = () => {
    includeHTML();
    serverLoad();
    userArea = document.getElementById("userArea");
    addedUsers = document.getElementById("addedUsers");
    updateUserArea();
}

getDate = () => {}

clearTask = () => {
    document.getElementById("title").value = null;
    document.getElementById("category").value = "Product";
    document.getElementById("details").value = null;
    document.getElementById("date").value = null;
    document.getElementById("urgency").value = "High";
    currentUsers = [];
    updateAddedUsers();
    users.forEach((user) => { user.assigned = false })
    updateUserArea();
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
    showTaskSave();
    clearTask();
}

showTaskSave = () => {
    let savescreen = document.getElementById("savescreen");
    savescreen.classList.remove("hide");
    setTimeout(() => { savescreen.classList.add("hide") }, 1500);
}

updateUserArea = () => {
    let freeUsers = filterFreeUsers();
    userArea.innerHTML = null;
    freeUsers.forEach((user, i) => {
        userArea.innerHTML += `<div class="usercard" onclick="addUser(${users.indexOf(user)})" style="background-color:${user.color};">
                                <div class="userinfo">
                                    <img class="userpic" src=${user.pic} ">
                                    <div class="userdata">
                                        <div class="username">${user.name}</div>
                                        <div>
                                            <div class="userdetail">Email: ${user.mail}</div>
                                            <div class="userdetail">Phone: ${user.phone}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
    })
}

openUserArea = () => {
    userArea.classList.remove("hide");
}

closeUserArea = () => {
    userArea.classList.add("hide");
}

addUser = (i) => {
    currentUsers.push(users[i]);
    users[i].assigned = true;
    closeUserArea();
    updateAddedUsers();
    updateUserArea();
}

removeUser = (i, j) => {
    currentUsers.splice(i, 1);
    users[j].assigned = false;
    updateAddedUsers();
    updateUserArea();
}

updateAddedUsers = () => {
    addedUsers.innerHTML = null;
    currentUsers.forEach((user, i) => {
        addedUsers.innerHTML += `<img title"Remove User" class="userpic pointer"src="${user.pic}" style="border: 3px solid ${user.color};" onclick="removeUser(${i},${users.indexOf(user)})">`
    })
    if (currentUsers.length < 3) {
        addedUsers.innerHTML += `<div class="addUser" onclick="openUserArea()"></div>`
    }
}

filterFreeUsers = () => {
    return users.filter(free => free.assigned == false)
}