const initialTime = 180; // 3 минуты
startTimer(initialTime);
// let isPaused = false; // Флаг паузы
// let timerInterval;
// let timeRemaining;
// let draggedLayer = null; // Корж, который перетаскивается

// document.addEventListener('DOMContentLoaded', () => {
//   const helpModal = document.getElementById('help-modal');
//   openHelpModal(helpModal);
//   initializeGame();
// });

// Функция для отображения модального окна
// function openHelpModal(modal) {
//   modal.classList.add('active');
//   pauseTimer();
// }

function initializeGame() {
    // Контейнер для коржей
    const layersContainer = document.getElementById('layers-container');
  
    // Список цветов для коржей
    const colors = ['#ff8a80', '#ff80ab', '#ea80fc', '#b388ff', '#8c9eff'];
  
    // Ширины коржей
    const widths = [200, 180, 160, 140, 120];
    
    const layers = widths.map((width, index) => {
        const layer = document.createElement('div');
        layer.classList.add('layer');
        layer.style.width = `${width}px`;
        layer.style.backgroundColor = colors[index];
        layer.setAttribute('draggable', 'true');
        
        // Добавляем атрибут веса (чем меньше ширина, тем больше вес)
        layer.setAttribute('data-weight', 1000 - width); 
        
        return layer;
      });
  
    // Перемешиваем коржи в случайном порядке
    layers.sort(() => Math.random() - 0.5);
  
    // Добавляем коржи в контейнер
    layers.forEach(layer => layersContainer.appendChild(layer));
  
    // Логика перетаскивания коржей
    addDragAndDropListeners(layers);
  }

// function addDragAndDropListeners(layers) {
//   const leftArea = document.querySelector('.left'); // левая область
//   const rightArea = document.querySelector('.right'); // правая область

//   layers.forEach(layer => {
//     layer.addEventListener('dragstart', dragStart);
//     layer.addEventListener('dragend', dragEnd);
//   });

//   leftArea.addEventListener('dragover', dragOver);
//   leftArea.addEventListener('drop', dropLeft);

//   rightArea.addEventListener('dragover', dragOver);
//   rightArea.addEventListener('drop', dropRight);
// }

// function dragStart(event) {
//   draggedLayer = event.target;
//   setTimeout(() => (draggedLayer.style.opacity = '0.5'), 0);
// }

// function dragEnd() {
//   draggedLayer.style.opacity = '1';
//   draggedLayer = null;
// }

// function dragOver(event) {
//   event.preventDefault();
// }

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
  
  // function dropRight(event) {
  //   event.preventDefault();
  //   if (draggedLayer) {
  //       const rightArea = document.querySelector('.right');
  //       rightArea.style.position = 'relative'; // Контейнер должен быть относительно позиционирован
    
  //       draggedLayer.style.position = 'absolute'; // Абсолютное позиционирование для коржей
  //       const layersAbove = rightArea.querySelectorAll('.layer');
  //       const stackHeight = layersAbove.length * draggedLayer.offsetHeight+148; // Высота "стопки" коржей
    
  //       draggedLayer.style.bottom = `${stackHeight}px`; // Располагаем новый слой поверх предыдущих
  //       draggedLayer.style.left = '50%'; // Центрируем корж
  //       draggedLayer.style.transform = 'translateX(-50%)'; // Корректируем позиционирование для центрирования
  //       rightArea.appendChild(draggedLayer);
  //     }
  // }
  

// function resetLayer(layer) {
//   // Эта функция может быть использована для сброса позиции элемента, если нужно.
//   layer.style.left = '';
//   layer.style.top = '';
// }
// function startTimer(duration) {
//     const timerElement = document.getElementById('timer');
//     timeRemaining = duration;
  
//     function updateTimerDisplay() {
//       const minutes = Math.floor(timeRemaining / 60);
//       const seconds = timeRemaining % 60;
  
//       // Форматируем время
//       timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
//       if (timeRemaining > 0) {
//         timeRemaining -= 1;
//       } else {
//         clearInterval(timerInterval);
//         timerElement.textContent = 'Время вышло!';
//         checkResult();
//         toggleModal('result-modal', 'open')
//         const backgroundMusic = document.getElementById('background-music');
//         backgroundMusic.pause();
//       }
//     }
  
//     // Обновляем отображение каждую секунду
//     timerInterval = setInterval(updateTimerDisplay, 1000);
//     updateTimerDisplay();
//   }
  
  // function pauseTimer() {
  //   if (!isPaused) {
  //     clearInterval(timerInterval);
  //     isPaused = true;
  //   }
  // }
  
  // function resumeTimer() {
  //   if (isPaused) {
  //     startTimer(timeRemaining);
  //     isPaused = false;
  //   }
  // }

  function checkResult(){
    clearInterval(timerInterval);
  
    const poleContainer = document.querySelector('.right');
    const layers = Array.from(poleContainer.querySelectorAll('.layer'));
  
    let isCorrect = true;
  
    for (let i = 0; i < layers.length - 1; i++) {
      const currentWeight = parseInt(layers[i].getAttribute('data-weight'), 10);
      const nextWeight = parseInt(layers[i + 1].getAttribute('data-weight'), 10);
  
      if (currentWeight > nextWeight) {
        isCorrect = false;
        break;
      }
    }  
    // Отображение результата
    const resultModal = document.getElementById('result-modal');
    const resultTitle = document.getElementById('result-title');
    const resultInfo = document.getElementById('result-info');
  
    if (isCorrect && layers.length===5) {
      resultModal.classList.add('success');
      resultTitle.textContent = 'ПОБЕДА!!!';
      const timeUsed = initialTime - timeRemaining;
  const maxPoints = 500; // Максимальное количество очков
  let points = Math.max(Math.floor(maxPoints * (timeRemaining / initialTime)), 0);
      resultInfo.textContent = `Очки: ${points}, Время: ${formatTime(timeUsed)}`;
      completedLevels.push(1);
      const users = JSON.parse(localStorage.getItem('users')) || [];
    const username = users[users.length - 1]; // Предположим, что последний пользователь — это текущий
    if (username) 
     username.score=username.score+ points;
    localStorage.setItem('users', JSON.stringify(users));
    } else {
      resultModal.classList.add('fail');
      resultTitle.textContent = 'ПРОВАЛ!!!';
      resultInfo.textContent = `Очки: 0`;
    }
  }

  // document.addEventListener('keydown', (event) => {
  //   if (event.key === 'Enter') {
  //     checkResult();
  //     toggleModal('result-modal', 'open')
  //   }
  // });


  // function formatTime(seconds) {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  // }
  
  
  // События для кнопок
  // document.querySelector('.help-button').addEventListener('click', pauseTimer);
  // document.querySelector('.settings-button').addEventListener('click', pauseTimer);
  // document.querySelector('.check-btn').addEventListener('click', () => toggleModal('result-modal', 'open'));
  // document.querySelector('.retry-btn').addEventListener('click', () => {
  //   location.reload();
  // });
  // document.querySelector('.levels-btn').addEventListener('click', () => {
  //   window.location.href = 'levels.html';
  // });
  // document.querySelector('.retry-btn-res').addEventListener('click', () => {
  //   location.reload();
  // });
  // document.querySelector('.levels-btn-res').addEventListener('click', () => {
  //   window.location.href = 'levels.html';
  // });

  //const initialTime = 180; // 3 минуты
  //startTimer(initialTime);

