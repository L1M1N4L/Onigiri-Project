//
// Card on click
//
const wrapper = document.querySelector('.wrapper');

wrapper.addEventListener('click', () => {
  wrapper.classList.toggle('clicked');
});


//
// Get the current date
//
   const currentDate = new Date();

   const monthNames = [
       "January", "February", "March", "April", "May", "June",
       "July", "August", "September", "October", "November", "December"
   ];

   const formattedDate = `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

   document.getElementById("date").textContent = formattedDate;