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
  const apiUrl = `https://kanjiapi.dev/v1/kanji/${kanjiCharacter}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById('kanji-info-title').textContent = `Kanji Information for ${data.kanji}`;
      document.getElementById('meanings').textContent = `Meanings: ${data.meanings.join(', ')}`;
      document.getElementById('readings').textContent = `Readings: Kun - ${data.kun_readings.join(', ')}, On - ${data.on_readings.join(', ')}`;
      document.getElementById('stroke-count').textContent = `Stroke Count: ${data.stroke_count}`;
      document.getElementById('grade').textContent = `Grade: ${data.grade || 'N/A'}`;
      document.getElementById('heisig-en').textContent = `Heisig Keyword: ${data.heisig_en || 'N/A'}`;
      document.getElementById('jlpt').textContent = `JLPT Level: ${data.jlpt || 'N/A'}`;

      // Show the popup
      document.getElementById('kanji-info-popup').style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching kanji information:', error);
    });
}

function closePopup() {
  // Close the popup
  document.getElementById('kanji-info-popup').style.display = 'none';
}