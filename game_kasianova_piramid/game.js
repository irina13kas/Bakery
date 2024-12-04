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
  
  // Переключение звука
let soundEnabled = true;
function toggleSound() {
  const soundIcon = document.getElementById("sound-icon");
  soundEnabled = !soundEnabled;
  soundIcon.innerHTML = soundEnabled ? "🔊" : "🔇";
  console.log(soundEnabled ? "Звук включен." : "Звук отключен.");
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
  
