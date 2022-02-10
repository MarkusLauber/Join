let userArea;
let addedUsers;
let currentUsers = [];

/**
 * Initialisation of Add-Page
 */
addInit = () => {
    colors();
    includeHTML();
    serverLoad();
    userArea = document.getElementById("userArea");
    addedUsers = document.getElementById("addedUsers");
    updateAddedUsers();
}

/**
 * Reset Inputfields to null/default
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
 * Saves Input to Server
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
 * Updates User Area about assigned Users
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
 * Creates String with Userinformation
 * @param {object} user - User JSON
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
            </div></div></div></div>`
}

/**
 * Show/Updates assigned Users and Add Button
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
 * Closes UserArea
 */
closeUserArea = () => {
    document.getElementById("screenContainer").innerHTML = null;
}

/**
 * Adds a User to Task
 * @param {number} i - Index of User in Users-Array
 */
addUser = (i) => {
    currentUsers.push(users[i]);
    users[i].assigned = true;
    closeUserArea();
    updateAddedUsers();
}

/**
 * Removes a User from Task
 * @param {number} i - Index of User in Tasks.Users-Array
 * @param {number} j - Index of User in Users-Array
 */
removeUser = (i, j) => {
    currentUsers.splice(i, 1);
    users[j].assigned = false;
    updateAddedUsers();
}

/**
 * Checks if all fields are filled
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
 * Shows Window to fill all Inputfields
 */
showFillscreen = () => {
    let screen = document.getElementById("screenContainer")
    screen.innerHTML = '<div class="savescreen box-shadow">Bitte füllen Sie die Eingabefelder aus.</div>'
    setTimeout(() => { screen.innerHTML = null }, 1500);
}