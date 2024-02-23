document.addEventListener('DOMContentLoaded', function() {
  /*----------| Variables |----------*/
  
  // Variables div
  const homePage = document.querySelector('.home');
  const choosePage = document.querySelector('.token-selection');
  const gamePage = document.querySelector('.all-items');
  const rulesPage = document.querySelector('.rules');
  const themeOptions = document.querySelector('.theme-options');
  const gameElement = document.getElementById('game');
  const playerTurn = document.getElementById('player-turn');
  const victoryMessage = document.getElementById('victory-message');
  const afterWin = document.querySelector('.after-win');
  const modeSelectionPage = document.querySelector('.mode-selection');

  // Variables boutons et textes
  const playerMessage = document.getElementById('player-message');
  const tokenGrid = document.getElementById('token-grid');
  const playButton = document.getElementById('play');
  const rulesButton = document.getElementById('rules');
  const themeBtn = document.getElementById('theme-btn');
  const audio = document.getElementById('backgroundMusic');
  const playPauseButton = document.getElementById('playPauseButton');
  const volumeControl = document.getElementById('volumeControl');
  const returnToHubFromHome = document.getElementById('return-to-hub');
  const themeOptionsButtons = document.querySelectorAll('.theme-option');
  const defaultBtn = document.getElementById('default');
  const firstThemeBtn = document.getElementById('theme1');
  const secondThemeBtn = document.getElementById('theme2');
  const startGameButton = document.getElementById('start-game');
  const undoButton = document.getElementById('undoButton');
  const modeNormalButton = document.getElementById('mode-normal');
  const modeCustomButton = document.getElementById('mode-custom');
  const returnToHomeFromTokenSelectionBtn = document.getElementById('return-to-home-from-token-selection');
  const returnToHomeFromThemesBtn = document.getElementById('return-to-home-from-themes');
  const returnToHomeFromRulesBtn = document.getElementById('return-to-home-from-rules');
  const returnToHomeFromModeBtn = document.getElementById('return-to-home-from-mode');

  const restartButton = document.getElementById('restart');
  const returnToHomeFromGameBtn = document.getElementById('return-to-home-from-game');

  // Autres variables (localStorage, P4 et stockage des couleurs des jetons)
  let currentTheme = localStorage.getItem('currentTheme');
  let player1TokenImage = null;
  let player2TokenImage = null;
  let numberOfTokens = 40;

  /*----------| Styles par défaut |----------*/

  // Cache tout sauf la page d'accueil
  gamePage.style.display = 'none';
  choosePage.style.display = 'none';
  rulesPage.style.display = 'none';
  themeOptions.style.display = 'none';
  afterWin.style.display = 'none';
  victoryMessage.style.display = 'none';
  modeSelectionPage.style.display = 'none';

  /*----------| Événements |----------*/

  playButton.addEventListener('click', function() {
    // Cache la page d'accueil et affiche le mode de jeu
    homePage.style.display = 'none';
    modeSelectionPage.style.display = 'block';
  });

  modeNormalButton.addEventListener('click', function() {
    modeSelectionPage.style.display = 'none';
    
    // Images pré-sélectionnées
    const images = [
      { src: "./images/p4/tokens/rouge.jpg", son: "./audio/p4/oof.mp3", victoire: "./audio/p4/oof.mp3" },
      { src: "./images/p4/tokens/jaune.jpg", son: "./audio/p4/oof.mp3", victoire: "./audio/p4/oof.mp3" }
    ];

    // Récupérer les chemins d'images pour les joueurs 1 et 2
    const player1Image = images[0].src;
    const player2Image = images[1].src;

    // Créer une instance de Puissance 4 avec les images pré-sélectionnées
    const p4 = new P4('#game', player1Image, player2Image);

    // Afficher la page de jeu
    gamePage.style.display = 'block';
    playerTurn.style.visibility = 'visible';
    gameElement.classList.add('has-feet');

    // Événements lorsque le bouton de redémarrage est cliqué
    restartButton.addEventListener('click', function() {
      p4.createGrid();
      afterWin.style.display = 'none';
      gameElement.classList.remove('disabled-div'); 
      playerTurn.style.visibility = 'visible';
      victoryMessage.style.display = 'none';
    });

    // Événement pour le bouton Retour depuis la grille de jeu
    returnToHomeFromGameBtn.addEventListener('click', function() {
      p4.resetGame();
      gamePage.style.display = 'none';
      afterWin.style.display = 'none';
      gameElement.classList.remove('disabled-div');
      homePage.style.display = 'block';
      victoryMessage.style.display = 'none';
    });
    
  });

  modeCustomButton.addEventListener('click', function() {
    modeSelectionPage.style.display = 'none';
    choosePage.style.display = 'block';

    player1TokenImage = null;
    player2TokenImage = null;

    createTokens();
  });


  returnToHomeFromModeBtn.addEventListener('click', function() {
    modeSelectionPage.style.display = 'none';
    homePage.style.display = 'block';
  });

  startGameButton.addEventListener('click', function() {
    // Affiche la grille et le changement de joueur et les pieds de la grille
    const p4 = new P4('#game', player1TokenImage, player2TokenImage);

    choosePage.style.display = 'none';
    gamePage.style.display = 'block';
    playerTurn.style.visibility = 'visible';
    gameElement.classList.add('has-feet');

    // Événements lorsque le bouton de redémarrage est cliqué
    restartButton.addEventListener('click', function() {
      p4.createGrid();
      afterWin.style.display = 'none';
      gameElement.classList.remove('disabled-div'); 
      playerTurn.style.visibility = 'visible';
      victoryMessage.style.display = 'none';
    });

    // Événement pour le bouton Retour depius la grille
    returnToHomeFromGameBtn.addEventListener('click', function() {
      p4.resetGame();
      gamePage.style.display = 'none';
      afterWin.style.display = 'none';
      gameElement.classList.remove('disabled-div'); 
      homePage.style.display = 'block';
      victoryMessage.style.display = 'none';
    });
  });

  returnToHomeFromTokenSelectionBtn.addEventListener('click', function() {
    choosePage.style.display = 'none';
    homePage.style.display = 'block';
    resetTokenSelection();
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

  /*----------| Fonctions |----------*/

  // Fonction pour créer les jetons
  async function createTokens() {
    // Supprimez tous les jetons existants
    tokenGrid.innerHTML = '';

    for (let i = 0; i < numberOfTokens; i++) {
      // Création de 40 jetons pour une grille 10x4
      const token = document.createElement('div');
      const image = document.createElement('img');
      token.className = 'token-selector'; // Ajoutez la classe token-selector
      tokenGrid.appendChild(token);

      const imagePath = images[i].src; 
      const soundPath = images[i].son;
      image.src = imagePath;

      token.appendChild(image);

      // Écouteur d'événements pour le clic du jeton
      token.addEventListener('click', function () {
        // Si le joueur 1 n'a pas encore choisi, attribuez la couleur au joueur 1
        if (player1TokenImage === null) {
          const sound = new Audio(soundPath);
          sound.play();
          player1TokenImage = imagePath;
          token.classList.add('selected-player1');
          playerMessage.textContent = "C'est au Joueur 2 de sélectionner son jeton.";
          undoButton.style.visibility = 'visible';
        } else if (player2TokenImage === null && imagePath !== player1TokenImage) {
          // Si le joueur 2 n'a pas encore choisi et la couleur est différente de celle du joueur 1, attribuez la couleur au joueur 2
          const sound = new Audio(soundPath);
          sound.play();
          player2TokenImage = imagePath;
          token.classList.add('selected-player2');
          playerMessage.textContent = "Les joueurs ont sélectionné leurs jetons. Cliquez sur 'Commencer'.";
          startGameButton.style.visibility = 'visible';
        }
        // Si les deux joueurs ont choisi, activez le bouton "Jouer"
        if (player1TokenImage !== null && player2TokenImage !== null) {
          playButton.disabled = false;
        }
      });

      // Écouteur d'événements pour le bouton "Revenir au choix précédent"
      undoButton.addEventListener('click', function() {
        // Logique pour revenir au choix précédent
        if (player2TokenImage !== null) {
            // Si le joueur 2 a choisi, annulez sa sélection
            resetTokenSelection();
            playerMessage.textContent = "C'est au Joueur 1 de sélectionner son jeton.";
            startGameButton.style.visibility = 'hidden';
        } else if (player1TokenImage !== null) {
            // Si le joueur 1 a choisi, annulez sa sélection
            resetTokenSelection();
            playerMessage.textContent = "C'est au Joueur 1 de sélectionner son jeton.";
        }

        // Désactivez le bouton "Revenir au choix précédent"
        undoButton.style.visibility = 'hidden';
      });
    }
  }

  // Fonction pour reset le choix des jetons
  function resetTokenSelection() {
    const tokens = document.querySelectorAll('.token-selector');
    tokens.forEach(token => {
      token.classList.remove('selected-player1', 'selected-player2');
    });
  
    player1TokenImage = null;
    player2TokenImage = null;

    playerMessage.textContent = "C'est au Joueur 1 de sélectionner son jeton.";
  }

  // Fonction pour changer de thème
  function changeTheme(theme) {
    // Change le thème des div + body
    document.body.className = theme;
    homePage.className = `home ${theme}`;
    choosePage.className = `token-selection ${theme}`;
    rulesPage.className = `rules ${theme}`;
    themeOptions.className = `theme-options ${theme}`;
    modeSelectionPage.className = `mode-selection ${theme}`;

    // Change le thème des boutons
    playButton.className = theme;
    rulesButton.className = theme;
    themeBtn.className = theme;
    playPauseButton.className = theme;
    returnToHubFromHome.className = theme;
    defaultBtn.className = theme;
    firstThemeBtn.className = theme;
    secondThemeBtn.className = theme;
    startGameButton.className = theme;
    undoButton.className = theme;
    modeNormalButton.className = theme;
    modeCustomButton.className = theme;
    returnToHomeFromModeBtn.className = theme;
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

  // Événement pour le bouton de lecture/pause
  playPauseButton.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
    }
  });

  // Événement pour le contrôle de volume
  volumeControl.addEventListener('input', function () {
      audio.volume = volumeControl.value;
  });
});