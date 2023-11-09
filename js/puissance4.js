function main() {
  // Créer un tableau pour stocker les jetons
  const tableauJetons = [];
  for (let i = 0; i < 7; i++) {
    tableauJetons[i] = [];
    for (let j = 0; j < 6; j++) {
      tableauJetons[i][j] = "";
    }
  }

  // Initialiser le jeu
  let tour = "rouge";
  let gagnant = "";

  // Créer un événement pour écouter les clics sur le canvas
  const canvas = document.querySelector("#canvas");
  canvas.addEventListener("click", (event) => {
    // Obtenir la position du clic
    const position = event.clientX / canvas.width * 7;

    // Vérifier si la position est valide
    if (position >= 0 && position < 7) {
      // Placer un jeton
      tableauJetons[position][5 - tableauJetons[position].length] = tour;

      // Vérifier si le jeu est terminé
      gagnant = estGagnant(tableauJetons);
      if (gagnant !== "") {
        alert(`Le joueur ${gagnant} a gagné !`);
      }

      // Changer de tour
      tour = (tour === "rouge" ? "jaune" : "rouge");
    }
  });
}

function estGagnant(tableauJetons) {
  // Vérifier les lignes
  for (let i = 0; i < 7; i++) {
    if (tableauJetons[i][0] === tableauJetons[i][1] &&
      tableauJetons[i][1] === tableauJetons[i][2] &&
      tableauJetons[i][2] === tableauJetons[i][3] &&
      tableauJetons[i][3] === tableauJetons[i][4] &&
      tableauJetons[i][4] !== "") {
      return tableauJetons[i][0];
    }
  }

  // Vérifier les colonnes
  for (let i = 0; i < 6; i++) {
    if (tableauJetons[0][i] === tableauJetons[1][i] &&
      tableauJetons[1][i] === tableauJetons[2][i] &&
      tableauJetons[2][i] === tableauJetons[3][i] &&
      tableauJetons[3][i] === tableauJetons[4][i] &&
      tableauJetons[4][i] !== "") {
      return tableauJetons[0][i];
    }
  }

  // Vérifier les diagonales principales
  if (tableauJetons[0][0] === tableauJetons[1][1] &&
    tableauJetons[1][1] === tableauJetons[2][2] &&
    tableauJetons[2][2] === tableauJetons[3][3] &&
    tableauJetons[3][3] === tableauJetons[4][4] &&
    tableauJetons[4][4] !== "") {
    return tableauJetons[0][0];
  }

  if (tableauJetons[4][0] === tableauJetons[3][1] &&
    tableauJetons[3][1] === tableauJetons[2][2] &&
    tableauJetons[2][2] === tableauJetons[1][3] && tableauJetons[1][3] !== "") {
    return tableauJetons[4][0];
  }

  // Vérifier les diagonales secondaires
  for (let i = 0; i < 3; i++) {
    if (tableauJetons[i][0] === tableauJetons[i + 1][1] &&
      tableauJetons[i + 1][1] === tableauJetons[i + 2][2] &&
      tableauJetons[i + 2][2] === tableauJetons[i + 3][3] &&
      tableauJetons[i + 3][3] !== "") {
      return tableauJetons[i][0];
    }
  }

  // Si aucune combinaison gagnante n'a été trouvée, le jeu n'est pas terminé
  return "";
}

function dessinerJetons(canvas, tableauJetons) {
  // Obtenir la taille d'un jeton
  const tailleJeton = canvas.height / 6;

  // Parcourir le tableau des jetons
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < tableauJetons[i].length; j++) {
      // Obtenir la couleur du jeton
      const couleur = tableauJetons[i][j];

      // Dessiner le jeton
      const context = canvas.getContext("2d");
      context.fillStyle = couleur === "rouge" ? "red" : "yellow";
      context.fillRect(i * tailleJeton, (5 - j) * tailleJeton, tailleJeton, tailleJeton);
    }
  }
}

window.onload = main;
