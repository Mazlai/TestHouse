document.addEventListener('DOMContentLoaded', function() {
  // Variables div
  const homePage = document.querySelector('.home');
  const gamePage = document.querySelector('.all-items');
  const themeOptions = document.querySelector('.theme-options');
  const gameElement = document.getElementById('game');
  const playerTurn = document.getElementById('player-turn');
  const afterWin = document.querySelector('.after-win');

  // Variables boutons
  const playButton = document.getElementById('play');
  const rulesButton = document.getElementById('rules');
  const themeBtn = document.getElementById('theme-btn');
  const themeOptionsButtons = document.querySelectorAll('.theme-option');
  const defaultBtn = document.getElementById('default');
  const firstThemeBtn = document.getElementById('theme1');
  const secondThemeBtn = document.getElementById('theme2');
  const returnBtn = document.getElementById('return-btn');

  const restartButton = document.getElementById('restart');
  const returnToHomeBtn = document.getElementById('return-to-home');

  // Autres variables (localStorage et P4)
  let currentTheme = localStorage.getItem('currentTheme');
  const p4 = new P4('#game');

  // Cache tout sauf la page d'accueil
  gamePage.style.display = 'none';
  themeOptions.style.display = 'none';
  afterWin.style.display = 'none';

  // Événement pour le bouton Jouer
  playButton.addEventListener('click', function() {
    // Cache la page d'accueil
    homePage.style.display = 'none';

    // Affiche la grille et le changement de joueur et les pieds de la grille
    gamePage.style.display = 'block';
    playerTurn.style.visibility = 'visible';
    gameElement.classList.add('has-feet');

    // Événements lorsque le bouton de redémarrage est cliqué
    restartButton.addEventListener('click', function() {
      gameElement.innerHTML = '';
      p4.createGrid();
      afterWin.style.display = 'none';
      playerTurn.style.visibility = 'visible';
    });
  });

  // Événement pour le bouton Retour depius la grille
  returnToHomeBtn.addEventListener('click', function() {
    gamePage.style.display = 'none';
    afterWin.style.display = 'none';
    homePage.style.display = 'block';
  });

  // Événement pour le bouton Thème
  themeBtn.addEventListener('click', function() {
    homePage.style.display = 'none';
    themeOptions.style.display = 'block';
  });

  // Fonction pour changer de thème
  function changeTheme(theme) {
    // Change le thème des div + body
    document.body.className = theme;
    homePage.className = `home ${theme}`;
    themeOptions.className = `theme-options ${theme}`;

    // Change le thème des boutons
    playButton.className = theme;
    rulesButton.className = theme;
    themeBtn.className = theme;
    defaultBtn.className = theme;
    firstThemeBtn.className = theme;
    secondThemeBtn.className = theme;
    returnBtn.className = theme;

    // Enregistre le thème actuel dans le localStorage
    localStorage.setItem('currentTheme', theme);
  }

  // Si le thème n'est pas défini dans le localStorage, utilisez le thème par défaut
  if (!currentTheme) {
    currentTheme = 'default';
  } else {
    // Sinon, changez le thème actuel
    changeTheme(currentTheme);
  }

  // Événements pour les options de thème
  themeOptionsButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const theme = button.id;
      changeTheme(theme);
    });
  });

  // Événement pour le bouton Retour depuis thèmes
  returnBtn.addEventListener('click', function() {
    homePage.style.display = 'block';
    themeOptions.style.display = 'none';
  });
});