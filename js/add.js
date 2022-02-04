let userArea;
let addedUsers;
let currentUsers = [];

init = () => {
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
    updateUserArea();
    updateAddedUsers();
}

updateUserArea = () => {
    let freeUsers = filterFreeUsers();
    userArea.innerHTML = null;
    freeUsers.forEach((user, i) => {
        userArea.innerHTML += `<div class="usercard" onclick="addUser(${users.indexOf(user)})">
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
}

updateAddedUsers = () => {
    addedUsers.innerHTML = null;
    currentUsers.forEach((user, i) => {
        addedUsers.innerHTML += `<img title"Remove User" class="userpic pointer"src="${user.pic}" style="box-shadow: 1px 1px 5px 1px ${user.color};" onclick="removeUser(${i},${users.indexOf(user)})">`
    })
    if (currentUsers.length < 3) {
        addedUsers.innerHTML += `<div class="addUserContainer pointer" onclick="openUserArea(), event.stopPropagation()"><div class="addUser"></div>`
    }
}

openUserArea = () => {
    userArea.classList.remove("hide");
    document.addEventListener('click', (event) => {
        if (!userArea.contains(event.target)) { closeUserArea() }
    })
}

closeUserArea = () => {
    userArea.classList.add("hide");
    document.removeEventListener('click', (event) => {
        if (!userArea.contains(event.target)) { closeUserArea() }
    })
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

filterFreeUsers = () => {
    return users.filter(free => free.assigned == false)
}