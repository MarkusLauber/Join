let userArea;
let addedUsers;
let currentUsers = [];


/**
 * Initialisation
 */
init = () => {
    colors();
    includeHTML();
    serverLoad();
    userArea = document.getElementById("userArea");
    addedUsers = document.getElementById("addedUsers");
    updateAddedUsers();
}

/**
 * Set Inpultfields to  null / default
 */
clearTask = () => {
    document.getElementById("title").value = null;
    document.getElementById("category").value = "Product";
    document.getElementById("details").value = null;
    document.getElementById("date").value = null;
    document.getElementById("urgency").value = "prio2";
    currentUsers = [];
    users.forEach((user) => { user.assigned = false })
    updateAddedUsers();
}

/**
 * Saves Inpult to Server
 */
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

/**
 * updates User Area about assigned Users
 */
generateUserArea = () => {
    let screen = document.getElementById("screenContainer");
    let freeUsers = filterFreeUsers();
    let UserAreaString = `<div id="userArea" class="user_area box-shadow">`;
    freeUsers.forEach((user) => {
        UserAreaString += userString(user)
    })
    UserAreaString += "</div>"
    screen.innerHTML = UserAreaString;
    let userArea = document.getElementById("userArea");
    document.addEventListener('click', (event) => {
        if (!userArea.contains(event.target)) { closeUserArea() }
    }, { once: true })
}

/**
 * creates String with Userinformation
 */
userString = (user) => {
    return `<div class="usercard" onclick="addUser(${users.indexOf(user)})">
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
}

/**
 * show/updates assigned Users and Add Button
 */
updateAddedUsers = () => {
    addedUsers.innerHTML = null;
    currentUsers.forEach((user, i) => {
        addedUsers.innerHTML += `<img title"Remove User" class="userpic pointer"src="${user.pic}" style="box-shadow: 1px 1px 5px 1px ${user.color};" onclick="removeUser(${i},${users.indexOf(user)})">`
    })
    if (currentUsers.length < 3) {
        addedUsers.innerHTML += `<div class="addUserContainer pointer" onclick="generateUserArea(), event.stopPropagation()"><div class="addUser"></div>`
    }
}

/**
 * closes UserArea
 */
closeUserArea = () => {
    document.getElementById("screenContainer").innerHTML = null;
}

/**
 * adds a User to Task
 */
addUser = (i) => {
    currentUsers.push(users[i]);
    users[i].assigned = true;
    closeUserArea();
    updateAddedUsers();
}

/**
 * removes a User from Task
 */
removeUser = (i, j) => {
    currentUsers.splice(i, 1);
    users[j].assigned = false;
    updateAddedUsers();
}

/**
 * chechs if all fields are filled
 */
allFilled = () => {
    if ((document.getElementById("title").value.length == 0) ||
        (document.getElementById("details").value.length == 0) ||
        (document.getElementById("date").value.length == 0) ||
        (currentUsers.length == 0)) {
        showFillscreen();
    } else { saveTask() }
}

/**
 * shows window to fill all inputfields
 */
showFillscreen = () => {
    let screen = document.getElementById("screenContainer")
    screen.innerHTML = '<div class="savescreen box-shadow">Bitte füllen Sie die Eingabefelder aus.</div>'
    setTimeout(() => { screen.innerHTML = null }, 1500);
}