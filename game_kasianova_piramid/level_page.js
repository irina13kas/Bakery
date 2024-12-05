// Загрузка данных пользователя из локального хранилища
function loadUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const username = users[users.length - 1]; // Предположим, что последний пользователь — это текущий
    if (username) {
      document.getElementById('user-name').textContent = "Имя: " + username.name;
      document.getElementById('user-score').textContent = username.score+" очков";
    }
  }
  
  // Обработка кнопок уровней
  function handleLevelButtons() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const username = users[users.length - 1]; // Получаем текущего пользователя
  
    // Разблокируем 2 и 3 уровни только если предыдущий пройден
    if (username && username.score >= 10) { // Например, 10 очков = прохождение 1 уровня
      document.getElementById('level-2').disabled = false;
    }
    if (username && username.score >= 20) { // Например, 20 очков = прохождение 2 уровня
      document.getElementById('level-3').disabled = false;
    }
  }
  
  let level1Completed = false;

  function startLevel(level) {
    if (level === 1) {
      // Логика для 1 уровня
      alert("Начинаем 1 уровень!");
      level1Completed = true;
      document.getElementById("level2").disabled = false;
    } else if (level === 2 && level1Completed) {
      // Логика для 2 уровня
      alert("Начинаем 2 уровень!");
      document.getElementById("level3").disabled = false;
    } else if (level === 3 && level1Completed) {
      // Логика для 3 уровня
      alert("Начинаем 3 уровень!");
    } else {
      // Показываем модальное окно с предупреждением
      openModal();
    }
  }

  function openModal() {
    document.getElementById("warningModal").classList.add("active");
  }

  function closeModal() {
    document.getElementById("warningModal").classList.remove("active");
  }
  
  // Инициализация
  document.addEventListener('DOMContentLoaded', function () {
    loadUserData();
    handleLevelButtons();
  });
  