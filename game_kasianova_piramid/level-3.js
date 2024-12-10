const initialTime = 120;
const targetSumElement = document.getElementById('target-sum');
let targetSum;
let numberOfLayers;
let targetNumOfLayers;

startTimer(initialTime);

function closeActiveModal() {
  const activeModal = document.querySelectorAll('.modal.active');
  activeModal.forEach(modal => {
    modal.classList.remove('active');
  });
    resumeTimer();
    initializeGame();
}

function initializeGame() {
    const layersContainer = document.getElementById('layers-container');
    const rightContainer = document.querySelector('.pole-container');
    const colors = ['rgb(255, 248, 220)', 'rgb(123, 63, 0)', 'rgb(255, 102, 102)', 'rgb(70, 50, 120)', 'rgb(147, 197, 114)','rgb(234, 176, 69)','rgb(210, 105, 30)','rgb(138, 43, 226)']; 
    const widths = [220, 200, 180, 160, 140, 120, 100, 80];
    const layers = [];

    const res_colors = shuffleArray(colors);

    targetSum = getRandomInt(7,20);
    targetNumOfLayers = getRandomInt(4, 6);
    numberOfLayers = getRandomInt(targetNumOfLayers, targetSum);

    targetSumElement.textContent = targetSum;

    const targetSumComponents = splitNumberIntoParts(targetSum, targetNumOfLayers);
    const extraNumbers = addExtraNumbers(numberOfLayers-targetNumOfLayers, targetSum);
    let allWeightComponents = [...targetSumComponents, ...extraNumbers];

    allWeightComponents.sort(() => Math.random() - 0.5);
    const heightOfLayer = Math.floor(rightContainer.offsetHeight/numberOfLayers);

    for (let i = 0; i < numberOfLayers; i++) {
      const widthIndex = i;
      const colorIndex = i;
    
      const layer = document.createElement('div');
      layer.classList.add('layer');
      layer.style.width = `${widths[widthIndex]}px`;
      layer.style.height= `${heightOfLayer}px`;
      layer.style.backgroundColor = res_colors[colorIndex];
      layer.textContent = allWeightComponents[i];
      layer.setAttribute('draggable', 'true');
      
      layer.setAttribute('width', 1000 - widths[widthIndex]);
      layer.setAttribute('weight', allWeightComponents[i]);

      const randomDuration = 1 + Math.random() * 3;
      layer.style.animationDuration = `${randomDuration}s`;
  
      
      layers.push(layer);
    }

    layers.sort(() => Math.random() - 0.5);

    layers.forEach(layer => layersContainer.appendChild(layer));

    addDragAndDropListeners(layers);
  }

  function getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function splitNumberIntoParts(total, partsCount) {
    const parts = Array(partsCount).fill(1);
    let remainder = total - partsCount;
    while (remainder > 0) {
        const randomIndex = Math.floor(Math.random() * partsCount);
        parts[randomIndex]++;
        remainder--;
    }
    return parts;
}

function addExtraNumbers(extraNum, total){
    let numbers = [];
    while(extraNum>0){
        numbers.push(Math.floor(Math.random() * (total/3)));
        extraNum--;
    }
    return numbers;
}

function dropRight(event) {
    event.preventDefault();
    if (draggedLayer) {
        const rightArea = document.querySelector('.right');
        draggedLayer.style.position = 'absolute';
        const layersAbove = rightArea.querySelectorAll('.layer');
        const stackHeight = layersAbove.length * draggedLayer.offsetHeight + 123;
        draggedLayer.style.bottom = `${stackHeight}px`;
        draggedLayer.style.left = '50%';
        draggedLayer.style.transform = 'translateX(-50%)';
        rightArea.appendChild(draggedLayer);
    }
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

  function checkResult(){
    let maxPoints = 2000;
    clearInterval(timerInterval);
  
    const poleContainer = document.querySelector('.right');
    const layers = Array.from(poleContainer.querySelectorAll('.layer'));
  
    let isCorrect = true;
  
    for (let i = 0; i < layers.length - 1; i++) {
      const currentWeight = parseInt(layers[i].getAttribute('width'), 10);
      const nextWeight = parseInt(layers[i + 1].getAttribute('width'), 10);
  
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
    
    const sum = Array.from(layers).reduce((total, layer) => {
        return total + parseInt(layer.getAttribute('weight'));
    }, 0);

    if (isCorrect && sum==targetSum) {
      resultModal.classList.add('success');
      resultTitle.textContent = 'ПОБЕДА!!!';
      const timeUsed = initialTime - timeRemaining;
  let points = Math.max(Math.floor(maxPoints * (timeRemaining / initialTime)), 0);
      resultInfo.textContent = `Очки: ${points}, Время: ${formatTime(timeUsed)}`;
      completedLevels.push(1);
      const users = JSON.parse(localStorage.getItem('users')) || [];
    const username = users[users.length - 1];
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