function openNav() {
    document.getElementById("side-nav").style.width = "250px";
}

function closeNav() {
    document.getElementById("side-nav").style.width = "0";
}

// Close the sidebar if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('#hamburger') && !event.target.closest('.side-nav')) {
        closeNav();
    }
}