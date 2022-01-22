let boardTasks = [
    {
    'id': 0,
    'userImg': 'profileImg/chameleon.jpg',
    'user': 'Anton',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Marketing',
    'details': 'lorem bla',
    'status': 'board',
    'boardStatus':'toDo'
}, {
    'id': 1,
    'userImg': 'profileImg/cow.jpg',
    'user': 'Samson',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Product',
    'details': 'lorem bla',
    'status': 'board',
    'boardStatus':'inProgress'
}, {
    'id': 2,
    'userImg': 'profileImg/dolphin.jpg',
    'user': 'Alex',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Sale',
    'details': 'lorem bla',
    'status': 'board',
    'boardStatus':'testing'
}, {
    'id': 3,
    'userImg': 'profileImg/fox.jpg',
    'user': 'Martin',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Marketing',
    'details': 'lorem bla',
    'status': 'board',
    'boardStatus':'done'
}
];

let currentDraggedElement;


function updateDragAndDropArea() {
    enableToDo();
    enableInProgress();
    enableTesting();
    enableDone();
}

function enableToDo() {
    let toDo = boardTasks.filter(filterTask => filterTask['boardStatus'] == 'toDo');

    document.getElementById('toDo').innerHTML = '';

    for(let i = 0; i < toDo.length; i++) {
        const element = toDo[i];
        document.getElementById('toDo').innerHTML += generateTask(element);
    }
}

function enableInProgress() {
    let inProgress = boardTasks.filter(filterTask => filterTask['boardStatus'] == 'inProgress');

    document.getElementById('inProgress').innerHTML = '';

    for(let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('inProgress').innerHTML += generateTask(element);
    }
}

function enableTesting() {
    let testing = boardTasks.filter(filterTask => filterTask['boardStatus'] == 'testing');

    document.getElementById('testing').innerHTML = '';

    for(let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateTask(element);
    }
}

function enableDone() {
    let done = boardTasks.filter(filterTask => filterTask['boardStatus'] == 'done');

    document.getElementById('done').innerHTML = '';

    for(let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateTask(element);
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTask(element) {
    return `
    <div id="taskID" draggable="true" ondragstart="startDragging(${element['id']})" class="task">
        <img class="elementUserImg" src="${element['userImg']}">
        <div class="innerHTMLTask flexCenterContent">
            <span class="elementUser">
                ${element['user']}
            </span>
            <span class="elementCategory">
                ${element['category']}
            </span>
            <span class="elementDetails">
                ${element['details']}
            </span>
        </div>
    <div>
    `
    ;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(boardStatus) {
    boardTasks[currentDraggedElement]['boardStatus'] = boardStatus;
    updateDragAndDropArea();
}

/*         - IN PROGRESS -

function openTaskWindow(element) {
    document.getElementById('dragAreaContainerID').innerHTML += `
    <div id="openedTaskWindowID" onclick="closeTaskWindow()" class="openedTask">
        <img class="elementUserImg" src="${element['userImg']}">
        <div class="innerHTMLTask flexCenterContent">
            <span class="elementUser">
                ${element['user']}
            </span>
            <span class="elementCategory">
                ${element['category']}
            </span>
            <span class="elementDetails">
                ${element['details']}
            </span>
        </div>
    <div>
    `;
}

*/