document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const confirmationMessage = document.getElementById("confirmation-message");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Empêche la redirection immédiate

        // Envoyer les données à Netlify Forms
        const formData = new FormData(form);
        fetch("/", {
            method: "POST",
            body: formData
        })
        .then(() => {
            confirmationMessage.classList.add("show"); // Affiche le message
            form.reset(); // Réinitialise le formulaire

            // Supprime le message après 5 secondes
            setTimeout(() => {
                confirmationMessage.classList.remove("show");
            }, 5000);
        })
        .catch(error => console.error("Erreur:", error));
    });
});
