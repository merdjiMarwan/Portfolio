document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const confirmationMessage = document.getElementById("confirmation-message");

    // Cacher le message de confirmation au départ
    confirmationMessage.classList.remove("show");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Empêche la redirection immédiate

        // Envoyer les données à Netlify Forms
        const formData = new FormData(form);
        fetch("/", {
            method: "POST",
            body: formData
        })
        .then(() => {
            // Affiche le message de confirmation
            confirmationMessage.classList.add("show");

            // Réinitialise le formulaire
            form.reset(); 

            // Supprime le message après 5 secondes
            setTimeout(() => {
                confirmationMessage.classList.remove("show");
            }, 5000);
        })
        .catch(error => console.error("Erreur:", error));
    });
});
