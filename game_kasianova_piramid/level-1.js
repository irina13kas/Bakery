const initialTime = 180; // 3 минуты
startTimer(initialTime);

let Level = null;

function closeActiveModal() {
  const activeModal = document.querySelectorAll('.modal.active');
  activeModal.forEach(modal => {
    modal.classList.remove('active');
  });
  if (Level===null) {
    toggleModal('level-modal', 'open');
  }
  else{
      resumeTimer();
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
}


function initializeGame() {
    // Контейнер для коржей
    const layersContainer = document.getElementById('layers-container');  
    // Список цветов для коржей
    const colors = ['rgb(255, 248, 220)', 'rgb(123, 63, 0)', 'rgb(255, 102, 102)', 'rgb(70, 50, 120)', 'rgb(147, 197, 114)','rgb(234, 176, 69)','rgb(210, 105, 30)','rgb(138, 43, 226)','rgb(200, 190, 140)','rgb(220, 20, 60)']; 
    // Ширины коржей
    const widths = [220, 200, 180, 160, 140, 120, 100, 80, 60, 40];

    switch (Level) {
      case 1:
        numberOfLayers = 5;
        break;
      case 2:
        numberOfLayers = 7;
        break;
      case 3:
        numberOfLayers = 10;
        break;
    }

    const layers = [];

    for (let i = 0; i < numberOfLayers; i++) {
      const widthIndex = i % widths.length;  // Цикличное использование ширины из массива
      const colorIndex = i % colors.length;  // Цикличное использование цветов из массива
    
      const layer = document.createElement('div');
      layer.classList.add('layer');
      layer.style.width = `${widths[widthIndex]}px`;  // Ширина слоя
      if(Level===3)
        layer.style.height= `30px`; /* Высота коржа */
      layer.style.backgroundColor = colors[colorIndex];  // Цвет слоя
      layer.setAttribute('draggable', 'true');
      
      // Добавляем атрибут веса (чем меньше ширина, тем больше вес)
      layer.setAttribute('data-weight', 1000 - widths[widthIndex]);
      
      layers.push(layer);  // Добавляем слой в массив
    }

    layers.sort(() => Math.random() - 0.5);

    layers.forEach(layer => layersContainer.appendChild(layer));

    addDragAndDropListeners(layers);
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
      topLayer = prevLayer;
      leftArea.appendChild(draggedLayer);
    }
    topLayer = null;
  } 

  function checkResult(){
    let maxPoints = 0;
    switch (Level) {
      case 1:
        maxPoints = 500;
        break;
      case 2:
        maxPoints = 550;
        break;
      case 3:
        maxPoints = 600;
        break;
    }
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
  
    if (isCorrect && layers.length===numberOfLayers) {
      resultModal.classList.add('success');
      resultTitle.textContent = 'ПОБЕДА!!!';
      const timeUsed = initialTime - timeRemaining;
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

  document.querySelector('.check-btn').addEventListener('click', checkResult);