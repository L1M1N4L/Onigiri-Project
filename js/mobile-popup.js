const hamburgerButton = document.getElementById('hamburger-button')
const dropdownMenu = document.querySelector('.dropdown-menu')
const contactUsMobile = document.querySelector('.mobile-contact-button')

hamburgerButton.onclick = function () {
    dropdownMenu.classList.toggle('clicked')
}

contactUsMobile.onclick = function () {
    dropdownMenu.classList.toggle('clicked')
}

