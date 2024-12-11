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

function getUsersFromStorage() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUser(name) {
  const users = getUsersFromStorage();
  users.push({ name, score: Score, level_1: false, level_2: false});
  localStorage.setItem('users', JSON.stringify(users));
}

let musicPlaying = true;

function toggleMusic() {
  const backgroundMusic = document.getElementById('background-music');
  const soundIcon = document.getElementById('sound-icon');
  if (musicPlaying) {
    backgroundMusic.pause();
      soundIcon.textContent = '🔇';
  } else {
    backgroundMusic.play().catch(error => {
        console.error("Музыка не может быть запущена:", error);
    });
      soundIcon.textContent = '🔊';
  }
  musicPlaying = !musicPlaying;
}

document.addEventListener('DOMContentLoaded', function () {
  const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.play().catch(error => {
        console.error("Музыка не может быть запущена:", error);
    });
});

function closeActiveModal() {
  const activeModal = document.querySelectorAll('.modal.active');
  activeModal.forEach(modal => {
    modal.classList.remove('active');
  });
}

  document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', (event) => closeActiveModal());
  });
  
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeActiveModal();
    }
  });

document.querySelector('.rank-button').addEventListener('click', showLeaderboard);
document.querySelector('.settings-button').addEventListener('click', () => toggleModal('settings-modal', 'open'));
document.querySelector('.help-button').addEventListener('click', () => toggleModal('help-modal', 'open'));
