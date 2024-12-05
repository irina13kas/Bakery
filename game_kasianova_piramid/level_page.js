// Загрузка данных пользователя из локального хранилища
function loadUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const username = users[users.length - 1]; // Предположим, что последний пользователь — это текущий
    if (username) {
      document.getElementById('user-name').textContent = "Имя: " + username.name;
      document.getElementById('user-score').textContent = username.score+" очков";
    }
  }
  
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
    handleLevelButtons();
  });
  