function startTimer(duration) {
    const timerElement = document.getElementById('timer');
    let timeRemaining = duration;
  
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
      }
    }
  
    // Обновляем отображение каждую секунду
    updateTimerDisplay();
    const timerInterval = setInterval(updateTimerDisplay, 1000);
  }
  
  // Задаем начальное время (в секундах)
  const initialTime = 180; // 2 минуты
  startTimer(initialTime);
  
