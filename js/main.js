document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const overlay = document.getElementById('overlay-pop');
    const closeButton = document.getElementById('closeButton');
    const regisButton = document.getElementById('SignUp');
    const bigSignupButton = document.getElementById("SignUpFree")
    // Function to open the login pop-up
    function openPopup() {
        overlay.style.display = 'block';
    }

    // Function to close the login pop-up
    function closePopup() {
        overlay.style.display = 'none';
    }

    // Event listener to open the pop-up when the "Log In" button is clicked
    loginButton.addEventListener('click', openPopup);

    // Event listener to open the pop-up when the "Sign Up" button is clicked
    regisButton.addEventListener('click', openPopup);
    
    // Event listener to open the pop-up when the "Sign Up" button is clicked
    bigSignupButton.addEventListener('click', openPopup);

    // Event listener to close the pop-up when the close button is clicked
    closeButton.addEventListener('click', closePopup);

    // Event listener to close the pop-up when the user clicks outside of it
    window.addEventListener('click', function(event) {
        if (event.target === overlay) {
            closePopup();
        }
    });
});