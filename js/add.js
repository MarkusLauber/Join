let task = {
    "status": "backlog",
    "list": "todo",
    "title": "",
    "category": "",
    "description": "",
    "date": "",
    "urgency": "",
    "users": []
}
let userArea;
let addedUsers;
let currentUsers = [];

init = () => {
    setURL("http://gruppe-162.developerakademie.net/join/smallest_backend_ever-master");
    userArea = document.getElementById("addUserArea");
    addedUsers = document.getElementById("addedUsers");
    fillAddUserArea();
}

getDate = () => {}

clearTask = () => {
    document.getElementById("title").value = null;
    document.getElementById("category").value = "Product";
    document.getElementById("description").value = null;
    document.getElementById("date").value = null;
    document.getElementById("urgency").value = "High";
    document.getElementById("description").value = null;
    currentUsers = [];
    updateAddedUsers();
}

saveTask = () => {
    task.title = document.getElementById("title").value;
    task.category = document.getElementById("category").value;
    task.description = document.getElementById("description").value;
    task.date = document.getElementById("date").value;
    task.urgency = document.getElementById("urgency").value;
    task.users = currentUsers;
    saveToServer();
}

saveToServer = async() => {
    await backend.setItem('tasks', JSON.stringify(task));
    alert("Task wurde gespeichert");
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