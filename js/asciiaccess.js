var isAccessAllowed = false;

// Vérifier s'il y a un paramètre de requête "hex" dans l'URL
var urlParams = new URLSearchParams(window.location.search);
var hexColor = urlParams.get('hex');

if (hexColor === 'a2023c') {
    isAccessAllowed = true;
}

if (!isAccessAllowed) {
    window.location.href = 'index.html'; // Rediriger vers la page non autorisée
}