const initialTime = 150;
let finePoints = 0;
const numberOfLayers = 5;
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

  function showCakeModal() {
    const cakeModal = document.getElementById('cake-modal');
    const cakeContainer = document.getElementById('cake-container');
    resultCakeColors = shuffleArray(colors);
  
    resultCakeColors.forEach((color, index) => {
      const layer = document.createElement('div');
      layer.classList.add('layer');
      layer.style.backgroundColor = color;
      layer.style.bottom = `${index * 20}%`;
      cakeContainer.appendChild(layer);
    });

    setTimeout(() => closeCakeModal(), 10000);
  }
  
  function closeCakeModal() {
    resumeTimer();
    toggleModal('cake-modal', 'close');
  }
  
function initializeGame() {
    const layersContainer = document.getElementById('layers-container');
    const rightContainer = document.querySelector('.pole-container');
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
    const heightOfLayer = Math.floor(rightContainer.offsetHeight/numberOfLayers);

    const layers = widths.map((width, index) => {
        const layer = document.createElement('div');
        layer.classList.add('layer');
        layer.style.width = `${width}px`;
        layer.style.height= `${heightOfLayer}px`;
        layer.style.backgroundColor = '#bdbdbd';
        layer.setAttribute('draggable', 'true');
        layer.setAttribute('data-weight', 1000 - width);

        const randomDuration = 1 + Math.random() * 3;
        layer.style.animationDuration = `${randomDuration}s`;
        return layer;
    });


    layers.sort(() => Math.random() - 0.5);

    layers.forEach(layer => layersContainer.appendChild(layer));

    addDragAndDropListeners(layers);
}

function addDragAndDropListeners(layers) {
    const leftArea = document.querySelector('.left');
    const rightArea = document.querySelector('.right');

    layers.forEach(layer => {
        layer.addEventListener('dragstart', dragStart);
        layer.addEventListener('dragend', dragEnd);


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
        draggedLayer.style.backgroundColor = '#bdbdbd';
        leftArea.appendChild(draggedLayer);
    }
    topLayer = null;
}
    
    function checkResult(){
      let maxPoints = 0;
        clearInterval(timerInterval);

        switch (Level) {
          case 1:
            maxPoints = 1000;
            break;
          case 2:
            maxPoints = 1100;
            break;
          case 3:
            maxPoints = 1200;
            break;
        }
      
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
        const backgroundMusic = document.getElementById('background-music');
        backgroundMusic.pause();

        const resultModal = document.getElementById('result-modal');
        const resultTitle = document.getElementById('result-title');
        const resultInfo = document.getElementById('result-info');
      
        if (isCorrect && layers.length===5) {
          resultModal.classList.add('success');
          resultTitle.textContent = 'ПОБЕДА!!!';
          const timeUsed = initialTime - timeRemaining;
          const maxPoints = 500;
          let points = Math.max(Math.floor(maxPoints * (timeRemaining / initialTime)), 0) - finePoints;
          resultInfo.textContent = `Очки: ${points}, Время: ${formatTime(timeUsed)}`;
          const users = JSON.parse(localStorage.getItem('users')) || [];
          const username = users[users.length - 1];
          users[users.length-1]['level_2'] = true;
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
      document.querySelector('.prompt-button').addEventListener('click', () => {
        toggleModal('cake-modal', 'open');
        finePoints = 50;
    });
  