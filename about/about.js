document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 /* 10% элемента должно быть видно для срабатывания */
    });

    // Выбираем все элементы, которые должны анимироваться при прокрутке
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));
});

// Получаем кнопку по ID
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Функция для прокрутки наверх
function scrollToTop() {
window.scrollTo({
    top: 0,
    behavior: 'smooth' // Плавная прокрутка
});
}

// Показываем кнопку при скролле
window.addEventListener('scroll', () => {
// Если страница прокручена больше чем на 100px
if (window.scrollY > 100) {
    scrollToTopBtn.classList.add('show', 'moving'); // Показываем кнопку и запускаем движение вниз
} else {
    scrollToTopBtn.classList.remove('show', 'moving'); // Прячем кнопку
}
});

// Добавляем событие клика по кнопке
scrollToTopBtn.addEventListener('click', scrollToTop);