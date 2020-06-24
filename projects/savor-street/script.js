function openMenu(evt, menuName) {
    var i, x, tablinks;

    x = document.getElementsByClassName("menu");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
    }

    document.getElementById(menuName).style.display = "block";
    evt.currentTarget.firstElementChild.className += " w3-red";
}
document.getElementById("myLink").click();



var map;
function initMap() {

    var jesseHall = {lat: 38.945233900000005, lng: -92.32868715488362};

    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 8, center: jesseHall});
    var marker = new google.maps.Marker({position: jesseHall, map: map});

}