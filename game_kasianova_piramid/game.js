
function openAuthModal() {
    const authModal = document.getElementById("auth-modal");
    authModal.classList.add("active");
}

function closeAuthModal() {
    const authModal = document.getElementById("auth-modal");
    authModal.classList.remove("active");
}

document.getElementById("auth-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    alert(`Добро пожаловать, ${username}!`);
    closeAuthModal();
});

// Открытие окна настроек
document.querySelector(".settings-button").addEventListener("click", () => {
    document.getElementById("settings-modal").classList.add("active");
  });
  
  // Закрытие окна настроек
  function closeSettingsModal() {
    document.getElementById("settings-modal").classList.remove("active");
  }

document.addEventListener("DOMContentLoaded", function() {
    const backgroundMusic = document.getElementById("background-music");
    backgroundMusic.play();  // Начинаем воспроизведение музыки
});

// Переключение музыки
let musicPlaying = true;  // Изначально музыка включена

function toggleMusic() {
    const backgroundMusic = document.getElementById("background-music");
  if (musicPlaying) {
    backgroundMusic.pause();  // Останавливаем музыку
    document.getElementById("sound-icon").innerHTML = "🔇";  // Изменяем иконку на перечеркнутую
  } else {
    backgroundMusic.play();  // Включаем музыку
    document.getElementById("sound-icon").innerHTML = "🔊";  // Включаем нормальную иконку
  }
  musicPlaying = !musicPlaying;  // Переключаем состояние
}

// Установка языка
let activeLanguage = "ru";
function setLanguage(lang) {
  activeLanguage = lang;
  document.querySelectorAll(".language-option").forEach((option) => {
    option.classList.remove("active");
  });
  document.getElementById(`language-${lang}`).classList.add("active");
  console.log(`Язык установлен: ${lang === "ru" ? "Русский" : "English"}`);
}

  
  // Показ рейтинга игроков
  function showLeaderboard() {
    alert("Рейтинг игроков пока недоступен.");
    // Добавить логику для отображения рейтинга
  }

  // Функции для открытия и закрытия окна справки
  document.querySelector(".help-button").addEventListener("click", () => {
    document.getElementById('help-modal').classList.add('active');
});
  
  function closeHelpModal() {
    document.getElementById('help-modal').classList.remove('active');
  }
  
  
