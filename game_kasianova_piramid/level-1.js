let isPaused = false; // Флаг паузы
let timerInterval;
let timeRemaining;
  
// Открытие модального окна при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const helpModal = document.getElementById('help-modal');
    openHelpModal(helpModal);
  });
  
  // Функция для отображения модального окна
  function openHelpModal(modal) {
    modal.classList.add('active');
    pauseTimer();
  }

function startTimer(duration) {
    const timerElement = document.getElementById('timer');
    timeRemaining = duration;
  
    function updateTimerDisplay() {
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
  
      // Форматируем время
      timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
      if (timeRemaining > 0) {
        timeRemaining -= 1;
      } else {
        clearInterval(timerInterval);
        timerElement.textContent = 'Время вышло!';
        const backgroundMusic = document.getElementById('background-music'); 
        backgroundMusic.pause();
      }
    }
  
    // Обновляем отображение каждую секунду
    timerInterval = setInterval(updateTimerDisplay, 1000);
    updateTimerDisplay();
  }

  function pauseTimer() {
    if (!isPaused) {
      clearInterval(timerInterval);
      isPaused = true;
    }
  }
  
  function resumeTimer() {
    if (isPaused) {
      startTimer(timeRemaining);
      isPaused = false;
    }
  }

  function closeLeaderboard() {
    toggleModal('rank-modal', 'close');
    resumeTimer();
  }
  
  function closeSettingsModal() {
    toggleModal('settings-modal', 'close');
    resumeTimer();
  }
  
  function closeHelpModal() {
    toggleModal('help-modal', 'close');
    resumeTimer();
  }
  
  // События для кнопок
  document.querySelector('.help-button').addEventListener('click', pauseTimer);
  document.querySelector('.settings-button').addEventListener('click', pauseTimer);

  const initialTime = 180; // 2 минуты
  startTimer(initialTime);

