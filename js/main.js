let users = [{
    "name": "John Doe",
    "mail": "123@456.com",
    "phone": "12345",
    "pic": "ressources/img/1.jpg",
    "color": "blue",
    "assigned": false
}, {
    "name": "Martina Mustermann",
    "mail": "456@123.net",
    "phone": "345346536",
    "pic": "ressources/img/2.jpg",
    "color": "red",
    "assigned": false
}, {
    "name": "Anton Müller",
    "mail": "hier@da.de",
    "phone": "9876",
    "pic": "ressources/img/3.jpg",
    "color": "yellow",
    "assigned": false
}, {
    "name": "Beate Becker",
    "mail": "123@456.com",
    "phone": "46536",
    "pic": "ressources/img/4.jpg",
    "color": "green",
    "assigned": false
}]

let tasks = [];
let colors = false;
let editID = null;

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

urgencySort = (a, b) => {
    if (a.urgency < b.urgency) {
        return -1;
    }
    if (a.urgency > b.urgency) {
        return 1;
    }
    return 0;
}

changeColors = () => {
    let root = document.documentElement;
    if (!colors) {
        bright(root)
    } else {
        dark(root)
    }
}

bright = (root) => {
    root.style.setProperty('--dark', '#b4a284');
    root.style.setProperty('--medium', '#a2a595');
    root.style.setProperty('--light', '#f6ead4');
    root.style.setProperty('--headerColor', '#bd7f4a');
    root.style.setProperty('--headerFontColor', 'black');
    root.style.setProperty('--mainFontColor', 'black');
    colors = true;
}

dark = (root) => {
    root.style.setProperty('--dark', 'rgb(82, 82, 82)');
    root.style.setProperty('--medium', 'rgb(95, 95, 95)');
    root.style.setProperty('--light', 'rgb(155, 155, 155)');
    root.style.setProperty('--headerColor', 'rgb(48, 48, 48)');
    root.style.setProperty('--headerFontColor', 'white');
    root.style.setProperty('--mainFontColor', 'black');
    colors = false;
}



generateTitle = (user) => {
    return `
${user.name}
${user.mail} 
${user.phone}
`
}

editTask = (x) => {
    createEditWindow(x);
    fillEditWindow(x);
}

fillEditWindow = (x) => {
    let task = tasks[x];
    document.getElementById("editColor").classList = task.urgency;
    document.getElementById("editTitle").value = task.title;
    document.getElementById("editCategory").value = task.category;
    document.getElementById("editDetails").value = task.details;
    document.getElementById("editDate").value = task.date;
    document.getElementById("editUrgency").value = task.urgency;
    document.getElementById("editUsers").innerHTML = null;
    updateEditUsers(x);
    document.getElementById("editSaveBtn").onclick = () => { saveEdit(x) };
    document.getElementById("editDeleteBtn").onclick = () => { showDeleteDialog(x) };
}

updateEditUsers = (x) => {
    let task = tasks[x];
    let editUsers = document.getElementById("editUsers");
    editUsers.innerHTML = null;
    task.users.forEach((user, i) => {
        editUsers.innerHTML += `<img title="Remove User" class="editUserPic pointer" src="${user.pic}" style="box-shadow: 1px 1px 5px 1px ${user.color};" onclick="removeUser(${i},${users.indexOf(user)})">`;
        // users[users.indexOf(user)].assigned = true;
    })
    if (task.users.length < 3) {
        editUsers.innerHTML += `<div class="editAddUserContainer pointer" onclick="event.stopPropagation()"><div class="editAddUser"></div>`
    }
}

removeEditUser = (a, b) => {

}

giveIndex = (user) => {
    users.forEach((item, i) => {
        if (user == item.name) { return i } else { return false };
    })
}

saveEdit = (x) => {
    tasks[x].title = document.getElementById("editTitle").value;
    tasks[x].category = document.getElementById("editCategory").value;
    tasks[x].details = document.getElementById("editDetails").value;
    tasks[x].date = document.getElementById("editDate").value;
    tasks[x].urgency = document.getElementById("editUrgency").value;
    serverSave()
    showSavescreen();
    refreshPage();
}

deleteTask = (x) => {
    tasks.splice(x, 1);
    console.log(tasks);
    serverSave();
    closeDeleteDialog();
    showDeletescreen();
    refreshPage();
}

showSavescreen = () => {
    let windowContainer = document.getElementById("windowContainer")
    windowContainer.innerHTML = '<div class="savescreen box-shadow">Task wurde gespeichert!</div>'
    setTimeout(() => { windowContainer.innerHTML = null; }, 1500);
}

showDeletescreen = () => {
    let windowContainer = document.getElementById("windowContainer")
    windowContainer.innerHTML = '<div class="savescreen box-shadow">Task wurde gelöscht!</div>'
    setTimeout(() => { windowContainer.innerHTML = null; }, 1500);
}

showDeleteDialog = (x) => {
    document.getElementById("windowContainer").innerHTML = `
        <div class="deleteDialog box-shadow">
            <div>Wirklich löschen?</div>
            <div class="deleteBtns">
                <button onclick="deleteTask(${x})">Ja</button>
                <button onclick="closeDeleteDialog()">Nein</button>
            </div></div>`
}

closeDeleteDialog = () => {
    document.getElementById("windowContainer").innerHTML = null;
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
                        <label>Title</label>
                        <input id="editTitle"></input>
                    </div>
                    <div class="editField">
                        <label>Category</label>
                        <select id="editCategory">
                            <option value="Product">Product</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Management">Management</option>
                            <option value="Sale">Sale</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="editField">
                        <label>Details</label>
                        <textarea id="editDetails"></textarea>
                    </div>
                </div>
                <div class="editColumn">
                    <div class="editField">
                        <label>Due Date</label>
                        <input id="editDate" type="date"></input>
                    </div>
                    <div class="editField">
                        <label>Urgency</label>
                        <select id="editUrgency">
                            <option value="prio1">&#x1F7EA;Very High</option>
                            <option value="prio2">&#x1F7E5;High</option>
                            <option value="prio3">&#x1F7E8;Medium</option>
                            <option value="prio4">&#x1F7E9;Low</option>
                            <option value="prio5">&#x1F7E6;Very Low</option>
                        </select>
                    </div>
                    <div class="editField">
                        <label>Users</label>
                        <div id="editUsers"></div>
                    </div>

                </div>
                </div>
                <div class="editBtns">
                    <button id="editSaveBtn" class="editBtn2" onclick="saveEdit()">Save</button>
                    <button id="editDeleteBtn" class="editBtn2" onclick="showDeleteDialog()">Delete</button>
                    <button id="editCloseBtn" class="editBtn2" onclick="closeEditWindow()">Close</button>
                </div>
            </div>
        </div>
    </div>`
}