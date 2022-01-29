let boardTasks = [{
    'id': 0,
    'userImg': 'ressources/img/pictures/1.jpg',
    'user': 'Anton',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Marketing',
    'details': 'lorem bla',
    'status': 'board',
    'boardStatus': 'toDo',
    'urgency': 'urgencyRed'
}, {
    'id': 1,
    'userImg': 'ressources/img/pictures/2.jpg',
    'user': 'Samson',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Product',
    'details': 'lorem bla dasf sa a fdsa dsa fdsa fawa ds awfa dsa dfsaf wae asf awadwafe awewa dsa wawaf wadsafwfsdaf awfds a',
    'status': 'board',
    'boardStatus': 'inProgress',
    'urgency': 'urgencyGreen'

}, {
    'id': 2,
    'userImg': 'ressources/img/pictures/3.jpg',
    'user': 'Alex',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Sale',
    'details': 'lorem bla',
    'status': 'board',
    'boardStatus': 'testing',
    'urgency': 'urgencyOrange'

}, {
    'id': 3,
    'userImg': 'ressources/img/pictures/4.jpg',
    'user': 'Martin',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Marketing',
    'details': 'lorem bla',
    'status': 'board',
    'boardStatus': 'done',
    'urgency': 'urgencyGreen'

}];

let currentDraggedElement;


updateDragAndDropArea = () => {
    includeHTML();
    enableToDo();
    enableInProgress();
    enableTesting();
    enableDone();
}

enableToDo = () => {
    let toDo = boardTasks.filter(filterTask => filterTask.boardStatus == 'toDo');

    document.getElementById('toDo').innerHTML = '';

    for (let i = 0; i < toDo.length; i++) {
        const element = toDo[i];
        document.getElementById('toDo').innerHTML += generateTask(element);
    }
}

enableInProgress = () => {
    let inProgress = boardTasks.filter(filterTask => filterTask.boardStatus == 'inProgress');

    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('inProgress').innerHTML += generateTask(element);
    }
}

enableTesting = () => {
    let testing = boardTasks.filter(filterTask => filterTask.boardStatus == 'testing');

    document.getElementById('testing').innerHTML = '';

    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateTask(element);
    }
}

enableDone = () => {
    let done = boardTasks.filter(filterTask => filterTask.boardStatus == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateTask(element);
    }
}

startDragging = (id) => {
    currentDraggedElement = id;
}

generateTask = (element, id) => {
    return `
    <div onclick="openTaskWindow(${element.id})" id="taskID" draggable="true" ondragstart="startDragging(${element.id})" class="task ${element.urgency}">
        <img class="elementUserImg" src="${element.userImg}">
        <div class="innerHTMLTask flexCenterContent">
            <div class="elementHeader">
                <span class="elementUser">
                    ${element.user}
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
    `;
}

allowDrop = (ev) => {
    ev.preventDefault();
}

moveTo = (boardStatus) => {
    boardTasks[currentDraggedElement]['boardStatus'] = boardStatus;
    updateDragAndDropArea();
}

openTaskWindow = (id) => {
    document.getElementById('openedTaskID').style = "display: flex;";

    document.getElementById('openedTaskID').innerHTML += `
    <div id="openedTaskWindowID" class="openedTask">
        <img class="openedUserImg" src="${boardTasks[id].userImg}">
        <div class="openedInnerHTMLTask">
            <div class="openedHeader">
                <span class="openedUser">${boardTasks[id].user}</span><span class="OpenedCategory">Department: ${boardTasks[id].category}</span>
            </div>
            <span id="openedDetailsID" class="openedDetails" contenteditable="true" onchange="updateDetails(${id})">
                ${boardTasks[id].details}
            </span>
                <img class="closeIcon" id="closeIconID" onclick="updateDetails(${id}), closeTaskWindow()" src="ressources/icons/x.ico">  
        </div>
    <div>
    `;
}

updateDetails = (id) => {
    let details = boardTasks[id].details;
    let newDetails = document.getElementById('openedDetailsID').innerText;

    if (details != newDetails) {
        boardTasks[id].details = newDetails;
        updateDragAndDropArea();
    }
}

closeTaskWindow = () => {
    document.getElementById('openedTaskID').style = "display: none;"

    document.getElementById('openedTaskID').innerHTML = '';
}