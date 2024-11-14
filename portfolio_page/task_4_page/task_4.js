const words = [];
const block1 = document.getElementById("Block-1");
const block2 = document.getElementById("Block-2");
const block3 = document.getElementById("Block-3");
const colors=[];
const block_1_line = '';

function FillBlock2(){
    block2.innerHTML = '';
    const inputField = document.getElementById("DisplayArea");
    const inputText = inputField.value;
        let line = inputText
            .split("-")
            .map(item => item.trim());
        
        inputField.value = "";

        let lowercaseWords = [];
        let uppercaseWords = [];
        let numbers = [];

        for (const word of line) {
            if (typeof word === "string") {
                if (word[0] === word[0].toUpperCase()) {
                    uppercaseWords.push(word);
                } else {
                    lowercaseWords.push(word);
                }
            } else if (typeof word === "number") {
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

            //wordElement.style.position = 'relative';
            wordElement.innerHTML=`${key} ${words[key]}`;
    
            // Добавляем обработчики для перетаскивания
            wordElement.draggable = true;
            wordElement.addEventListener("dragstart", dragStart);
            wordElement.addEventListener("dragend", dragEnd);
    
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

block3.addEventListener("drop", event => {
    event.preventDefault();
    if (draggedElement) {
        const block3Rect = block3.getBoundingClientRect();
        // Вычисляем координаты внутри блока 3, чтобы элемент остался на месте
        const offsetX = event.offsetX+block3Rect.left-draggedElement.clientWidth/2;
        const offsetY = event.offsetY+block3Rect.top-draggedElement.clientHeight/2;

        draggedElement.style.position = 'absolute';
        draggedElement.style.left = `${offsetX}px`;
        draggedElement.style.top = `${offsetY}px`;

        if (draggedElement.parentNode !== block3) {
            block3.appendChild(draggedElement);
        }

        // Присваиваем всем словам в блоке 3 одинаковый цвет
        const wordsInBlock3 = block3.querySelectorAll(".word");
        wordsInBlock3.forEach(word => word.style.backgroundColor = "lightgrey");

        // Добавляем клик для отображения текста в блоке 1
        draggedElement.onclick = () => {
            block_1_line = block_1_line+draggedElement.innerText.split(": ").pop();
            block1.innerText = block_1_line;
        };
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