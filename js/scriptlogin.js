const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const SignUp = document.getElementById('SignUp')
const loginBtnActive = document.getElementById('login-button')
const bigSignupButton = document.getElementById('SignUpFree')

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

SignUp.addEventListener('click', () => {
    container.classList.add("active");
});

bigSignupButton.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtnActive.addEventListener('click', () => {
    container.classList.remove("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});