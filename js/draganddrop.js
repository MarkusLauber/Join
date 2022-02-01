let currentDraggedElement;

startTasks = () => {
    serverLoad();
    includeHTML();
    setTimeout(updateDragAndDropArea, 50)
}

updateDragAndDropArea = () => {
    enableToDo();
    enableInProgress();
    enableTesting();
    enableDone();
}

enableToDo = () => {
    let toDo = tasks.filter(filterTask => filterTask.status == 'toDo');

    document.getElementById('toDo').innerHTML = '';

    for (let i = 0; i < toDo.length; i++) {
        const element = toDo[i];
        document.getElementById('toDo').innerHTML += generateTask(element);
    }
}

enableInProgress = () => {
    let inProgress = tasks.filter(filterTask => filterTask.status == 'inProgress');

    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('inProgress').innerHTML += generateTask(element);
    }
}

enableTesting = () => {
    let testing = tasks.filter(filterTask => filterTask.status == 'testing');

    document.getElementById('testing').innerHTML = '';

    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateTask(element);
    }
}

enableDone = () => {
    let done = tasks.filter(filterTask => filterTask.status == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateTask(element);
    }
}

startDragging = (id) => {
    currentDraggedElement = id;
}

generateTask = (element) => {
    let tNumber = tasks.indexOf(element);
    return `
    <div onclick="openTaskWindow(${tNumber}), addDeleteTask(${tNumber})" id="${tNumber}" draggable="true" ondragstart="startDragging(${tNumber})" class="task ${element.urgency}">
        <div id="userPics" class="userContainer">
        ` 
        + getUserPics(element) +
        ` 
        </div>
        <div class="innerHTMLTask flexCenterContent">
            <div class="elementHeader">
                <span class="elementUser">
                    ${element.title}
                </span>
                <span class="elementCategory">
                    ${element.category}
                </span>
            </div>
            <span class="elementDetails">
                ${element.details}
            </span>
        </div>
    <div>
    `
    ;
}

allowDrop = (ev) => {
    ev.preventDefault();
}

moveTo = (status) => {
    tasks[currentDraggedElement]['status'] = status;
    serverSave();
    updateDragAndDropArea();
}

openTaskWindow = (id) => {
    document.getElementById('openedTaskID').style = "display: flex;";
    document.getElementById('openedTaskID').innerHTML = '';

    document.getElementById('openedTaskID').innerHTML += `
    <div id="openedTaskWindowID" class="openedTask">
        <div class="openedUserImgContainer">
        ` 
        + getOpenedUserPics(id) +
        ` 
        </div>
        <div class="openedInnerHTMLTask">
            <div class="openedHeader">
                <span id="openedTitleID" onkeydown="acceptChanges(${id})" contenteditable="true" class="openedUser">${tasks[id].title}</span><span class="OpenedCategory">Department: ${tasks[id].category}</span>
            </div>
            <span id="openedDetailsID" onkeydown="acceptChanges(${id})" class="openedDetails" contenteditable="true">
                ${tasks[id].details}
            </span>
        </div>
        <img class="closeIcon" id="closedIconImg(${id})" onclick="updateDetails(${id}), updateTitle(${id}), closeTaskWindow()" src="ressources/icons/x.ico">
    <div>
    `
    ;
}

updateDetails = (id) => {
    details = tasks[id].details;
    newDetails = document.getElementById('openedDetailsID').innerText;

    if (details != newDetails) {
        tasks[id].details = newDetails;
        serverSave();
        updateDragAndDropArea();
    }
}

updateTitle = (id) => {
    title = tasks[id].title;
    newTitle = document.getElementById('openedTitleID').innerText;

    if (title != newTitle) {
        tasks[id].title = newTitle;
        serverSave();
        updateDragAndDropArea();
    }
}

acceptChanges = (id) => {
        document.getElementById(`closedIconImg(${id})`).src = 'ressources/icons/check.ico';
}

closeTaskWindow = () => {
    document.getElementById('openedTaskID').style = "display: none;"

    document.getElementById('openedTaskID').innerHTML = '';
}

getUserPics = (element) => {
    let userPicString = "";
    element.users.forEach((user) =>
        userPicString += `<img class="elementUserImg" src="${user.pic}">`)
    return userPicString;
}

getOpenedUserPics = (id) => {
    let userPicString = "";
    tasks[id].users.forEach((user) =>
        userPicString += `<img class="openedUserImg" src="${user.pic}">`)
    return userPicString;
}

addDeleteTask = (tNumber) => {
    if(tasks[tNumber].status == 'done') {
        document.getElementById("openedTaskWindowID").innerHTML += `
        <img onclick="deleteTask(${tNumber})" class="trashIcon" src="ressources/icons/trash.ico">
        `;
    }
}

deleteTask = (tNumber) => {
    
}