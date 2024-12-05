let Score = 0;

// Функции открытия и закрытия модальных окон
function openAuthModal() {
    toggleModal('auth-modal', 'open');
  }
  
  function closeAuthModal() {
    toggleModal('auth-modal', 'close');
  }

  // Обработка отправки формы авторизации
document.getElementById('auth-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    saveUser(username);
    Score = 0;
    window.location.href = 'levels.html'; // Переход на страницу уровня
  });