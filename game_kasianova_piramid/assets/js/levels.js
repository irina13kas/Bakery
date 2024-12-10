document.addEventListener('DOMContentLoaded', function () {
  loadUserData();
});

function loadUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const username = users[users.length - 1];
    if (username) {
      document.getElementById('user-name').textContent = "Имя: " + username.name;
      document.getElementById('user-score').textContent = username.score+" очков";
    }
  }

    function startLevel(level) {
      if(level===1)
        window.location.href = '/game_kasianova_piramid/level-1/level-1.html';
      else if(level===2){
        window.location.href = '/game_kasianova_piramid/level-2/level-2.html';
      }
      else if(level==3){
        window.location.href = '/game_kasianova_piramid/level-3/level-3.html';
      }
    }

    function checkLevel(level) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (level === 2 && users[users.length-1]['level_1'] || level === 3 && users[users.length-1]['level_2'])
        startLevel(level);
      else
        openModalLevels();     
}

function openModalLevels() {
  document.getElementById("warningModal").classList.add("active");
}

function closeModalLevels() {
  document.getElementById("warningModal").classList.remove("active");
}

function confirmReset(){
  window.location.href = '/game_kasianova_piramid/index.html';
}