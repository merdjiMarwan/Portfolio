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
            confirmationMessage.style.display = "block"; // Affiche le message
            form.reset(); // Réinitialise le formulaire
        })
        .catch(error => console.error("Erreur:", error));
    });
});
