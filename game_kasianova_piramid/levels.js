document.addEventListener('DOMContentLoaded', function () {
  loadUserData();
  //handleLevelButtons();
});


// function handleLevelButtons() {  
//     if (completedLevels.includes(1)) {
//       document.getElementById('level-2').style.backgroundColor = "#d81b60";
//     }
//     if (completedLevels.includes(2)) {
//       document.getElementById('level-3').disabled = false;
//     }
//   }

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
        window.location.href = 'level-1.html';
      else if(level===2){
        const level_button = document.getElementById('level-2');
        level_button.classList.remove("disabled");
        window.location.href = 'level-2.html';
      }
      else if(level==3){
        const level_button = document.getElementById('level-3');
        level_button.classList.remove("disabled");
        window.location.href = 'level-3.html';
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
  window.location.href = 'index.html';
}