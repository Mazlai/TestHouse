document.addEventListener('DOMContentLoaded', function() {
  // Variables div
  const homePage = document.querySelector('.home');
  const choosePage = document.querySelector('.token-selection');
  const gamePage = document.querySelector('.all-items');
  const rulesPage = document.querySelector('.rules');
  const themeOptions = document.querySelector('.theme-options');
  const gameElement = document.getElementById('game');
  const playerTurn = document.getElementById('player-turn');
  const afterWin = document.querySelector('.after-win');

  // Variables boutons et textes
  const playerMessage = document.getElementById('player-message');
  const tokenGrid = document.getElementById('token-grid');
  const playButton = document.getElementById('play');
  const rulesButton = document.getElementById('rules');
  const themeBtn = document.getElementById('theme-btn');
  const themeOptionsButtons = document.querySelectorAll('.theme-option');
  const defaultBtn = document.getElementById('default');
  const firstThemeBtn = document.getElementById('theme1');
  const secondThemeBtn = document.getElementById('theme2');
  const startGameButton = document.getElementById('start-game');
  const returnToHomeFromTokenSelectionBtn = document.getElementById('return-to-home-from-token-selection');
  const returnToHomeFromThemesBtn = document.getElementById('return-to-home-from-themes');
  const returnToHomeFromRulesBtn = document.getElementById('return-to-home-from-rules');

  const restartButton = document.getElementById('restart');
  const returnToHomeFromGameBtn = document.getElementById('return-to-home-from-game');

  // Autres variables (localStorage, P4 et stockage des couleurs des jetons)
  let player1TokenColor = null;
  let player2TokenColor = null;
  let currentTheme = localStorage.getItem('currentTheme');

  // Cache tout sauf la page d'accueil
  gamePage.style.display = 'none';
  choosePage.style.display = 'none';
  rulesPage.style.display = 'none';
  themeOptions.style.display = 'none';
  afterWin.style.display = 'none';

  playButton.addEventListener('click', function() {
    // Cache la page d'accueil et affiche la sélection des jetons
    homePage.style.display = 'none';
    choosePage.style.display = 'block';

    player1TokenColor = null;
    player2TokenColor = null;

    // Fonction pour créer les jetons
    async function createTokens() {
      // Supprimez tous les jetons existants
      tokenGrid.innerHTML = '';

      // Charger les couleurs à partir du fichier JSON
      const response = await fetch('./js/p4/p4.json');
      const { colors } = await response.json();

      for (let i = 0; i < 40; i++) { // Créez 40 jetons pour une grille 10x4
        const token = document.createElement('div');
        token.className = 'token-selector'; // Ajoutez la classe token-selector
        tokenGrid.appendChild(token);

        // Appliquez la couleur du fichier JSON au fond du jeton
        const color = colors[i];
        token.style.backgroundColor = color;

        // Ajoutez un écouteur d'événements pour le clic
        token.addEventListener('click', function () {
          // Si le joueur 1 n'a pas encore choisi, attribuez la couleur au joueur 1
          if (player1TokenColor === null) {
              player1TokenColor = color;
              token.classList.add('selected-player1');
              playerMessage.textContent = "C'est au Joueur 2 de sélectionner son jeton.";
          } else if (player2TokenColor === null && color !== player1TokenColor) {
              // Si le joueur 2 n'a pas encore choisi et la couleur est différente de celle du joueur 1, attribuez la couleur au joueur 2
              player2TokenColor = color;
              token.classList.add('selected-player2');
              playerMessage.textContent = "Les joueurs ont sélectionné leurs jetons. Cliquez sur 'Jouer'.";
              startGameButton.style.visibility = 'visible';
          }
          // Si les deux joueurs ont choisi, activez le bouton "Jouer"
          if (player1TokenColor !== null && player2TokenColor !== null) {
              playButton.disabled = false;
          }
        });
      }
    }
    createTokens();
  });

  startGameButton.addEventListener('click', function() {

    // Affiche la grille et le changement de joueur et les pieds de la grille
    const p4 = new P4('#game', player1TokenColor, player2TokenColor);

    choosePage.style.display = 'none';
    gamePage.style.display = 'block';
    playerTurn.style.visibility = 'visible';
    gameElement.classList.add('has-feet');

    // Événements lorsque le bouton de redémarrage est cliqué
    restartButton.addEventListener('click', function() {
      p4.createGrid();
      afterWin.style.display = 'none';
      playerTurn.style.visibility = 'visible';
    });

    // Événement pour le bouton Retour depius la grille
    returnToHomeFromGameBtn.addEventListener('click', function() {
      gamePage.style.display = 'none';
      afterWin.style.display = 'none';
      homePage.style.display = 'block';
    });
  });

  returnToHomeFromTokenSelectionBtn.addEventListener('click', function() {
    choosePage.style.display = 'none';
    homePage.style.display = 'block';
  });

  // Événement pour le bouton Règles
  rulesButton.addEventListener('click', function() {
    homePage.style.display = 'none';
    rulesPage.style.display = 'block';
  });

  // Événement pour le bouton Retour depuis règles
  returnToHomeFromRulesBtn.addEventListener('click', function() {
    homePage.style.display = 'block';
    rulesPage.style.display = 'none';
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
    choosePage.className = `token-selection ${theme}`;
    rulesPage.className = `rules ${theme}`;
    themeOptions.className = `theme-options ${theme}`;

    // Change le thème des boutons
    playButton.className = theme;
    rulesButton.className = theme;
    themeBtn.className = theme;
    defaultBtn.className = theme;
    firstThemeBtn.className = theme;
    secondThemeBtn.className = theme;
    returnToHomeFromTokenSelectionBtn.className = theme;
    returnToHomeFromRulesBtn.className = theme;
    returnToHomeFromThemesBtn.className = theme;

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
  returnToHomeFromThemesBtn.addEventListener('click', function() {
    homePage.style.display = 'block';
    themeOptions.style.display = 'none';
  });
});