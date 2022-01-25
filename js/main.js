let users = [{
    "name": "John Doe",
    "email": "123@456.com",
    "phone": "12345",
    "picture": "ressources/img/pictures/1.jpg",
    "color": "blue"
}, {
    "name": "Martina Mustermann",
    "email": "456@123.net",
    "phone": "345346536",
    "picture": "ressources/img/pictures/2.jpg",
    "color": "red"
}, {
    "name": "Anton Müller",
    "email": "hier@da.de",
    "phone": "9876",
    "picture": "ressources/img/pictures/3.jpg",
    "color": "yellow"
}, {
    "name": "Beate Becker",
    "email": "123@456.com",
    "phone": "46536",
    "picture": "ressources/img/pictures/4.jpg",
    "color": "green"
}]

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