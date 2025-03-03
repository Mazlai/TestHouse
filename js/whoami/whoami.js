// Variables du jeu
let selectedCard1 = null; 
let selectedCard2 = null;
let pickedCard1 = null;
let pickedCard2 = null;  
let currentPlayer = 1;
let playerBoards = {1: null, 2: null};
let allCharacters = [];

// Cache des éléments DOM fréquemment utilisés
const domElements = {
    currentPlayer: document.getElementById('currentPlayer'),
    gameBoard: document.getElementById('gameBoard'),
    boardContainer: document.getElementById('boardContainer'),
    switchButton: document.getElementById('switchButton'),
    guessButton: document.getElementById('guessButton'),
    validateButton: document.getElementById('validateButton'),
    validateButton2: document.getElementById('validateButton2'),
    player1: document.getElementById('player1'),
    player2: document.getElementById('player2'),
    selectedCharacter1: document.getElementById('selectedCharacter1'),
    selectedCharacter2: document.getElementById('selectedCharacter2')
};

// Fonction pour mettre à jour l'affichage du joueur actif
function updateCurrentPlayerDisplay() {
    domElements.currentPlayer.innerText = `Tour du Joueur ${currentPlayer}`;
    domElements.currentPlayer.style.display = 'block';
}

// Fonction pour mélanger un tableau
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Fonction pour récupérer les personnages depuis le fichier JSON
function loadCharacters() {
    fetch("https://mazlai.github.io/TestHouse/js/whoami/characters.json")
        .then(response => response.json())
        .then(data => {
            allCharacters = data.characters;
            displayCharacterCards(allCharacters, 'characterCards');
            displayCharacterCards(allCharacters, 'characterCards2'); 
        })
        .catch(error => console.error('Erreur lors du chargement des personnages:', error));
}

// Fonction pour créer une carte de personnage
function createCharacterCard(character, containerId) {
    const card = document.createElement('div');
    card.className = 'card'; 
    card.dataset.name = character.name;
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">
                <img src="${character.path}" alt="${character.name}" class="character-image" />
            </div>
        </div>
    `;

    return card;
}

// Fonction pour afficher les cartes des personnages
function displayCharacterCards(characters, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; 

    const shuffledCharacters = shuffleArray(characters);
    const fragment = document.createDocumentFragment();

    shuffledCharacters.forEach(character => {
        const card = createCharacterCard(character, containerId);
        
        card.addEventListener('click', () => {
            if (card.classList.contains('revealed')) return;
            
            card.classList.add('revealed', 'zoomed');

            if (containerId === 'characterCards' && !selectedCard1) {
                selectedCard1 = character; 
                pickedCard1 = character;
                displaySelectedCharacter(character.name, 'selectedCharacter1');
                domElements.validateButton.style.display = 'block'; 
                disableOtherCards(containerId);
            } else if (containerId === 'characterCards2' && !selectedCard2) {
                selectedCard2 = character;
                pickedCard2 = character; 
                displaySelectedCharacter(character.name, 'selectedCharacter2');
                domElements.validateButton2.style.display = 'block';
                disableOtherCards(containerId);
            }
        });

        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

// Fonction pour désactiver les autres cartes
function disableOtherCards(containerId) {
    const cards = document.querySelectorAll(`#${containerId} .card`);

    cards.forEach(card => {
        if(!card.classList.contains('revealed')) {
            card.classList.add('hidden'); 
            card.style.pointerEvents = 'none';
        }
    });
}

// Fonction pour afficher le nom du personnage sélectionné
function displaySelectedCharacter(name, elementId) {
    document.getElementById(elementId).innerText = `Sélectionné: ${name}`;
}

// Fonction pour créer une carte pour le plateau
function createBoardCard(character) {
    const card = document.createElement('div');
    card.className = 'card-to-find'; 
    card.dataset.name = character.name;
    card.innerHTML = `
        <div class="card-to-find-inner">
            <div class="card-to-find-front"></div>
            <div class="card-to-find-back">
                <img src="${character.path}" alt="${character.name}" class="character-image-to-find" />
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        card.classList.toggle('secret');
        updateGuessButtonVisibility();
        domElements.switchButton.style.display = 'block';
    });

    return card;
}

// Fonction pour afficher le plateau "Qui-est-ce"
function showGameBoard() {
    domElements.gameBoard.style.display = 'block'; 
    const fragment = document.createDocumentFragment();
    
    if (allCharacters.length > 0) {
        allCharacters.forEach(character => {
            const card = createBoardCard(character);
            fragment.appendChild(card);
        });
        
        domElements.boardContainer.innerHTML = '';
        domElements.boardContainer.appendChild(fragment);
        
        enableGuessingMode();
        updateCurrentPlayerDisplay();
    } else {
        // Récupérer les personnages si pas encore chargés
        fetch("https://mazlai.github.io/TestHouse/js/whoami/characters.json")
            .then(response => response.json())
            .then(data => {
                allCharacters = data.characters;
                showGameBoard();
            })
            .catch(error => console.error('Erreur lors du chargement des personnages:', error));
    }
}

// Fonction pour afficher/cacher le bouton "Deviner"
function updateGuessButtonVisibility() {
    const remainingCards = document.querySelectorAll('.card-to-find:not(.secret)');
    domElements.guessButton.style.display = remainingCards.length === 1 ? 'block' : 'none';
}

// Fonction pour activer le mode "deviner"
function enableGuessingMode() {
    // Utilise un gestionnaire d'événement unique plutôt que de le réattacher à chaque fois
    if (!domElements.guessButton.hasAttribute('listener')) {
        domElements.guessButton.setAttribute('listener', 'true');
        
        domElements.guessButton.addEventListener('click', () => {
            const remainingCard = document.querySelector('.card-to-find:not(.secret)');
            if (!remainingCard) return;

            const guessedName = remainingCard.dataset.name;
            const correctName = currentPlayer === 1 ? pickedCard2.name : pickedCard1.name;

            if (guessedName === correctName) {
                // Le joueur actuel a deviné correctement
                handleVictory(currentPlayer);
            } else {
                // Le joueur actuel s'est trompé, l'adversaire gagne
                displayIncorrectGuessMessage(remainingCard.dataset.name, correctName);
            }
        });
    }
}

// Fonction pour afficher un message lorsque la devinette est incorrecte
function displayIncorrectGuessMessage(guessedName, correctName) {
    const overlay = document.createElement('div');
    const message = document.createElement('div');
    
    overlay.className = 'guess-overlay';
    message.className = 'guess-message';

    message.innerHTML = `
        <p id="lose-message-title">❌ Raté !</p>
        <p id="lose-message-content">Vous avez deviné "${guessedName}", mais la bonne réponse était "${correctName}".</p>
        <p id="lose-message-conclusion">Le joueur adversaire remporte la partie!</p>
    `;

    overlay.appendChild(message);
    document.body.appendChild(overlay);

    // Créer une animation CSS dynamique
    const style = document.createElement('style');
    document.head.appendChild(style);

    // Supprime le message après un délai
    setTimeout(() => {
        document.body.removeChild(overlay);
        window.location.href = "https://mazlai.github.io/TestHouse/whoami.html";
    }, 2000);
}

// Fonction pour gérer la victoire
function handleVictory(winningPlayer) {
    // Masquer tous les éléments du jeu
    document.querySelector('h1').style.display = 'none';
    domElements.currentPlayer.style.display = 'none';
    domElements.gameBoard.style.display = 'none';
    domElements.switchButton.style.display = 'none';
    domElements.guessButton.style.display = 'none';

    // Afficher le message de victoire
    const winMessage = document.getElementById('winMessage');
    const winText = document.getElementById('winText');
    winText.innerText = `🎉 Félicitations ! Le Joueur ${winningPlayer} a trouvé la bonne carte ! 🎉`;
    winMessage.classList.remove('hidden');

    // Lancer la confettis animation
    confetti();

    // Gérer le bouton Quitter (utilise un gestionnaire unique)
    const quitButton = document.getElementById('quitButton');
    if (!quitButton.hasAttribute('listener')) {
        quitButton.setAttribute('listener', 'true');
        quitButton.addEventListener('click', () => {
            window.location.href = 'https://mazlai.github.io/TestHouse/whoami.html';
        });
    }
}

// Fonctions pour gérer l'état du plateau pour chaque joueur
function saveBoardState() {
    // Au lieu de sauvegarder le HTML, on sauvegarde l'état des cartes
    const cardStates = Array.from(document.querySelectorAll('.card-to-find')).map(card => {
        return {
            name: card.dataset.name,
            isSecret: card.classList.contains('secret')
        };
    });
    
    playerBoards[currentPlayer] = cardStates;
}

function restoreBoardState() {
    if (playerBoards[currentPlayer]) {
        const cards = document.querySelectorAll('.card-to-find');
        const savedStates = playerBoards[currentPlayer];
        
        cards.forEach((card, index) => {
            if (index < savedStates.length) {
                // Restaure l'état de la carte
                if (savedStates[index].isSecret) {
                    card.classList.add('secret');
                } else {
                    card.classList.remove('secret');
                }
            }
        });
        
        updateGuessButtonVisibility();
    } else {
        showGameBoard();
    }
}

// Initialisation des écouteurs d'événements (regroupés dans une fonction)
function initializeEventListeners() {
    // Bouton jouer
    document.getElementById('playButton').addEventListener('click', () => {
        document.getElementById('menu').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'block';
        loadCharacters();
    });

    // Validation du choix du joueur 1
    domElements.validateButton.addEventListener('click', () => {
        if (selectedCard1) {
            domElements.player1.style.display = 'none'; 
            domElements.player2.style.display = 'block'; 
            domElements.validateButton.style.display = 'none'; 
        }
    });

    // Validation du choix du joueur 2
    domElements.validateButton2.addEventListener('click', () => {
        if (selectedCard2) {
            domElements.player2.style.display = 'none';
            domElements.validateButton2.style.display = 'none';
            showGameBoard();
        }
    });

    // Valider et passer au joueur suivant
    domElements.switchButton.addEventListener('click', () => {
        saveBoardState();
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateCurrentPlayerDisplay();
        restoreBoardState();
        domElements.switchButton.style.display = 'none';
    });

    // Gestion des règles du jeu
    document.getElementById('rulesButton').addEventListener('click', () => {
        document.getElementById('rulesContainer').style.display = 'block';
        document.getElementById('menu').style.display = 'none';
    });

    // Retour au menu principal
    document.getElementById('backToMenu').addEventListener('click', () => {
        document.getElementById('rulesContainer').style.display = 'none';
        document.getElementById('menu').style.display = 'block';
    });
}

// Initialiser le jeu
initializeEventListeners();