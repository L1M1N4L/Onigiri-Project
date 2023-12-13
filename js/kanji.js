document.addEventListener("DOMContentLoaded", function () {
  const kanjiBoxes = document.querySelectorAll('.level-box');
  const kanjiProgressDisplay = document.getElementById('kanjiProgressDisplay');
  
  kanjiBoxes.forEach(box => {
    box.addEventListener('click', function () {
      const kanjiCharacter = this.id;
      openPopup(kanjiCharacter);
    });
  });

  const studiedKanji = getStudiedKanji();
  applyCompletedStyles(studiedKanji);
  updateKanjiProgressDisplay(studiedKanji.length);

  const kanjiCharacter = document.getElementById('kanji-info-title').textContent;
  toggleMarkAsComplete(kanjiCharacter);
});

function openPopup(kanjiCharacter) {
  const apiUrl = `https://kanjiapi.dev/v1/kanji/${kanjiCharacter}`; // KANJI API

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

      // Show the popup
      document.querySelector('.popup-container').style.display = 'flex';

      // Toggle mark as complete after the popup is displayed
      toggleMarkAsComplete();
    })
    .catch(error => {
      console.error('Error fetching kanji information:', error);
    });
}

function isKanjiComplete(kanjiCharacter) {
  return localStorage.getItem(`complete_${kanjiCharacter}`) === 'true';
}

function applyCompletedStyles(studiedKanji) {
  const kanjiBoxes = document.querySelectorAll('.level-box');

  kanjiBoxes.forEach(box => {
    const kanjiCharacter = box.id;
    const levelBox = document.getElementById(kanjiCharacter);

    if (studiedKanji.includes(kanjiCharacter)) {
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
    markAsCompleteButton.textContent = 'Mark as Complete';
    levelBox.classList.remove('completed');
    localStorage.setItem(`complete_${kanjiCharacter}`, 'false');
    console.log(`Unmarked ${kanjiCharacter}.`);
  } else {
    markAsCompleteButton.textContent = 'Marked as Complete';
    levelBox.classList.add('completed');
    localStorage.setItem(`complete_${kanjiCharacter}`, 'true');
    console.log(`Marked ${kanjiCharacter} as complete.`);
  }

  updateKanjiProgressDisplay();
}
function getStudiedKanji() {
  const studiedKanji = localStorage.getItem('studiedKanji');
  return Array.isArray(studiedKanji) ? studiedKanji : [];
}

function updateKanjiProgressDisplay() {
  const studiedKanjiCount = getStudiedKanji().length;
  localStorage.setItem('kanjiprogress', studiedKanjiCount.toString());

  // Update the display if the element is found
  const kanjiProgressDisplay = document.getElementById('kanji-progress-display');
  if (kanjiProgressDisplay) {
    kanjiProgressDisplay.textContent = `Studied Kanji: ${studiedKanjiCount}`;
    console.log(`Studied Kanji Count: ${studiedKanjiCount}`);
  }
}




function closePopup() {
  document.querySelector('.popup-container').style.display = 'none';
}
