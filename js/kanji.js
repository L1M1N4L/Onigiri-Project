document.addEventListener("DOMContentLoaded", function () {
  const kanjiBoxes = document.querySelectorAll('.level-box');

  kanjiBoxes.forEach(box => {
    box.addEventListener('click', function () {
      const kanjiCharacter = this.id;
      openPopup(kanjiCharacter);
    });
  });
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
      // Show the popup
      document.querySelector('.popup-container').style.display = 'flex';
    })
    .catch(error => {
      console.error('Error fetching kanji information:', error);
    });
}

function closePopup() {
  // Close the popup
  document.querySelector('.popup-container').style.display = 'none';
}
