const words = [];
//const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFA533", "#A533FF","#FFC618","#DE18FF","#18FF3D","#FF9D18"];
//colors.sort(()=>Math.random()-0.5);
const block2 = document.getElementById("Block-2");
const block3 = document.getElementById("Block-3");

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

            wordElement.style.backgroundColor = getRandomColor();

            // const randomColor = colors[index];
            // index++;
            // colorBlock.style.backgroundColor = randomColor;
            wordElement.innerHTML=`${key} ${words[key]}`;
            
            wordElement.style.left = `${Math.random() * (block2.clientWidth - 50)}px`;
            wordElement.style.top = `${Math.random() * (block2.clientHeight - 30)}px`;
    
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
        // Перемещение в блок 3
        draggedElement.style.left = `${event.offsetX}px`;
        draggedElement.style.top = `${event.offsetY}px`;
        block3.appendChild(draggedElement);

        // Изменение цвета всех элементов в блоке 3
        const wordsInBlock3 = block3.querySelectorAll(".word");
        wordsInBlock3.forEach(word => word.style.backgroundColor = "#87CEFA"); // Устанавливаем одинаковый цвет
    }
});