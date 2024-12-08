const initialTime = 150;
let resultCakeColors = [];
let colors = null;
let Level = null;
const colors_easy = ['rgb(255, 248, 220)', 'rgb(123, 63, 0)', 'rgb(255, 102, 102)', 'rgb(70, 50, 120)', 'rgb(147, 197, 114)'];
const colors_middle = ['rgb(42, 31, 20)', 'rgb(79, 28, 25)', 'rgb(88, 56, 39)', 'rgb(194, 154, 105)', 'rgb(33, 23, 17)'];
const colors_hard = ['rgb(210, 140, 87)', 'rgb(119, 73, 53)', 'rgb(144, 106, 58)', 'rgb(129, 94, 63)', 'rgb(194, 154, 105)'];

startTimer(initialTime);

  function closeActiveModal() {
    const activeModal = document.querySelectorAll('.modal.active');
    activeModal.forEach(modal => {
      modal.classList.remove('active');
    });
    if (Level===null) {
      toggleModal('level-modal', 'open');
    }
  }
  
  function chooseLevel(level){
    Level = level;
    closeLevelModal();
  }
  
  function closeLevelModal() {
    resumeTimer();
    toggleModal('level-modal', 'close');
    initializeGame();
      toggleModal('cake-modal', 'open');
      showCakeModal();
        resumeTimer();
  }
  // Функция для отображения окна с тортом
  function showCakeModal() {
    const cakeModal = document.getElementById('cake-modal');
    const cakeContainer = document.getElementById('cake-container');
    resultCakeColors = shuffleArray(colors);
  
    // Создать слои торта
    resultCakeColors.forEach((color, index) => {
      const layer = document.createElement('div');
      layer.classList.add('layer');
      layer.style.backgroundColor = color;
      layer.style.bottom = `${index * 20}%`; // Смещение по высоте
      cakeContainer.appendChild(layer);
    });
  
    // Закрыть окно через 10 секунд
    setTimeout(() => closeCakeModal(), 10000);
  }

  function shuffleArray(array) {
    res_array = [...array];
    for (let i = res_array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [res_array[i], res_array[j]] = [res_array[j], res_array[i]];
    }
    return res_array;
  }
  
  // Функция для закрытия окна с тортом
  function closeCakeModal() {
    resumeTimer();
    toggleModal('cake-modal', 'close');
  }
  
function initializeGame() {
    const layersContainer = document.getElementById('layers-container');
    // Ширины коржей
    const widths = [200, 180, 160, 140, 120];

    switch (Level) {
      case 1:
        colors = colors_easy;
        break;
      case 2:
        colors = colors_middle;
        break;
      case 3:
        colors = colors_hard;
        break;
    }

    const layers = widths.map((width, index) => {
        const layer = document.createElement('div');
        layer.classList.add('layer');
        layer.style.width = `${width}px`;
        layer.style.backgroundColor = '#bdbdbd'; // Устанавливаем начальный белый цвет
        layer.setAttribute('draggable', 'true');
        layer.setAttribute('data-weight', 1000 - width); // Вес зависит от ширины
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

        // Логика смены цвета при двойном клике
        layer.addEventListener('dblclick', () => {
            if (layer.parentElement === rightArea) {
                const currentColorIndex = colors.indexOf(layer.style.backgroundColor);
                const nextColorIndex = (currentColorIndex + 1) % colors.length;
                layer.style.backgroundColor = colors[nextColorIndex];
            }
        });
    });

    leftArea.addEventListener('dragover', dragOver);
    leftArea.addEventListener('drop', dropLeft);

    rightArea.addEventListener('dragover', dragOver);
    rightArea.addEventListener('drop', dropRight);
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
        draggedLayer.style.backgroundColor = '#bdbdbd'; // Сбрасываем цвет в белый при возврате в левую область
        leftArea.appendChild(draggedLayer);
    }
    topLayer = null;
}
    
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
        toggleModal('result-modal', 'open');
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

    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) return false;
        }
        return true;
      }

      document.querySelector('.check-btn').addEventListener('click', checkResult);
  