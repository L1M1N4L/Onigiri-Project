const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const SignUp = document.getElementById('SignUp')
const bigsignupbutton = document.getElementById('SignUpFree')
const loginBtnActive = document.getElementById('login-button')

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

SignUp.addEventListener('click', () => {
    container.classList.add("active");
});

bigsignupbutton.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtnActive.addEventListener('click', () => {
    container.classList.remove("active");
});


loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});