let users = [{
    "name": "John Doe",
    "mail": "123@456.com",
    "phone": "12345",
    "pic": "ressources/img/1.jpg",
    "color": "blue",
    "assigned": false,
    "id": 0
}, {
    "name": "Martina Mustermann",
    "mail": "456@123.net",
    "phone": "345346536",
    "pic": "ressources/img/2.jpg",
    "color": "red",
    "assigned": false,
    "id": 1
}, {
    "name": "Anton Müller",
    "mail": "hier@da.de",
    "phone": "9876",
    "pic": "ressources/img/3.jpg",
    "color": "yellow",
    "assigned": false,
    "id": 2
}, {
    "name": "Beate Becker",
    "mail": "123@456.com",
    "phone": "46536",
    "pic": "ressources/img/4.jpg",
    "color": "green",
    "assigned": false,
    "id": 3
}];

let tasks = [];

serverLoad = async() => {
    setURL("http://gruppe-162.developerakademie.net/join/smallest_backend_ever-master");
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem("tasks")) || [];
}

serverSave = async() => {
    await backend.setItem('tasks', JSON.stringify(tasks));
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

initHelp = () => {
    colors();
    includeHTML();
}

urgencySort = (a, b) => {
    if (a.urgency < b.urgency) {
        return -1;
    }
    if (a.urgency > b.urgency) {
        return 1;
    }
    return 0;
}

colors = () => {
    let root = document.documentElement;
    let col = sessionStorage.getItem("mode")
    if (col == "bright") {
        bright(root)
    } else {
        dark(root)
    }
}

changeColors = () => {
    if (sessionStorage.getItem("mode") != null) {
        let col = sessionStorage.getItem("mode")
        if (col == "dark") {
            sessionStorage.setItem("mode", "bright")
            colors();
        } else {
            sessionStorage.setItem("mode", "dark")
            colors();
        }
    } else {
        sessionStorage.setItem("mode", "bright")
        colors();
    }
    colors();
}

bright = (root) => {
    root.style.setProperty('--dark', '#b4a284');
    root.style.setProperty('--medium', '#a2a595');
    root.style.setProperty('--light', '#f6ead4');
    root.style.setProperty('--headerColor', '#bd7f4a');
    root.style.setProperty('--headerFontColor', 'black');
    root.style.setProperty('--mainFontColor', 'black');
    let cssText;
    cssText = document.styleSheets[0].cssRules[3].style.cssText;
    document.styleSheets[0].cssRules[3].style.cssText = cssText.replace("block", "none");
    cssText = document.styleSheets[0].cssRules[4].style.cssText;
    document.styleSheets[0].cssRules[4].style.cssText = cssText.replace("none", "block");
}

dark = (root) => {
    root.style.setProperty('--dark', 'rgb(82, 82, 82)');
    root.style.setProperty('--medium', 'rgb(95, 95, 95)');
    root.style.setProperty('--light', 'rgb(155, 155, 155)');
    root.style.setProperty('--headerColor', 'rgb(48, 48, 48)');
    root.style.setProperty('--headerFontColor', 'white');
    root.style.setProperty('--mainFontColor', 'black');
    let cssText;
    cssText = document.styleSheets[0].cssRules[3].style.cssText;
    document.styleSheets[0].cssRules[3].style.cssText = cssText.replace("none", "block");
    cssText = document.styleSheets[0].cssRules[4].style.cssText;
    document.styleSheets[0].cssRules[4].style.cssText = cssText.replace("block", "none");
}

generateTitle = (user) => {
    return `
${user.name}
${user.mail} 
${user.phone}
`
}

editTask = (taskNr) => {
    createEditWindow(taskNr);
    fillEditWindow(taskNr);
}

fillEditWindow = (taskNr) => {
    let task = tasks[taskNr];
    document.getElementById("editColor").classList = task.urgency;
    document.getElementById("editTitle").value = task.title;
    document.getElementById("editCategory").value = task.category;
    document.getElementById("editDetails").value = task.details;
    document.getElementById("editDate").value = task.date;
    document.getElementById("editUrgency").value = task.urgency;
    document.getElementById("editUsers").innerHTML = null;
    updateEditUsers(taskNr);
    document.getElementById("editSaveBtn").onclick = () => { saveEdit(taskNr) };
    document.getElementById("editDeleteBtn").onclick = () => { showDeleteDialog(taskNr) };
}

updateEditUsers = (taskNr) => {
    let task = tasks[taskNr];
    resetAssigned();
    let editUsers = document.getElementById("editUsers");
    editUsers.innerHTML = null;
    task.users.forEach((user, taskUserNr) => {
        editUsers.innerHTML += `<img title="Remove User" class="editUserPic pointer" src="${user.pic}" style="box-shadow: 1px 1px 5px 1px ${user.color};" onclick="removeEditUser(${taskUserNr},${taskNr})">`;
        users[user.id].assigned = true;
    })
    if (task.users.length < 3) {
        editUsers.innerHTML += `<div class="editAddUserContainer pointer" onclick="generateEditUserArea(${taskNr}),event.stopPropagation()"><div class="editAddUser"></div>`
    }
}

resetAssigned = () => {
    users.forEach(user => {
        user.assigned = false;
    })
}

addEditUser = (taskUserNr, taskNr) => {
    tasks[taskNr].users.push(users[taskUserNr]);
    users[taskUserNr].assigned = true;
    updateEditUsers(taskNr);
    closeEditUserArea();
}

removeEditUser = (taskUserNr, taskNr) => {
    users[tasks[taskNr].users[taskUserNr].id].assigned = false;
    tasks[taskNr].users.splice(taskUserNr, 1);
    updateEditUsers(taskNr);
}

filterFreeUsers = () => {
    return users.filter(free => free.assigned == false)
}

saveEdit = (taskNr) => {
    tasks[taskNr].title = document.getElementById("editTitle").value;
    tasks[taskNr].category = document.getElementById("editCategory").value;
    tasks[taskNr].details = document.getElementById("editDetails").value;
    tasks[taskNr].date = document.getElementById("editDate").value;
    tasks[taskNr].urgency = document.getElementById("editUrgency").value;
    serverSave();
    showSavescreen();
    refreshPage();
}

deleteTask = (taskNr) => {
    tasks.splice(taskNr, 1);
    serverSave();
    closeDeleteDialog();
    showDeletescreen();
    refreshPage();
}

showSavescreen = () => {
    let screen = document.getElementById("screenContainer")
    screen.innerHTML = '<div class="savescreen box-shadow">Task wurde gespeichert!</div>'
    setTimeout(() => { screen.innerHTML = null }, 1500);
}

showDeletescreen = () => {
    let screen = document.getElementById("screenContainer")
    screen.innerHTML = '<div class="savescreen box-shadow">Task wurde gelöscht!</div>'
    setTimeout(() => { screen.innerHTML = null }, 1500);
}

showDeleteDialog = (taskNr) => {
    console.log(taskNr);
    document.getElementById("screenContainer").innerHTML = `
        <div class="deleteDialog box-shadow">
            <div>Wirklich löschen?</div>
            <div class="deleteBtns">
                <button onclick="deleteTask(${taskNr})">Ja</button>
                <button onclick="closeDeleteDialog()">Nein</button>
            </div></div>`
}

closeDeleteDialog = () => {
    document.getElementById("screenContainer").innerHTML = null;
}

closeEditWindow = () => {
    document.getElementById("windowContainer").innerHTML = null;
}

refreshPage = () => {
    setTimeout(() => { location.reload() }, 1500);
}

createEditWindow = () => {
    document.getElementById("windowContainer").innerHTML = `
<div id="editWindow" class="box-shadow">
            <div id="editColor">
            <div id="editContainer">
                <div class="editColumn">
                    <div class="editField">
                        <label class="editLabel">Title</label>
                        <input id="editTitle"></input>
                    </div>
                    <div class="editField">
                        <label class="editLabel">Category</label>
                        <select id="editCategory">
                            <option value="Product">Product</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Management">Management</option>
                            <option value="Sale">Sale</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="editField">
                        <label class="editLabel">Details</label>
                        <textarea id="editDetails"></textarea>
                    </div>
                </div>
                <div class="editColumn">
                    <div class="editField">
                        <label class="editLabel">Due Date</label>
                        <input id="editDate" type="date"></input>
                    </div>
                    <div class="editField">
                        <label class="editLabel">Urgency</label>
                        <select id="editUrgency">
                            <option value="prio1">&#x1F7EA; Very High</option>
                            <option value="prio2">&#x1F7E5; High</option>
                            <option value="prio3">&#x1F7E8; Medium</option>
                            <option value="prio4">&#x1F7E9; Low</option>
                            <option value="prio5">&#x1F7E6; Very Low</option>
                        </select>
                    </div>
                    <div class="editField">
                        <label class="editLabel">Users</label>
                        <div id="editUsers"></div>
                    </div>
                </div>
                </div>
                <div class="editBtns">
                    <button id="editSaveBtn" class="button" onclick="saveEdit()">Save</button>
                    <button id="editDeleteBtn" class="button" onclick="showDeleteDialog()">Delete</button>
                    <button id="editCloseBtn" class="button" onclick="closeEditWindow()">Close</button>
                </div>
            </div>
        </div>
    </div>`
}

generateEditUserArea = (taskNr) => {
    let screen = document.getElementById("screenContainer");
    let freeUsers = filterFreeUsers();
    let UserAreaString = `<div id="editUserArea" class="user_area box-shadow">`;
    freeUsers.forEach((user, i) => {
        UserAreaString += `<div class="usercard" onclick="addEditUser(${users.indexOf(user)},${taskNr}), event.stopPropagation()">
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
    let editUserArea = document.getElementById("editUserArea");
    document.addEventListener('click', (event) => {
        if (!editUserArea.contains(event.target)) { closeEditUserArea() }
    }, { once: true })
}

closeEditUserArea = () => {
    document.getElementById("screenContainer").innerHTML = null;
}