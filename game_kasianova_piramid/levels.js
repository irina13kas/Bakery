document.addEventListener('DOMContentLoaded', function () {
  loadUserData();
  handleLevelButtons();
});

function handleLevelButtons() {  
    // Разблокируем 2 и 3 уровни только если предыдущий пройден
    if (completedLevels.includes(1)) { // Например, 10 очков = прохождение 1 уровня
      document.getElementById('level-2').style.backgroundColor = "#d81b60";
    }
    if (completedLevels.includes(2)) { // Например, 20 очков = прохождение 2 уровня
      document.getElementById('level-3').disabled = false;
    }
  }

// Загрузка данных пользователя из локального хранилища
function loadUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const username = users[users.length - 1]; // Предположим, что последний пользователь — это текущий
    if (username) {
      document.getElementById('user-name').textContent = "Имя: " + username.name;
      document.getElementById('user-score').textContent = username.score+" очков";
    }
  }

    function startLevel(level) {
      if(level===1)
        window.location.href = 'level-1.html';
      else if(level===2)
        window.location.href = 'level-2.html';
    }

    function checkLevel(level) {
      if (level === 2 && !completedLevels.includes(1)) {
        openModalLevels(); // Показываем предупреждение
      } else if (level === 2 && completedLevels.includes(1)){
        startLevel(2);
      }
      if (level === 3 && !completedLevels.includes(2)) {
        openModalLevels(); // Показываем предупреждение
    }
}

function openModalLevels() {
  document.getElementById("warningModal").classList.add("active");
}

function closeModalLevels() {
  document.getElementById("warningModal").classList.remove("active");
}