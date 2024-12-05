// Универсальная функция для открытия и закрытия модальных окон
function toggleModal(modalId, action) {
  const modal = document.getElementById(modalId);
  if (modal) {
      modal.classList[action === 'open' ? 'add' : 'remove']('active');
  }
}

function showLeaderboard() {
  const users = getUsersFromStorage();
  const sortedUsers = users.sort((a, b) => b.score - a.score);
  const leaderboardList = document.getElementById('leaderboard-list');
  leaderboardList.innerHTML = sortedUsers.map(user => 
      `<tr><td>${user.name}</td><td>${user.score}</td></tr>`
  ).join('');
  toggleModal('settings-modal', 'close');
  toggleModal('rank-modal', 'open');
}

function closeLeaderboard() {
  toggleModal('rank-modal', 'close');
}

function closeSettingsModal() {
  toggleModal('settings-modal', 'close');
}

function closeHelpModal() {
  toggleModal('help-modal', 'close');
}

// Управление пользователями в локальном хранилище
function getUsersFromStorage() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUser(name) {
  const users = getUsersFromStorage();
  users.push({ name, score: Score });
  localStorage.setItem('users', JSON.stringify(users));
}

// Управление музыкой
let musicPlaying = true;

function toggleMusic() {
  const backgroundMusic = document.getElementById('background-music');
  const soundIcon = document.getElementById('sound-icon');
  if (musicPlaying) {
      backgroundMusic.pause();
      soundIcon.textContent = '🔇';
  } else {
      backgroundMusic.play();
      soundIcon.textContent = '🔊';
  }
  musicPlaying = !musicPlaying;
}

// Установка языка
function setLanguage(lang) {
  activeLanguage = lang;
  document.querySelectorAll('.language-option').forEach(option => {
      option.classList.toggle('active', option.id === `language-${lang}`);
  });
  console.log(`Язык установлен: ${lang === 'ru' ? 'Русский' : 'English'}`);
}
// Инициализация
document.addEventListener('DOMContentLoaded', function () {
  const backgroundMusic = document.getElementById('background-music'); 
    backgroundMusic.play();
});

// Привязка событий
document.querySelector('.rank-button').addEventListener('click', showLeaderboard);
document.querySelector('.settings-button').addEventListener('click', () => toggleModal('settings-modal', 'open'));
document.querySelector('.help-button').addEventListener('click', () => toggleModal('help-modal', 'open'));
