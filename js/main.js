let users = [{
    "name": "John Doe",
    "mail": "123@456.com",
    "phone": "12345",
    "pic": "ressources/img/pictures/1.jpg",
    "color": "blue"
}, {
    "name": "Martina Mustermann",
    "mail": "456@123.net",
    "phone": "345346536",
    "pic": "ressources/img/pictures/2.jpg",
    "color": "red"
}, {
    "name": "Anton Müller",
    "mail": "hier@da.de",
    "phone": "9876",
    "pic": "ressources/img/pictures/3.jpg",
    "color": "yellow"
}, {
    "name": "Beate Becker",
    "mail": "123@456.com",
    "phone": "46536",
    "pic": "ressources/img/pictures/4.jpg",
    "color": "green"
}]

let tasks = [{
    'pic': 'ressources/img/pictures/1.jpg',
    'name': 'Anton',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Marketing',
    'details': 'lorem bla',
    'status': 'board',
    'boardStatus': 'toDo',
    'urgency': 'vHigh'
}, {
    'pic': 'ressources/img/pictures/2.jpg',
    'name': 'Samson',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Product',
    'details': 'lorem bla dasf sa a fdsa dsa fdsa fawa ds awfa dsa dfsaf wae asf awadwafe awewa dsa wawaf wadsafwfsdaf awfds a',
    'status': 'board',
    'boardStatus': 'inProgress',
    'urgency': 'vLow'

}, {
    'pic': 'ressources/img/pictures/3.jpg',
    'name': 'Alex',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Sale',
    'details': 'lorem bla',
    'status': 'board',
    'boardStatus': 'testing',
    'urgency': 'medium'

}, {
    'pic': 'ressources/img/pictures/4.jpg',
    'name': 'Martin',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Marketing',
    'details': 'lorem bla',
    'status': 'board',
    'boardStatus': 'done',
    'urgency': 'low'

}, {
    'pic': 'ressources/img/pictures/4.jpg',
    'name': 'Martin',
    'mail': 'Beispielmail@gmx.net',
    'category': 'Marketing',
    'details': 'lorem bla',
    'status': 'board',
    'boardStatus': 'done',
    'urgency': 'high'
}];

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