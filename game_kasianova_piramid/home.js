let Score = 0;

function openAuthModal() {
    toggleModal('auth-modal', 'open');
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      toggleModal('auth-modal', 'open');
    }
  });
  
  function closeAuthModal() {
    toggleModal('auth-modal', 'close');
  }

document.getElementById('auth-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    saveUser(username);
    Score = 0;
    window.location.href = 'levels.html';
  });