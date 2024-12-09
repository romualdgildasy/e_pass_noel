document.addEventListener("DOMContentLoaded", () => {
    const prixTicket = 500; // Prix d'un ticket
    const nombreTicketsInput = document.getElementById("nombreTickets");
    const totalAPayerInput = document.getElementById("totalAPayer");
    const reserveButton = document.getElementById("reserveButton");
    const errorDateReservation = document.getElementById("errorDateReservation");
    const errorNombreTickets = document.getElementById("errorNombreTickets");
    const errorTelephone = document.getElementById("errorTelephone");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");

    // Mettre à jour le total à payer
    nombreTicketsInput.addEventListener("input", () => {
        const nombreTickets = parseInt(nombreTicketsInput.value, 10) || 0;
        totalAPayerInput.value = nombreTickets > 0 ? nombreTickets * prixTicket : "";
    });

    // Validation et soumission du formulaire
    reserveButton.addEventListener("click", async () => {
        let isValid = true;

        // Réinitialiser les messages d'erreur
        errorDateReservation.textContent = "";
        errorNombreTickets.textContent = "";
        errorTelephone.textContent = "";
        errorDateReservation.classList.add("hidden");
        errorNombreTickets.classList.add("hidden");
        errorTelephone.classList.add("hidden");

        // Récupérer les valeurs des champs
        const dateReservation = document.getElementById("dateReservation").value;
        const nombreTickets = nombreTicketsInput.value;
        const telephone = document.getElementById("telephone").value;
        const totalPayer = nombreTickets * prixTicket;

        // Valider les champs localement
        if (!dateReservation) {
            isValid = false;
            errorDateReservation.textContent = "Veuillez sélectionner une date de réservation.";
            errorDateReservation.classList.remove("hidden");
        }

        if (!nombreTickets || nombreTickets <= 0) {
            isValid = false;
            errorNombreTickets.textContent = "Veuillez entrer un nombre de tickets valide.";
            errorNombreTickets.classList.remove("hidden");
        }

        if (!telephone || !/^6[5789]\d{7}$/.test(telephone)) {
            isValid = false;
            errorTelephone.textContent = "Veuillez entrer un numéro de téléphone valide.";
            errorTelephone.classList.remove("hidden");
        }

        if (!isValid) {
            errorMessage.textContent = "Veuillez corriger les erreurs ci-dessus.";
            errorMessage.classList.remove("hidden");
            successMessage.classList.add("hidden");
            return;
        }

        // Appel à l'API si la validation est réussie
        try {
            const response = await axios.post('/api/reservation', {
                dateReservation,
                nombreTickets,
                telephone,
                totalPayer
            });

            if (response.status === 200) {
                successMessage.textContent = "Réservation réussie ! Merci d'avoir réservé.";
                successMessage.classList.remove("hidden");
                errorMessage.classList.add("hidden");
            } else {
                throw new Error('Réponse non attendue');
            }
        } catch (error) {
            errorMessage.textContent = 'Erreur lors de la communication avec le serveur.';
            errorMessage.classList.remove("hidden");
            successMessage.classList.add("hidden");
        }
    });
});
