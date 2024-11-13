const words = {
    a1: "белка",
    a2: "бык",
    a3: "крик",
    a4: "лес",
    b1: "Беда",
    n1: 3,
    n2: 20
};
const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFA533", "#A533FF","#FFFFFFF"];

const wordsLenght = words.length;

let line = Object.values(words).sort(() => Math.random() - 0.5).join("-");
document.getElementById("DisplayArea").textContent = line;

function FillBlock2(){
    const displayArea = document.getElementById("Block-2");
    displayArea.innerHTML = '';
    const keys = Object.keys(words);
    const values = Object.values(words);

    colors.sort(()=>Math.random()-0.5);

    for(let i=0;i<keys.length;i++){
        const colorBlock = document.createElement("div");
        colorBlock.classList.add("color-block");

        const randomColor = colors[i];
        colorBlock.style.backgroundColor = randomColor;
        colorBlock.innerHTML=`${keys[i]} ${values[i]}`;
            
            // Добавляем блок в displayArea
        displayArea.appendChild(colorBlock);
    }
}