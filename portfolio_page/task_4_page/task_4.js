const words = [];
const block1 = document.getElementById("Block-1");
const block2 = document.getElementById("Block-2");
const block3 = document.getElementById("Block-3");
const colors=[];
let block_1_line = '1111';

function FillBlock2(){
    block1.innerHTML = '';
    block2.innerHTML = '';
    block3.innerHTML='';
    const inputField = document.getElementById("DisplayArea");
    const inputText = inputField.value;
        let line = inputText
            .split("-")
            .map(item => item.trim());
        

        let lowercaseWords = [];
        let uppercaseWords = [];
        let numbers = [];

        for (const word of line) {
            if (isNaN(parseFloat(word)) || !isFinite(word)) {
                if (word[0] === word[0].toUpperCase()) {
                    uppercaseWords.push(word);
                } else {
                    lowercaseWords.push(word);
                }
            } else{
                numbers.push(word);
            }
        }

        lowercaseWords.sort((a, b) => a.localeCompare(b));
        uppercaseWords.sort((a, b) => a.localeCompare(b));
        numbers.sort((a, b) => a - b);

        let index = 1;
        lowercaseWords.forEach(word => {
            words[`a${index}`] = word;
            index++;
        });

        index = 1;
        uppercaseWords.forEach(word => {
            words[`b${index}`] = word;
            index++;
        });

        index = 1;
        numbers.forEach(num => {
            words[`n${index}`] = num;
            index++;
        });

        for(let key in words){
            const wordElement = document.createElement("div");
            wordElement.classList.add("word");

            const initialColor = getRandomColor();
            wordElement.style.backgroundColor = initialColor;

            colors.push({ id: key, color: initialColor });

            wordElement.innerHTML=`${key} ${words[key]}`;
    
            // Добавляем обработчики для перетаскивания
            wordElement.draggable = true;
            wordElement.addEventListener("dragstart", dragStart);
            wordElement.addEventListener("dragend", dragEnd);
            wordElement.onclick = () => {
                text = wordElement.textContent.split(" ");
                block1.textContent += (block1.textContent? " ":"")+text[1];
        };
    
            block2.appendChild(wordElement);
        }

}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let draggedElement = null;

// Начало перетаскивания
function dragStart(event) {
    draggedElement = event.target;
    draggedElement.classList.add("dragging");
}

// Конец перетаскивания
function dragEnd(event) {
    draggedElement.classList.remove("dragging");
    draggedElement = null;
}

// Обработчики для зоны блоков
block3.addEventListener("dragover", event => {
    event.preventDefault();
});

const block3Rect = block3.getBoundingClientRect();
block3.addEventListener("drop", event => {
    event.preventDefault();
    if (draggedElement) {
        // Вычисляем координаты внутри блока 3, чтобы элемент остался на месте
        let offsetX =  event.offsetX+block3Rect.left- draggedElement.clientWidth / 2;
        let offsetY = event.offsetY+block3Rect.top- draggedElement.clientHeight / 2;

        draggedElement.style.position = 'absolute';
        draggedElement.style.left = `${offsetX}px`;
        draggedElement.style.top = `${offsetY}px`;

        if (draggedElement.parentNode !== block3) {
            block3.appendChild(draggedElement);
        }

        // Присваиваем всем словам в блоке 3 одинаковый цвет
        const wordsInBlock3 = block3.querySelectorAll(".word");
        wordsInBlock3.forEach(word => word.style.backgroundColor = "lightgrey");       
    }
});

// Обработка возвращения элемента в блок 2
block2.addEventListener("dragover", event => {
    event.preventDefault();
});

block2.addEventListener("drop", event => {
    event.preventDefault();
    if (draggedElement) {
        // Находим данные слова для восстановления начальных стилей
        const wordData = colors.find(data => data.id === draggedElement.innerText);

        if (wordData) {
            draggedElement.style.position = 'relative';
            draggedElement.style.left = 'auto';
            draggedElement.style.top = 'auto';
            draggedElement.style.backgroundColor = colors.color;

            block2.appendChild(draggedElement);

            // Сортируем элементы в блоке 2
            const sortedWords = Array.from(block2.querySelectorAll(".word"))
                .sort((a, b) => a.innerText.localeCompare(b.innerText));
            block2.innerHTML = ""; // Очищаем блок 2

            // Добавляем элементы в отсортированном порядке
            sortedWords.forEach(word => block2.appendChild(word));
        }
    }
});