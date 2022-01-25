
function loadBacklog() {
    let backlog = document.getElementById(`backlog`);

    for (let i = 0; i < users.length; i++) {
        backlog.innerHTML += `
    <div class="memberColor" style="background-color:${users[i].color}">
    <div class="memberBox">
        <div class="memberImgAndProfil">
             <div class="memberImg"><img class="memberImg" src="${users[i].picture}" style="box-shadow: 1px 1px 5px 1px ${users[i].color}"</img></div>
              <div class="memberProfil">
                <span class="memberName">${users[i].name}</span>
                <span class="memberEmail">${users[i].email}</span>
                <span class="memberPhone">tel. Nr: ${users[i].phone}</span>
              </div>
        </div>

        <div class="category">Kategorie</div>
        <div class="details">Lorem ipsum dolor, sit amet consectetur adipisicing</div>
    </div>
</div>
`;
    }

}