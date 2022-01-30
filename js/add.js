let userArea;
let addedUsers;
let currentUsers = [];
let tasks = [];

init = () => {
    includeHTML();
    serverLoad();
    userArea = document.getElementById("addUserArea");
    addedUsers = document.getElementById("addedUsers");
    fillAddUserArea();
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
}

saveTask = () => {
    let task = {
        "status": "backlog",
        "boardStatus": "todo",
        "title": document.getElementById("title").value,
        "category": document.getElementById("category").value,
        "details": document.getElementById("details").value,
        "date": document.getElementById("date").value,
        "urgency": document.getElementById("urgency").value,
        "users": currentUsers
    }
    tasks.push(task);
    serverSave();
    clearTask();
}

fillAddUserArea = () => {
    users.forEach((user, i) => {
        userArea.innerHTML += `<div class="usercard" style="background-color:${user.color};">
                                <div class="userinfo">
                                    <img class="userpic" src=${user.picture} ">
                                    <div class="userdata">
                                        <div class="username">${user.name}</div>
                                        <div>
                                            <div class="userdetail">Email: ${user.email}</div>
                                            <div class="userdetail">Phone: ${user.phone}</div>
                                        </div>
                                    </div>
                                    <div class="addUser" onclick="addUser(${i})"></div>
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
    closeUserArea();
    updateAddedUsers();
}

removeUser = (i) => {
    currentUsers.splice(i, 1);
    updateAddedUsers();
}

updateAddedUsers = () => {
    addedUsers.innerHTML = null;
    currentUsers.forEach((user, i) => {
        addedUsers.innerHTML += `<img title"Remove User" class="userpic pointer"src="${user.picture}" style="border: 3px solid ${user.color};" onclick="removeUser(${i})">`
    })
    addedUsers.innerHTML += `<div class="addUser" onclick="openUserArea()"></div>`
}