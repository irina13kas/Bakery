function selectOption(optionId) {
    const catalog = document.querySelector(".catalog-container");
    const designer = document.querySelector(".designer-container");
    const option1 = document.getElementById("option1");
    const option2 = document.getElementById("option2");

    // Добавляем нужные классы
    if (optionId === 'option1') {
        option1.style.backgroundColor = '#9c8bff';
        option2.style.border = '2px solid #7B68EE';
        option2.style.backgroundColor = 'transparent';
        catalog.style.borderColor = '#9c8bff';
        showCatalog();
    } else {
        option2.style.backgroundColor = '#7B68EE';
        option1.style.border = '2px solid #9c8bff';
        option1.style.background = 'transparent';
        designer.style.borderColor = '#7B68EE';
        showDesigner();
    }
}

function showDesigner(){
    const catalogContainer = document.getElementById('catalogContainer');
    const designerContainer = document.getElementById('designerContainer');
    catalogContainer.classList.remove('visible');
    designerContainer.classList.add('visible');
    catalogContainer.innerHTML = '';

}
// Данные о продуктах
const products = [
    {   name: 'Black&White', 
        price: 1500, image: '.vscode/images/images_1.jpg', 
        description: 'Набор из 12 ванильных капкейков в монохромном оформлении. Ничего лишнего - просто и вкусно', 
        composition: 'пшеничная мука, белый сахарный песок, разрыхлитель, молоко коровье нормализованное, масло сливочное, масло растительное, яйца, сыр творожный, сахарная пудра, краситель пищевой "черный", кондитерская посыпка', 
        nutrition: {
            calories: '375.5',
            protein: '3.9',
            fat:'25',
            carbs:'34.7'
        } },
    {   name: 'Countryside',
        price: 1600, 
        image: '.vscode/images/images_2.jpg', 
        description: 'Набор из 12 ванильных капкейков с малиновой начинкой. Нежный десерт с легкой кислинкой украсит любой стол.', 
        composition: 'Основа(пшеничная мука, белый сахарный песок, разрыхлитель, сливочное масло, куриное яйцо, соль, ванильный экстракт, молоко коровье нормализованное), Начинка(малина, сливки 33%, сахарная пудра, краситель пищевой "зеленый", сливочный сыр)', 
        nutrition: {
            calories: '310',
            protein: '4',
            fat:'15',
            carbs:'40'
        }  },
    {   name: 'Sea pearl', 
        price: 1600, 
        image: '.vscode/images/images_3.jpg', 
        description: 'Набор из 12 лимонных капкейков с грушевым канфи. Сочитание терпкой груши и кисловатого лимона создают взрывное сочетание и просто тают во рту.', 
        composition: 'Основа(пшеничная мука, белый сахарный песок, разрыхлитель, сливочное масло, ванильный экстракт, куриное яйцо, лимон, сметана 22%), Начинка(груша, тростниковый сахар, корица, карамель)', 
        nutrition: {
            calories: '310',
            protein: '4',
            fat:'15',
            carbs:'40'
        }  },
    {   name: 'Red rhapsody', 
        price: 1000, 
        image: '.vscode/images/images_4.jpg', 
        description: 'Набор из 8 капкейков с вишневой начинкой. Пикантная вишня придает десерту дерзкую и даже роковую нотку.', 
        composition: 'Основа(пшеничная мука, белый сахарный песок, разрыхлитель, сливочное масло, молоко коровье нормализованное, куриное яйцо), начинка(вишня, сыр маскарпоне, сахарная пудра, сливки 33%, ванильный экстракт, краситель пищевой "красный"', 
        nutrition: {
            calories: '256.2',
            protein: '4.15',
            fat:'11.67',
            carbs:'34.81'
        }  },
    {   name: 'Lemon tart', 
        price: 850, 
        image: '.vscode/images/images_5.jpg', 
        description: 'Десерт для уютных вечеров. Легкая текстура с насыщенным лимонным вкусом.', 
        composition: 'Основа(пшеничная мука, белый сахарный песок, сливочное масло), Начинка(яйцо куриное, лимон, молоко коровье нормализованное, крахмал кукурузный, белый сахарный песок)', 
        nutrition: {
            calories: '298',
            protein: '5',
            fat:'13',
            carbs:'40'
        }  },
    {   name: 'Blue cheesecake', 
        price: 1000, 
        image: '.vscode/images/images_6.jpg', 
        description: 'Нежный - прекрасно подходит для описания этого десерта. Кремовая текстура и сливочный вкус лимона и ягод настолько идеальное сочетание, что больше и добавить нечего.', 
        composition: 'Основа(печенье песочное, масло сливочное), Начинка(сметана 23%, сыр рикотта, цедра лимона, белый сахарный песок, куриное яйцо), Украшение(сезонная ягода)', 
        nutrition: {
            calories: '304',
            protein: '8',
            fat:'17',
            carbs:'21'
        }  },
    {   name: 'Pavlova set', 
        price: 1500, 
        image: '.vscode/images/images_7.jpg', 
        description: 'История гласит, что впервые этот десерт был приготовлен для балерины Анны Павловой. Кондитер передал пироженому всю воздушность танцовщицы. Набор состоит из 6 штучек.', 
        composition: 'Основа(куриное яйцо белки, белый сахарный песок, сахарная пудра, сок лимона, соль), Крем(сливки 33%, творожный сыр, сахарная пудра), Украшение(малина, нейтральный гель, мята)', 
        nutrition: {
            calories: '342',
            protein: '13',
            fat:'10',
            carbs:'35'
        }  },
    {   name: 'Vanilla eclairs', 
        price: 600, 
        image: '.vscode/images/images_8.jpg', 
        description: 'Набор из 4 эклеров с заварным кремом. Не пироженые, а просто праздник какой-то! Тонкий слой теста и море начинки.', 
        composition: 'Тесто(пшеничная мука, вода, соль, сливочное масло, куриное яйцо), Заварной крем(сливки 20%, куриное яйцо, пшеничная мука, белый сахарный песок, ванильный экстракт, сливочное масло)', 
        nutrition: {
            calories: '313.72',
            protein: '5.07',
            fat:'20.56',
            carbs:'27.09'
        }  },
];

// Функция для отображения каталога
function showCatalog() {
    const catalogContainer = document.getElementById('catalogContainer');
    const designerContainer = document.getElementById('designerContainer');
    catalogContainer.classList.add('visible');
    designerContainer.classList.remove('visible');

    products.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('catalog-item');
        productElement.innerHTML = 
            `<img src="${product.image}" alt="${product.name}" onclick="showProductModal(${index})">
            <p class="title">${product.name}</p>
            <p class="price">₽${product.price}</p>
            <div class="quantity-controls">
                <button onclick="changeQuantity(this, -1)">-</button>
                <span class="quantity">1</span>
                <button onclick="changeQuantity(this, 1)">+</button>
            </div>
            <button class="add-to-cart" onclick="addToCart(this)">В корзину</button>
        `;
        catalogContainer.appendChild(productElement);
    });
}

// Функция для отображения модального окна с информацией о продукте
function showProductModal(index) {
    const product = products[index];
    
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.classList.add('product-modal');
    modal.innerHTML = 
        `<div class="modal-content">
            <span class="close-button" onclick="closeModal()">&times;</span>
                <img class="modal-left" src="${product.image}" alt="${product.name}">
            <div class="modal-right">
                <h2>${product.name}</h2>
                <p class="description"><strong>Описание: </strong>${product.description}</p>
                <p class="composition"><strong>Состав:</strong> ${product.composition}</p>
                <p class="price"><strong>Цена:</strong>₽${product.price}</p>
                <p class="nutrition"><strong>Пищевая ценность(на 100 грамм):</strong></p>
                <ul class="nutrition-list">
                <li>Калории: ${product.nutrition.calories} ккал</li>
                <li>Белки: ${product.nutrition.protein} г</li>
                <li>Жиры: ${product.nutrition.fat} г</li>
                <li>Углеводы: ${product.nutrition.carbs} г</li>
                </ul>
                <div class="quantity-block">
                    <div class="quantity-controls">
                        <button onclick="changeQuantity(this, -1)">-</button>
                        <span class="quantity">1</span>
                        <button onclick="changeQuantity(this, 1)">+</button>
                    </div>
                    <button class="add-to-cart" onclick="addToCart(this)">В корзину</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Функция для закрытия модального окна
function closeModal() {
    const modal = document.querySelector('.product-modal');
    if (modal) {
        modal.remove();
    }
}

// Другие функции
function changeQuantity(button, change) {
    const quantitySpan = button.parentNode.querySelector('.quantity');
    let quantity = parseInt(quantitySpan.textContent);
    quantity = Math.max(1, quantity + change);
    quantitySpan.textContent = quantity;
}

function addToCart(button) {
    const item = button.closest('.catalog-item');
    item.querySelector('.quantity').textContent = 1;
}

let currentStep = 1;
const totalSteps = 4;
let selectedImage = null;

let selections = [null,null,null];

function startDesign() {
    const container = document.getElementById("designerContainer");
    container.innerHTML = ''; // Очистка окна
    renderStep();
}

const steps = [{
    name:'Бисквит',
    items:[ 
        { src: '.vscode/images/images_1.jpg', title: 'Начинка 1', description: 'Описание начинки 1' },
        { src: '.vscode/images/images_2.jpg', title: 'Начинка 2', description: 'Описание начинки 2' },
        { src: '.vscode/images/images_3.jpg', title: 'Начинка 3', description: 'Описание начинки 3' }]},
    {name:'Начинка',
     items:[ 
        { src: '.vscode/images/images_1.jpg', title: 'Начинка 1', description: 'Описание начинки 1' },
        { src: '.vscode/images/images_2.jpg', title: 'Начинка 2', description: 'Описание начинки 2' },
        { src: '.vscode/images/images_3.jpg', title: 'Начинка 3', description: 'Описание начинки 3' }]},
    {name:'Декор',
     items:[ 
        { src: '.vscode/images/images_1.jpg', title: 'Начинка 1', description: 'Описание начинки 1' },
        { src: '.vscode/images/images_2.jpg', title: 'Начинка 2', description: 'Описание начинки 2' },
        { src: '.vscode/images/images_3.jpg', title: 'Начинка 3', description: 'Описание начинки 3' }]}
    ];

function renderStep() {
    const container = document.getElementById("designerContainer");
    container.innerHTML = `
        <p class="step-indicator">ШАГ: ${currentStep}/${totalSteps}</p>
        <h2 class="step-title">${steps[currentStep-1].name}</h2>
        <div class="image-container" id="imagesContainer""></div>
        <div class="button-container">
        <button class="prev-btn" id="prevButton" onclick="goToPrevStep()">&#8592;</button>
        <button class="next-btn" id="nextButton" onclick="goToNextStep()" disabled>Далее</button>
        </div>
    `;
    displayImages();
}

function displayImages() {
    const imagesContainer = document.getElementById('imagesContainer');
    //imagesContainer.innerHTML = ''; // Очищаем контейнер для нового шага
    let images = steps[currentStep-1].items;
    images.forEach((img, index) => {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image-item');
        imageDiv.innerHTML = `
            <img src="${img.src}" alt="${img.title}">
            <div class="description">${img.description}</div>
        `;

        imageDiv.addEventListener('click', () => {
            // Снимаем отметку со всех изображений и затемняем выбранное
            document.querySelectorAll('.image-item').forEach(item => item.classList.remove('selected'));
            imageDiv.classList.add('selected');
            selectedImage = index; // Запоминаем выбранное изображение
            selections[currentStep-1] = imageDiv;
            document.getElementById('nextButton').disabled = false; // Разблокируем кнопку "Далее"
        });

        imagesContainer.appendChild(imageDiv);
    });
}

function selectImage(element) {
    // Выбор картинки
    const imageContainer = document.querySelector(".image-container");
    selectedImage = true; // Помечаем картинку как выбранную
    element.classList.add("selected");

    // Активируем кнопку "Далее"
    document.querySelector(".next-btn").disabled = false;
}

function goToNextStep() {
    if (selectedImage==null) {
        shakeButton();
        return;
    }
    currentStep++;
    if (currentStep < totalSteps) {
        selectedImage = null; // Сбрасываем выбор картинки
        renderStep();
    }
    else if (currentStep===totalSteps){
        customerWishes();
    }
}

function goToPrevStep() {
    if (currentStep > 1) {
        currentStep--;
        renderStep();
        selections[currentStep-1].classList.add('selected');
    }
}

function shakeButton() {
    const nextButton = document.querySelector(".next-btn");
    nextButton.classList.add("shake");
    setTimeout(() => nextButton.classList.remove("shake"), 500);
}

function customerWishes(){

    const container = document.getElementById("designerContainer");
    container.innerHTML = `
        <p class="step-indicator">ШАГ: ${currentStep}/${totalSteps}</p>
        <h2 class="step-title">Ваши пожелания</h2>
        <div class="form-container">
        <form id="wishForm"></form>
        </div>
        <div class="button-container">
        <button class="prev-btn" id="prevButton" onclick="goToPrevStep()">&#8592;</button>
        </div>
    `;
    formStructure();
}

function formStructure(){
    const wishWindow = document.getElementById('wishForm');
    wishWindow.innerHTML=`
            <label for="cakeText">Надпись на торт:</label>
            <input type="text" id="cakeText" required>
        </div>
        <div>
            <label for="compositionWish">Пожелания к составу:</label>
            <textarea id="compositionWish" rows="4" required></textarea>
        </div>
        <div class="counter">
            <label for="sweetCount">Количество сладкоежек:</label>
            <button type="button" id="decreaseBtn">-</button>
            <input type="number" id="sweetCount" value="1" min="1" readonly>
            <button type="button" id="increaseBtn">+</button>
        <button type="submit" class="submit-btn">Завершить</button>`;
}

