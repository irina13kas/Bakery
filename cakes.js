function selectOption(optionId) {
    const container = document.querySelector(".catalog-container");
    const option1 = document.getElementById("option1");
    const option2 = document.getElementById("option2");

    // Добавляем нужные классы
    if (optionId === 'option1') {
        option1.style.backgroundColor = '#9c8bff';
        option2.style.border = '2px solid #7B68EE';
        option2.style.backgroundColor = 'transparent';
        container.style.borderColor = '#9c8bff';
        showCatalog();
    } else {
        option2.style.backgroundColor = '#7B68EE';
        option1.style.border = '2px solid #9c8bff';
        option1.style.background = 'transparent';
        container.style.borderColor = '#7B68EE';
        hideCatalog();
    }
}

function hideCatalog() {
    const catalogContainer = document.getElementById('catalogContainer');
    catalogContainer.classList.remove('visible');
    catalogContainer.innerHTML = ''; // Убираем товары, если скрываем каталог
}
// Данные о продуктах
const products = [
    {   name: 'Black&White', 
        price: 1500, image: '.vscode/images/images_1.jpg', 
        description: 'Набор из 12 ванильных капкейков в лаконичном черно-белом оформлении. Ничего лишнего - просто и вкусно', 
        composition: 'Мука, белый сахарный песок, разрыхлитель, молоко нормализованное, масло сливочное, масло растительное, яйца, сыр творожный, сахарная пудра, краситель пищевой "черный", кондитерская посыпка', 
        nutrition: {
            calories: '375.5',
            protein: '3.9',
            fat:'25',
            carbs:'34.7'
        } },
    { name: 'Countryside', price: 1600, image: '.vscode/images/images_2.jpg', description: 'Описание Countryside', composition: 'Состав Countryside', nutrition: 'Калорийность Countryside' },
    { name: 'Sea pearl', price: 1600, image: '.vscode/images/images_3.jpg', description: 'Описание Sea pearl', composition: 'Состав Sea pearl', nutrition: 'Калорийность Sea pearl' },
    { name: 'Red rhapsody', price: 1000, image: '.vscode/images/images_4.jpg', description: 'Описание Red rhapsody', composition: 'Состав Red rhapsody', nutrition: 'Калорийность Red rhapsody' },
    { name: 'Lemon tart', price: 850, image: '.vscode/images/images_5.jpg', description: 'Описание Lemon tart', composition: 'Состав Lemon tart', nutrition: 'Калорийность Lemon tart' },
    { name: 'Blue cheesecake', price: 1000, image: '.vscode/images/images_6.jpg', description: 'Описание Blue cheesecake', composition: 'Состав Blue cheesecake', nutrition: 'Калорийность Blue cheesecake' },
    { name: 'Pavlova set', price: 500, image: '.vscode/images/images_7.jpg', description: 'Описание Pavlova set', composition: 'Состав Pavlova set', nutrition: 'Калорийность Pavlova set' },
    { name: 'Vanilla eclairs', price: 600, image: '.vscode/images/images_8.jpg', description: 'Описание Vanilla eclairs', composition: 'Состав Vanilla eclairs', nutrition: 'Калорийность Vanilla eclairs' },
];

// Функция для отображения каталога
function showCatalog() {
    const catalogContainer = document.getElementById('catalogContainer');
    catalogContainer.classList.add('visible');
    catalogContainer.innerHTML = '';

    products.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('catalog-item');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onclick="showProductModal(${index})">
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
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button" onclick="closeModal()">&times;</span>
                <img class="modal-left" src="${product.image}" alt="${product.name}">
            <div class="modal-right">
                <h2>${product.name}</h2>
                <p class="description"><strong>Описание:</strong>${product.description}</p>
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


