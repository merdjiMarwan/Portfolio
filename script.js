document.addEventListener("DOMContentLoaded", () => {
    gsap.to("section", { opacity: 1, duration: 1, stagger: 0.5 });

    const form = document.getElementById("contact-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Merci pour votre message !");
        form.reset();
    });
});
