let isPaused = false; // Флаг паузы
let timerInterval;
let timeRemaining;
let draggedLayer = null; // Корж, который перетаскивается

document.addEventListener('DOMContentLoaded', () => {
    const helpModal = document.getElementById('help-modal');
    openHelpModal(helpModal);
  });

  function openHelpModal(modal) {
    modal.classList.add('active');
    pauseTimer();
  }

  function addDragAndDropListeners(layers) {
    const leftArea = document.querySelector('.left'); // Левая область
    const rightArea = document.querySelector('.right'); // Правая область

    // Добавляем обработчики для слоев в левой области
    layers.forEach(layer => {
        layer.addEventListener('dragstart', dragStart);
        layer.addEventListener('dragend', dragEnd);
    });

    // Добавляем обработчики для зон дропа
    leftArea.addEventListener('dragover', dragOver);
    rightArea.addEventListener('dragover', dragOver);
    leftArea.addEventListener('drop', dropLeft);
    rightArea.addEventListener('drop', dropRight);
  }

  function dragStart(event) {
    draggedLayer = event.target;

    const rightArea = document.querySelector('.right');
    const layers = Array.from(rightArea.querySelectorAll('.layer'));
    const topLayer = layers[layers.length - 1]; // Последний добавленный слой в правой области
    const isLayedInLeft = draggedLayer.closest('.left');

    if (draggedLayer !== topLayer && topLayer && isLayedInLeft === null) {
        event.preventDefault(); // Отменить перетаскивание
        draggedLayer = null;    // Сбросить переменную
        return;
    }
      setTimeout(() => (draggedLayer.style.opacity = '0.5'), 0);
  }
  
  function dragEnd() {
    draggedLayer.style.opacity = '1';
    draggedLayer = null;
  }
  
  function dragOver(event) {
    event.preventDefault();
  }


  function dropRight(event) {
    event.preventDefault();
    if (draggedLayer) {
        const rightArea = document.querySelector('.right');
        draggedLayer.style.position = 'absolute';
        const layersAbove = rightArea.querySelectorAll('.layer');
        const stackHeight = layersAbove.length * draggedLayer.offsetHeight + 142; // Высота "стопки"
        draggedLayer.style.bottom = `${stackHeight}px`;
        draggedLayer.style.left = '50%';
        draggedLayer.style.transform = 'translateX(-50%)';
        rightArea.appendChild(draggedLayer);
    }
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
        checkResult();
        toggleModal('result-modal', 'open')
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

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  function shuffleArray(array) {
    res_array = [...array];
    for (let i = res_array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [res_array[i], res_array[j]] = [res_array[j], res_array[i]];
    }
    return res_array;
  }

  document.querySelector('.help-button').addEventListener('click', pauseTimer);
  document.querySelector('.settings-button').addEventListener('click', pauseTimer);
  document.querySelector('.retry-btn').addEventListener('click', () => {
    location.reload();
  });
  document.querySelector('.levels-btn').addEventListener('click', () => {
    window.location.href = 'levels.html';
  });
  document.querySelector('.retry-btn-res').addEventListener('click', () => {
    location.reload();
  });
  document.querySelector('.levels-btn-res').addEventListener('click', () => {
    window.location.href = 'levels.html';
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      checkResult();
      toggleModal('result-modal', 'open')
    }
  });

  function preventEscCloseForModal(modalId) {
    document.addEventListener('keydown', function(event) {
      const activeModal = document.getElementById(modalId);
      
      if (event.key === 'Escape' && activeModal && activeModal.classList.contains('active')) {
        event.preventDefault();
        console.log('Закрытие модального окна заблокировано');
      }
    });
  }

  preventEscCloseForModal('level-modal');