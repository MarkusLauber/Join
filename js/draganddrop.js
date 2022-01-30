let tasks = [{
    'id': 0,
    'pic': 'ressources/img/pictures/1.jpg',
    'name': 'Anton',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Marketing',
    'details': 'lorem bla',
    'status': 'board',
    'boardStatus': 'toDo',
    'urgency': 'vHigh'
}, {
    'id': 1,
    'pic': 'ressources/img/pictures/2.jpg',
    'name': 'Samson',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Product',
    'details': 'lorem bla dasf sa a fdsa dsa fdsa fawa ds awfa dsa dfsaf wae asf awadwafe awewa dsa wawaf wadsafwfsdaf awfds a',
    'status': 'board',
    'boardStatus': 'inProgress',
    'urgency': 'vLow'

}, {
    'id': 2,
    'pic': 'ressources/img/pictures/3.jpg',
    'name': 'Alex',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Sale',
    'details': 'lorem bla',
    'status': 'board',
    'boardStatus': 'testing',
    'urgency': 'medium'

}, {
    'id': 3,
    'pic': 'ressources/img/pictures/4.jpg',
    'name': 'Martin',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Marketing',
    'details': 'lorem bla',
    'status': 'board',
    'boardStatus': 'done',
    'urgency': 'low'

}, {
    'id': 4,
    'pic': 'ressources/img/pictures/4.jpg',
    'name': 'Martin',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Marketing',
    'details': 'lorem bla',
    'status': 'board',
    'boardStatus': 'done',
    'urgency': 'high'

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
    let toDo = tasks.filter(filterTask => filterTask.boardStatus == 'toDo');

    document.getElementById('toDo').innerHTML = '';

    for (let i = 0; i < toDo.length; i++) {
        const element = toDo[i];
        document.getElementById('toDo').innerHTML += generateTask(element);
    }
}

enableInProgress = () => {
    let inProgress = tasks.filter(filterTask => filterTask.boardStatus == 'inProgress');

    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('inProgress').innerHTML += generateTask(element);
    }
}

enableTesting = () => {
    let testing = tasks.filter(filterTask => filterTask.boardStatus == 'testing');

    document.getElementById('testing').innerHTML = '';

    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateTask(element);
    }
}

enableDone = () => {
    let done = tasks.filter(filterTask => filterTask.boardStatus == 'done');

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
        <img class="elementUserImg" src="${element.pic}">
        <div class="innerHTMLTask flexCenterContent">
            <div class="elementHeader">
                <span class="elementUser">
                    ${element.name}
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
    tasks[currentDraggedElement]['boardStatus'] = boardStatus;
    updateDragAndDropArea();
}

openTaskWindow = (id) => {
    document.getElementById('openedTaskID').style = "display: flex;";

    document.getElementById('openedTaskID').innerHTML += `
    <div id="openedTaskWindowID" class="openedTask">
        <img class="openedUserImg" src="${tasks[id].pic}">
        <div class="openedInnerHTMLTask">
            <div class="openedHeader">
                <span class="openedUser">${tasks[id].name}</span><span class="OpenedCategory">Department: ${tasks[id].category}</span>
            </div>
            <span id="openedDetailsID" class="openedDetails" contenteditable="true" onchange="updateDetails(${id})">
                ${tasks[id].details}
            </span>
                <img class="closeIcon" id="closeIconID" onclick="updateDetails(${id}), closeTaskWindow()" src="ressources/icons/x.ico">  
        </div>
    <div>
    `;
}

updateDetails = (id) => {
    let details = tasks[id].details;
    let newDetails = document.getElementById('openedDetailsID').innerText;

    if (details != newDetails) {
        tasks[id].details = newDetails;
        updateDragAndDropArea();
    }
}

closeTaskWindow = () => {
    document.getElementById('openedTaskID').style = "display: none;"

    document.getElementById('openedTaskID').innerHTML = '';
}