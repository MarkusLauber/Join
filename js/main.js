let users = [{
    "name": "John Doe",
    "mail": "123@456.com",
    "phone": "12345",
    "pic": "ressources/img/pictures/1.jpg",
    "color": "blue",
    "assigned": false
}, {
    "name": "Martina Mustermann",
    "mail": "456@123.net",
    "phone": "345346536",
    "pic": "ressources/img/pictures/2.jpg",
    "color": "red",
    "assigned": false
}, {
    "name": "Anton Müller",
    "mail": "hier@da.de",
    "phone": "9876",
    "pic": "ressources/img/pictures/3.jpg",
    "color": "yellow",
    "assigned": false
}, {
    "name": "Beate Becker",
    "mail": "123@456.com",
    "phone": "46536",
    "pic": "ressources/img/pictures/4.jpg",
    "color": "green",
    "assigned": false
}]

// let tasks = [{
//     'pic': 'ressources/img/pictures/1.jpg',
//     'title': 'Anton',
//     'mail': 'Beispielmail@gmx.net',
//     'category': 'Marketing',
//     'details': 'lorem bla',
//     'status': 'board',
//     'boardStatus': 'toDo',
//     'urgency': 'prio1'
// }, {
//     'pic': 'ressources/img/pictures/2.jpg',
//     'title': 'Samson',
//     'mail': 'Beispielmail@gmx.net',
//     'category': 'Product',
//     'details': 'lorem bla dasf sa a fdsa dsa fdsa fawa ds awfa dsa dfsaf wae asf awadwafe awewa dsa wawaf wadsafwfsdaf awfds a',
//     'status': 'board',
//     'boardStatus': 'inProgress',
//     'urgency': 'prio5'

// }, {
//     'pic': 'ressources/img/pictures/3.jpg',
//     'title': 'Alex',
//     'mail': 'Beispielmail@gmx.net',
//     'category': 'Sale',
//     'details': 'lorem bla',
//     'status': 'board',
//     'boardStatus': 'testing',
//     'urgency': 'prio3'

// }, {
//     'pic': 'ressources/img/pictures/4.jpg',
//     'title': 'Martin',
//     'mail': 'Beispielmail@gmx.net',
//     'category': 'Marketing',
//     'details': 'lorem bla',
//     'status': 'board',
//     'boardStatus': 'done',
//     'urgency': 'prio4'

// }, {
//     'pic': 'ressources/img/pictures/4.jpg',
//     'title': 'Martin',
//     'mail': 'Beispielmail@gmx.net',
//     'category': 'Marketing',
//     'details': 'lorem bla',
//     'status': 'board',
//     'boardStatus': 'done',
//     'urgency': 'prio2'
// }];

let tasks = [];

serverLoad = async() => {
    setURL("http://gruppe-162.developerakademie.net/join/smallest_backend_ever-master");
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem("tasks"));
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