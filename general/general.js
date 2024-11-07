const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.links');

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Останавливаем всплытие, чтобы клик на кнопку не закрывал меню
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике вне меню
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});