
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
    saveUser(username);
    closeAuthModal();
});

// Сохраняем данные пользователя при авторизации
function saveUser(name) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = {
      name: name,
      score: 0
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  }

// Функция для отображения окна с рейтингом
function showLeaderboard() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Сортируем пользователей по убыванию очков
    users.sort((a, b) => b.score - a.score);
    
    // Получаем контейнер для списка
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = ''; // Очищаем таблицу перед добавлением новых строк
  
    // Добавляем каждого пользователя в таблицу
    users.forEach(user => {
      const tr = document.createElement('tr');
      const tdName = document.createElement('td');
      const tdScore = document.createElement('td');
      
      tdName.textContent = user.name;
      tdScore.textContent = user.score;
  
      tr.appendChild(tdName);
      tr.appendChild(tdScore);
      leaderboardList.appendChild(tr);
    });
}

document.querySelector(".rank-button").addEventListener("click", () => {
    document.getElementById("leaderboard-modal").classList.add("active");
});
  
  // Функция для закрытия окна рейтинга
  function closeLeaderboard() {
    document.getElementById("leaderboard-modal").classList.remove("active");
  }
  
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

  // Функции для открытия и закрытия окна справки
  document.querySelector(".help-button").addEventListener("click", () => {
    document.getElementById('help-modal').classList.add('active');
});
  
  function closeHelpModal() {
    document.getElementById('help-modal').classList.remove('active');
  }
  
  
