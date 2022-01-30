async function loadBacklog() {
    includeHTML();
    setURL("http://gruppe-162.developerakademie.net/join/smallest_backend_ever-master");
    await downloadFromServer();
    tasks = await JSON.parse(backend.getItem("tasks"));

    let backlog = document.getElementById(`backlog`);

    for (let i = 0; i < tasks.length; i++) {
        backlog.innerHTML += `
    <div class="memberColor" style="background-color:${tasks[i].users[0].color}">
    <div class="memberBox">
        <div class="memberImgAndProfil">
             <div class="memberImg"><img class="memberImg" src="${tasks[i].users[0].pic}" style="box-shadow: 1px 1px 5px 1px ${tasks[i].users[0].color}"</img></div>
              <div class="memberProfil">
                <span class="memberName">${tasks[i].users[0].name}</span>
                <span class="memberEmail">${tasks[i].users[0].mail}</span>
                <span class="memberPhone">tel. Nr: ${tasks[i].users[0].phone}</span>
              </div>
        </div>

        <div class="category">${tasks[i].category}</div>
        <div class="details">${tasks[i].details}</div>
    </div>
</div>
`;
    }
}