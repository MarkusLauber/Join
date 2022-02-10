let currentDraggedElement;
/**
 * initialization of the drag and drop site. The timeout is 
 * necessary because the serverLoad need some time.
 */
startTasks = async() => {
    colors();
    await serverLoad();
    includeHTML();
    setTimeout(updateDragAndDropArea, 100)
}

/**
 * Enables the filter of the drag and drop area
 */

updateDragAndDropArea = () => {
    enableToDo();
    enableInProgress();
    enableTesting();
    enableDone();
}

/**
 * The filter function for the toDo Container
 */
enableToDo = () => {
    let toDo = tasks.filter(filterTask => filterTask.status == 'toDo');
    toDo.sort(urgencySort);
    document.getElementById('toDo').innerHTML = '';
    for (let i = 0; i < toDo.length; i++) {
        const element = toDo[i];
        document.getElementById('toDo').innerHTML += generateTask(element);
    }
}

/**
 * The filter function for the inProgress Container
 */
enableInProgress = () => {
        let inProgress = tasks.filter(filterTask => filterTask.status == 'inProgress');
        inProgress.sort(urgencySort);
        document.getElementById('inProgress').innerHTML = '';

        for (let i = 0; i < inProgress.length; i++) {
            const element = inProgress[i];
            document.getElementById('inProgress').innerHTML += generateTask(element);
        }
    }
    /**
     * The filter function for the testing Container
     */
enableTesting = () => {
    let testing = tasks.filter(filterTask => filterTask.status == 'testing');
    testing.sort(urgencySort)
    document.getElementById('testing').innerHTML = '';

    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateTask(element);
    }
}

/**
 * The filter function for the done Container
 */
enableDone = () => {
    let done = tasks.filter(filterTask => filterTask.status == 'done');
    done.sort(urgencySort)
    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateTask(element);
    }
}

/**
 * The number/id of the dragged element.
 */
startDragging = (id) => {
    currentDraggedElement = id;
}

/**
 * Generates the tasks
 */
generateTask = (element) => {
    let tNumber = tasks.indexOf(element);
    return `
    <div onclick="openTaskWindow(${tNumber})" id="${tNumber}" draggable="true" ondragstart="startDragging(${tNumber})" class="task ${element.urgency}">
        <div id="userPics" class="userContainer">
        ` +
        getUserPics(element) +
        ` 
        </div>
        <div class="innerHTMLTask">
            <div class="elementHeader">
                <span class="elementTitle">
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
    `;
}

allowDrop = (ev) => {
    ev.preventDefault();
}

/**
 * If an element is moved to another area it gets the status of this area. 
 */
moveTo = (status) => {
    tasks[currentDraggedElement]['status'] = status;
    serverSave();
    updateDragAndDropArea();
}

/**
 * Creates the opened Task.
 */
openTaskWindow = (id) => {
        document.getElementById('openedTaskID').style = "display: flex;";
        document.getElementById('openedTaskID').innerHTML = '';

        document.getElementById('openedTaskID').innerHTML += `
    <div id="openedTaskWindowID" class="openedTask">
        <div class="openedUserImgContainer">
        ` +
            getOpenedUserPics(id) +
            ` 
        </div>
        <div class="openedInnerHTMLTask">
            <div class="openedHeader">
                <span id="openedTitleID" class="openedTitle">${tasks[id].title}</span><span class="openedCategory">Department: ${tasks[id].category}</span>
            </div>
            <span id="openedDetailsID" class="openedDetails">
                ${tasks[id].details}
            </span>
        </div>
        <img class="closeIcon" id="closedIconImg(${id})" onclick="closeTaskWindow()" src="ressources/icons/x.ico">
        
        <button class="backlogButton" onclick="editTask(${id})">edit</button>
    <div>
    `;
    }
    // <button class="backlogButton" id="pullBtn" onclick="backToBacklog(${id})">back to BG</button>

closeTaskWindow = () => {
        document.getElementById('openedTaskID').style = "display: none;"

        document.getElementById('openedTaskID').innerHTML = '';
    }
    /**
     * Enables the user images in the normal task.
     */
getUserPics = (element) => {
    let userPicString = "";
    element.users.forEach((user) =>
        userPicString += `<img class="elementUserImg" src="${user.pic}" style="box-shadow: 1px 1px 5px 1px ${user.color}">`)
    return userPicString;
}

/**
 * Enables the user images in the opened task.
 */
getOpenedUserPics = (id) => {
    let userPicString = "";
    tasks[id].users.forEach((user) =>
        userPicString += `<img class="openedUserImg" src="${user.pic}" style="box-shadow: 1px 1px 5px 1px ${user.color}">`)
    return userPicString;
}

/**
 * Changes the status of a task to backlog. The task moves to the backlog site. 
 */
backToBacklog = (x) => {
    tasks[x].status = "backlog";
    serverSave();
    closeTaskWindow();
    updateDragAndDropArea();
}