// Lien vers les images des opérateurs
const operatorImages = {
    mtn: "img/mtn_logo.png", // Remplacez par le chemin de votre image MTN
    orange: "img/orange_logo.png", // Remplacez par le chemin de votre image Orange
    unknown: "img/unknown_operator.png" // Image par défaut si non reconnu
};

// Regex pour les préfixes des numéros
const mtnPrefixes = /^(6(5|7|8)[0-9]{6})$/; // MTN : 65x, 67x, 68x
const orangePrefixes = /^(6(9|6)[0-9]{6})$/; // Orange : 69x, 66x

// Références aux éléments HTML
const telephoneInput = document.getElementById("telephone");
const operatorImage = document.getElementById("operatorImage");
const errorTelephone = document.getElementById("errorTelephone");

// Fonction pour détecter l'opérateur
telephoneInput.addEventListener("input", () => {
    const value = telephoneInput.value.trim().replace(/\s+/g, ""); // Supprimer les espaces

    // Réinitialisation des erreurs et image
    errorTelephone.textContent = "";
    operatorImage.classList.add("hidden");

    // Vérifier si le numéro est valide
    if (!/^\+2376[0-9]{8}$/.test(value)) {
        errorTelephone.textContent = "Veuillez entrer un numéro valide (+2376XXXXXXX).";
        errorTelephone.classList.remove("hidden");
        return;
    }

    // Identifier l'opérateur
    const shortNumber = value.substring(4); // Retirer le code pays (+237)
    if (mtnPrefixes.test(shortNumber)) {
        operatorImage.src = operatorImages.mtn;
    } else if (orangePrefixes.test(shortNumber)) {
        operatorImage.src = operatorImages.orange;
    } else {
        operatorImage.src = operatorImages.unknown;
    }

    // Afficher l'image de l'opérateur
    operatorImage.classList.remove("hidden");
});
