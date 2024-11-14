const words = [];
const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFA533", "#A533FF","#FFC618","#DE18FF","#18FF3D","#FF9D18"];
colors.sort(()=>Math.random()-0.5);
const wordsLenght = words.length;

let line = Object.values(words).sort(() => Math.random() - 0.5).join("-");
document.getElementById("DisplayArea").textContent = line;

function FillBlock2(){
    const displayArea = document.getElementById("Block-2");
    displayArea.innerHTML = '';

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

        index = 0;
        for(let key in words){
            const colorBlock = document.createElement("div");
            colorBlock.classList.add("block");

            // Добавляем начальную позицию
            colorBlock.style.top = "400px";
            colorBlock.style.left = "50px";

            colorBlock.addEventListener("mousedown", (e) => startDrag(e, colorBlock));

            const randomColor = colors[index];
            index++;
            colorBlock.style.backgroundColor = randomColor;
            colorBlock.innerHTML=`${key} ${words[key]}`;
                
            displayArea.appendChild(colorBlock);
        }
}

let activeBlock = null;
let offsetX, offsetY;

function startDrag(e, block) {
    activeBlock = block;
    offsetX = e.clientX - block.getBoundingClientRect().left;
    offsetY = e.clientY - block.getBoundingClientRect().top;
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
}

function drag(e) {
    if (activeBlock) {
        activeBlock.style.left = `${e.clientX - offsetX}px`;
        activeBlock.style.top = `${e.clientY - offsetY}px`;
    }
}

function stopDrag(e) {
    if (activeBlock) {
        const area2 = document.getElementById("Block-2").getBoundingClientRect();
        const blockRect = activeBlock.getBoundingClientRect();

        if (
            blockRect.left >= area2.left &&
            blockRect.right <= area2.right &&
            blockRect.top >= area2.top &&
            blockRect.bottom <= area2.bottom
        ) {
            activeBlock.classList.add("dropped");
            document.getElementById("Block-3").appendChild(activeBlock);
            activeBlock.style.position = "relative";
            activeBlock.style.left = "auto";
            activeBlock.style.top = "auto";
        }

            // Убираем обработчики событий
            document.removeEventListener("mousemove", drag);
            document.removeEventListener("mouseup", stopDrag);
            activeBlock = null;
        }
}