document.addEventListener("DOMContentLoaded", function () {
  loadCompletedKanjiStyles();
  const kanjiBoxes = document.querySelectorAll('.level-box');


  kanjiBoxes.forEach(box => {
    box.addEventListener('click', function () {
      const kanjiCharacter = this.id;
      openPopup(kanjiCharacter);
    });
  });
  const studiedKanji = getstudiedkanji();
  applyCompletedStyles(studiedKanji);
});

function openPopup(kanjiCharacter) {
  const apiUrl = `https://kanjiapi.dev/v1/kanji/${kanjiCharacter}`; // KANJI API
  // Show the popup
   document.querySelector('.popup-container').style.display = 'flex';
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById('kanji-info-title').textContent = `${data.kanji}`;
      document.getElementById('meanings').textContent = `${data.meanings.join(', ')}`;
      document.getElementById('readingsKunyomi').textContent = `${data.kun_readings.join(', ')}`;
      document.getElementById('readingsOnyomi').textContent = `${data.on_readings.join(', ')}`;
      document.getElementById('stroke-count').textContent = `${data.stroke_count}`;

      // Set the initial state of the mark as complete button
      const markAsCompleteButton = document.getElementById('markAsCompleteButton');
      markAsCompleteButton.textContent = isKanjiComplete(kanjiCharacter) ? 'Marked as Complete' : 'Mark as Complete';
      markAsCompleteButton.textContent = isKanjiComplete(kanjiCharacter) ? 'Completed' : 'Mark as Complete';
      markAsCompleteButton.style.backgroundColor=isKanjiComplete(kanjiCharacter) ? '#75ce66' : '#fff';;
    })
    .catch(error => {
      console.error('Error fetching kanji information:', error);
    });
  
}

function isKanjiComplete(kanjiCharacter) {
  // Check if the kanji is marked as complete based on your logic (e.g., local storage)
  return localStorage.getItem(`complete_${kanjiCharacter}`) === 'true';
}

function loadCompletedKanjiStyles() {
  const kanjiBoxes = document.querySelectorAll('.level-box');

  kanjiBoxes.forEach(box => {
    const kanjiCharacter = box.id;
    const levelBox = document.getElementById(kanjiCharacter);

    if (isKanjiComplete(kanjiCharacter)) {
      // Add the "completed" class to the corresponding level-box
      levelBox.classList.add('completed');
    }
  });

  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = 'Css/courseStyles.css'; // Adjust the path as needed
  document.head.appendChild(linkElement);
}

function toggleMarkAsComplete() {
  const kanjiCharacter = document.getElementById('kanji-info-title').textContent;
  const markAsCompleteButton = document.getElementById('markAsCompleteButton');
  const levelBox = document.getElementById(kanjiCharacter);

  if (isKanjiComplete(kanjiCharacter)) {
    // Remove the "completed" class from the corresponding level-box
    markAsCompleteButton.textContent = 'Mark as Complete';
    markAsCompleteButton.style.backgroundColor='#fff';
    levelBox.classList.remove('completed');
    localStorage.setItem(`complete_${kanjiCharacter}`, 'false');
    console.log(`Unmarked ${kanjiCharacter}.`);
  } else {
    // Add the "completed" class to the corresponding level-box
    markAsCompleteButton.textContent = 'Completed';
    markAsCompleteButton.style.backgroundColor='#75ce66';
    levelBox.classList.add('completed');
    localStorage.setItem(`complete_${kanjiCharacter}`, 'true');
    console.log(`Marked ${kanjiCharacter} as complete.`);
  }

}
function getstudiedkanji() {
  const studiedKanji = localStorage.getItem('studiedKanji');
  return studiedKanji ? JSON.parse(studiedKanji) : [];
}

document.addEventListener('DOMContentLoaded', function () {
  const kanjiCharacter = document.getElementById('kanji-info-title').textContent;
  toggleMarkAsComplete(kanjiCharacter);
});

function closePopup() {
  // Close the popup
  document.querySelector('.popup-container').style.display = 'none';
}
