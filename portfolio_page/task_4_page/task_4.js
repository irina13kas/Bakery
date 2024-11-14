const words = [];
const block1 = document.getElementById("Block-1");
const block2 = document.getElementById("Block-2");
const block3 = document.getElementById("Block-3");
const colors=[];

function FillBlock2(){
    block1.innerHTML = '';
    block2.innerHTML = '';
    block3.innerHTML='';
    flag_block_3 = false;

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
document.getElementById("Block-3").addEventListener("dragover", event => {
    event.preventDefault();
});

document.getElementById("Block-3").addEventListener("drop", event => {
    const block3Rect = document.getElementById("Block-3").getBoundingClientRect();
    event.preventDefault();
    if (draggedElement) {

        let offsetX = event.offsetX+block3Rect.left;
        let offsetY = block3Rect.top+event.offsetY;

        draggedElement.style.position = 'absolute';
        draggedElement.style.left = `${offsetX}px`;
        draggedElement.style.top = `${offsetY}px`;

        if (draggedElement.parentNode !== block3) {
            block3.appendChild(draggedElement);
        }

        draggedElement.style.backgroundColor = "lightgrey";
        let w = block3.querySelectorAll(".word");
        w.forEach(word => {
            word.onclick = () => {
                const text = word.textContent.split(" ")[1];
                block1.textContent += (block1.textContent ? " " : "") + text;
            };
        });     
    }
});

document.getElementById("Block-2").addEventListener("dragover", event => {
    event.preventDefault();
});


document.getElementById("Block-2").addEventListener("drop", event => {
    event.preventDefault();
    if (draggedElement) {
        const wordData = colors.find(data => data.id === draggedElement.innerText.split(" ")[0]);

        if (wordData) {
            draggedElement.style.position = 'relative';
            draggedElement.style.left = 'auto';
            draggedElement.style.top = 'auto';
            draggedElement.style.backgroundColor = wordData.color;

            document.getElementById("Block-2").appendChild(draggedElement);

            const sortedWords = Array.from(document.getElementById("Block-2").querySelectorAll(".word"))
                .sort((a, b) => a.innerText.localeCompare(b.innerText));
                document.getElementById("Block-2").innerHTML = "";

            sortedWords.forEach(word => document.getElementById("Block-2").appendChild(word));
        }
    }
});