// Masquer l'animation de chargement une fois la page chargée
window.addEventListener('load', function() {
    const loadingAnimation = document.getElementById('loading-animation');
    loadingAnimation.style.display = 'none';
});

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

    // Créer un contexte audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let hoverBuffer, clickBuffer;

    // Charger les sons
    fetch('survol.mp3')
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(buffer => {
        hoverBuffer = buffer;
        console.log("Son de survol chargé");
      })
      .catch(error => console.error('Erreur de chargement du son de survol:', error));

    fetch('click.mp3')
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(buffer => {
        clickBuffer = buffer;
        console.log("Son de clic chargé");
      })
      .catch(error => console.error('Erreur de chargement du son de clic:', error));

    // Fonction pour jouer un segment spécifique du fichier audio
    function playAudioSegment(buffer, startTime, duration) {
      if (!buffer) return; // Vérifier si le buffer est chargé

      const source = audioContext.createBufferSource();
      source.buffer = buffer;

      // Connecter la source à la destination (haut-parleurs)
      source.connect(audioContext.destination);

      // Jouer uniquement la partie spécifique
      source.start(0, startTime, duration);
    }

    // Ajouter des événements de survol et de clic aux éléments
    document.querySelectorAll('a, button, .project-card, .skill').forEach(element => {
        element.addEventListener('mouseenter', () => {
            playAudioSegment(hoverBuffer, 0, 1); // Jouer la première seconde du son de survol
        });

        element.addEventListener('click', () => {
            playAudioSegment(clickBuffer, 0, 1); // Jouer la première seconde du son de clic
        });
    });

    // Ajouter un événement de survol pour l'image "marwan2"
    const marwanImage = document.querySelector('.hero-img img');
    if (marwanImage) {
        marwanImage.addEventListener('mouseenter', () => {
            playAudioSegment(hoverBuffer, 0, 1); // Jouer la première seconde du son de survol
        });
    }

    // Ajouter un événement de survol pour le logo
    const logoImage = document.querySelector('.logo img');
    if (logoImage) {
        logoImage.addEventListener('mouseenter', () => {
            playAudioSegment(hoverBuffer, 0, 1); // Jouer la première seconde du son de survol
        });
    }
});

// Défilement fluide pour les liens de navigation
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Animation des sections lors du défilement
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1
  }
);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Bascule entre les modes clair et sombre
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode')
      ? '☀️'
      : '🌙';
  });
}
