let isPaused = false; // Флаг паузы
let timerInterval;
let timeRemaining;
let draggedLayer = null; // Корж, который перетаскивается

document.addEventListener('DOMContentLoaded', () => {
  const helpModal = document.getElementById('help-modal');
  openHelpModal(helpModal);
  initializeGame();
});

// Функция для отображения модального окна
function openHelpModal(modal) {
  modal.classList.add('active');
  pauseTimer();
}

function initializeGame() {
    // Контейнер для коржей
    const layersContainer = document.getElementById('layers-container');
  
    // Список цветов для коржей
    const colors = ['#ff8a80', '#ff80ab', '#ea80fc', '#b388ff', '#8c9eff'];
  
    // Ширины коржей
    const widths = [200, 180, 160, 140, 120];
  
    // Создаем коржи
    const layers = widths.map((width, index) => {
      const layer = document.createElement('div');
      layer.classList.add('layer');
      layer.style.width = `${width}px`;
      layer.style.backgroundColor = colors[index];
      layer.setAttribute('draggable', 'true');
      return layer;
    });
  
    // Перемешиваем коржи в случайном порядке
    layers.sort(() => Math.random() - 0.5);
  
    // Добавляем коржи в контейнер
    layers.forEach(layer => layersContainer.appendChild(layer));
  
    // Логика перетаскивания коржей
    addDragAndDropListeners(layers);
  }

function addDragAndDropListeners(layers) {
  const leftArea = document.querySelector('.left'); // левая область
  const rightArea = document.querySelector('.right'); // правая область

  layers.forEach(layer => {
    layer.addEventListener('dragstart', dragStart);
    layer.addEventListener('dragend', dragEnd);
  });

  leftArea.addEventListener('dragover', dragOver);
  leftArea.addEventListener('drop', dropLeft);

  rightArea.addEventListener('dragover', dragOver);
  rightArea.addEventListener('drop', dropRight);
}

function dragStart(event) {
  draggedLayer = event.target;
  setTimeout(() => (draggedLayer.style.opacity = '0.5'), 0);
}

function dragEnd() {
  draggedLayer.style.opacity = '1';
  draggedLayer = null;
}

function dragOver(event) {
  event.preventDefault();
}

function dropLeft(event) {
    event.preventDefault();
    if (draggedLayer) {
      const leftArea = document.querySelector('.left');
      draggedLayer.style.position = 'relative';
      draggedLayer.style.bottom = '0';
      draggedLayer.style.top = 'auto'; 
      draggedLayer.style.left = 'auto'; 
      draggedLayer.style.transform = 'none';
      leftArea.appendChild(draggedLayer);
    }
  }
  
  function dropRight(event) {
    event.preventDefault();
    if (draggedLayer) {
        const rightArea = document.querySelector('.right');
        rightArea.style.position = 'relative'; // Контейнер должен быть относительно позиционирован
    
        draggedLayer.style.position = 'absolute'; // Абсолютное позиционирование для коржей
        const layersAbove = rightArea.querySelectorAll('.layer');
        const stackHeight = layersAbove.length * draggedLayer.offsetHeight+148; // Высота "стопки" коржей
    
        draggedLayer.style.bottom = `${stackHeight}px`; // Располагаем новый слой поверх предыдущих
        draggedLayer.style.left = '50%'; // Центрируем корж
        draggedLayer.style.transform = 'translateX(-50%)'; // Корректируем позиционирование для центрирования
        rightArea.appendChild(draggedLayer);
      }
  }
  

function resetLayer(layer) {
  // Эта функция может быть использована для сброса позиции элемента, если нужно.
  layer.style.left = '';
  layer.style.top = '';
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
  
  const initialTime = 180; // 3 минуты
  startTimer(initialTime);
