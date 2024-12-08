let Score = 0;

// Функции открытия и закрытия модальных окон
function openAuthModal() {
    toggleModal('auth-modal', 'open');
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      toggleModal('auth-modal', 'open');// Имитируем клик по кнопке
    }
  });
  
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

  function closeActiveModal() {
    const activeModal = document.querySelectorAll('.modal.active');
    if (activeModal) {
      activeModal.classList.remove('active');
    }else
        toggleModal('cake-modal', 'open');
  }
  
  // Обработчик клика на кнопке закрытия
  document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', (event) => closeActiveModal());
  });
  
  // Обработчик нажатия клавиши Esc
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeActiveModal();
    }
  });