let words = [];
let colors = [];
const block1 = document.getElementById("Block-1");
const block2 = document.getElementById("Block-2");
const block3 = document.getElementById("Block-3");

document.getElementById("Block-3").addEventListener("dragover", event => event.preventDefault());
document.getElementById("Block-3").addEventListener("drop", handleDropToBlock3);
document.getElementById("Block-2").addEventListener("dragover", event => event.preventDefault());
document.getElementById("Block-2").addEventListener("drop", handleDropToBlock2);

let draggedElement = null;
let canClick = true;

function FillBlock2() {
    resetBlocks();
    const inputText = document.getElementById("DisplayArea").value;
    const sortedWords = sortWords(inputText);

    let index = 1;
    sortedWords.lowercaseWords.forEach(word => addWordToCollection(`a${index++}`, word));
    index = 1;
    sortedWords.uppercaseWords.forEach(word => addWordToCollection(`b${index++}`, word));
    index = 1;
    sortedWords.numbers.forEach(num => addWordToCollection(`n${index++}`, num));

    renderWordsToBlock2();
}

function resetBlocks() {
    block1.innerHTML = "";
    block2.innerHTML = "";
    block3.innerHTML = "";
    words=[];
    colors = [];
}

function sortWords(inputText) {
    const line = inputText.split("-").map(item => item.trim());
    const lowercaseWords = [], uppercaseWords = [], numbers = [];

    line.forEach(word => {
        if (isNaN(parseFloat(word)) || !isFinite(word)) {
            word[0] === word[0].toUpperCase() ? uppercaseWords.push(word) : lowercaseWords.push(word);
        } else {
            numbers.push(word);
        }
    });

    lowercaseWords.sort((a, b) => a.localeCompare(b));
    uppercaseWords.sort((a, b) => a.localeCompare(b));
    numbers.sort((a, b) => a - b);

    return { lowercaseWords, uppercaseWords, numbers };
}

function addWordToCollection(id, word) {
    words[id] = word;
    colors.push({ id, color: getRandomColor() });
}

function renderWordsToBlock2() {
    for (let key in words) {
        const wordElement = createWordElement(key, words[key]);
        block2.appendChild(wordElement);
    }
}

function createWordElement(id, text) {
    const wordElement = document.createElement("div");
    wordElement.classList.add("word");
    wordElement.textContent = `${id} ${text}`;
    const color = colors.find(c => c.id === id).color;
    wordElement.style.backgroundColor = color;

    wordElement.draggable = true;
    wordElement.addEventListener("dragstart", dragStart);
    wordElement.addEventListener("dragend", dragEnd);

    return wordElement;
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    return "#" + Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join("");
}

function dragStart(event) {
    draggedElement = event.target;    
}

function dragEnd() {
    draggedElement.classList.remove("dragging");
    draggedElement = null;
}

function handleDropToBlock3(event) {
    event.preventDefault();
    if (draggedElement) {
        const block3Rect = block3.getBoundingClientRect();
        const offsetX = event.clientX + block3Rect.left - 2*draggedElement.clientWidth;
        const offsetY = event.clientY + block3Rect.top - 2*draggedElement.clientHeight;
        
        draggedElement.style.position = 'absolute';
        draggedElement.style.left = `${offsetX}px`;
        draggedElement.style.top = `${offsetY}px`;
        draggedElement.style.pointerEvents='auto';

        if (draggedElement.parentNode !== block3) {
            block3.appendChild(draggedElement);
        }
        draggedElement.style.backgroundColor = "lightgrey";

        canClick = true;
        addClickEventToWords(block3);
    }
}

function handleDropToBlock2(event) {
    event.preventDefault();
    if (draggedElement) {
        const wordData = colors.find(data => data.id === draggedElement.textContent.split(" ")[0]);
        if (wordData) {
            resetElementStyle(draggedElement, wordData.color);
            block2.appendChild(draggedElement);
            sortAndRenderBlock2();

            canClick = false;
            addClickEventToWords(block2);
        }
    }
}

function resetElementStyle(element, color) {
    element.style.position = 'relative';
    element.style.left = 'auto';
    element.style.top = 'auto';
    element.style.backgroundColor = color;
}

function sortAndRenderBlock2() {
    const sortedWords = Array.from(block2.querySelectorAll(".word"))
        .sort((a, b) => a.textContent.localeCompare(b.textContent));
    block2.innerHTML = "";
    sortedWords.forEach(word => block2.appendChild(word));

}

function addClickEventToWords(block) {
    block.querySelectorAll(".word").forEach(word => {
        word.onclick = () => {
            if (canClick) {
                const text = word.textContent.split(" ")[1];
                block1.textContent += (block1.textContent ? " " : "") + text;
            }
        };
    });
}
