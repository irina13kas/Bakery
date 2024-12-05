// Загрузка данных пользователя из локального хранилища
function loadUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const username = users[users.length - 1]; // Предположим, что последний пользователь — это текущий
    if (username) {
      document.getElementById('user-name').textContent = "Имя: " + username.name;
      document.getElementById('user-score').textContent = username.score+" очков";
    }
}

// function handleLevelButtons() {
//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     const username = users[users.length - 1]; // Получаем текущего пользователя
  
//     // Разблокируем 2 и 3 уровни только если предыдущий пройден
//     if (username && username.score >= 10) { // Например, 10 очков = прохождение 1 уровня
//       document.getElementById('level-2').disabled = false;
//     }
//     if (username && username.score >= 20) { // Например, 20 очков = прохождение 2 уровня
//       document.getElementById('level-3').disabled = false;
//     }
//   }
  
  let completedLevels = [];

    function startLevel(level) {
        alert(`Начинаем ${level} уровень!`);
    }

    function checkLevel(level) {
      if (level === 2 && !completedLevels.includes(1)) {
        openModalLevels(); // Показываем предупреждение
      } else if (level === 3 && !completedLevels.includes(2)) {
        openModalLevels(); // Показываем предупреждение
    }
}

    function openModalLevels() {
      document.getElementById("warningModal").classList.add("active");
    }

    function closeModalLevels() {
      document.getElementById("warningModal").classList.remove("active");
    }
  
  // Инициализация
  document.addEventListener('DOMContentLoaded', function () {
    loadUserData();
    //handleLevelButtons();
  });

  function closeSettingsModal() {
    toggleModal('settings-modal', 'close');
  }
  
  function closeHelpModal() {
    toggleModal('help-modal', 'close');
  }
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

  // Управление пользователями в локальном хранилище
function getUsersFromStorage() {
    return JSON.parse(localStorage.getItem('users')) || [];
  }

  function confirmReset() {
    window.location.href = 'index.html';
}


document.querySelector('.rank-button').addEventListener('click', showLeaderboard);
document.querySelector('.settings-button').addEventListener('click', () => toggleModal('settings-modal', 'open'));
document.querySelector('.help-button').addEventListener('click', () => toggleModal('help-modal', 'open'));
  