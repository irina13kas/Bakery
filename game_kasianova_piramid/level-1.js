document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('help-modal');
    const okButton = document.getElementById('ok-button');
    const timerDisplay = document.getElementById('timer');

    // Показываем модальное окно при загрузке страницы
    modal.classList.add('open');

    // Закрытие модального окна и старт игры
    okButton.addEventListener('click', () => {
        modal.classList.remove('open');
        startGame();
    });

    // Функция запуска игры
    function startGame() {
        let timeLeft = 180; // 3 минуты в секундах

        // Таймер обратного отсчета
        const timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                endGame();
            } else {
                timeLeft--;
                updateTimerDisplay(timeLeft);
            }
        }, 1000);
    }

    // Обновление таймера на экране
    function updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Завершение игры
    function endGame() {
        alert('Время вышло! Игра окончена.');
        // Логика окончания игры
    }
});
