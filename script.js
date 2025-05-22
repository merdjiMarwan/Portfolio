// Masquer l'animation de chargement une fois la page chargée
window.addEventListener('load', function () {
    const loadingAnimation = document.getElementById('loading-animation');
    loadingAnimation.style.display = 'none';
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const confirmationMessage = document.getElementById("confirmation-message");
    const sections = document.querySelectorAll('section');
    const menuLinks = document.querySelectorAll('.menu a');
    const soundToggle = document.getElementById('sound-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const marwanImage = document.querySelector('.hero-img img');
    const logoImage = document.querySelector('.logo img');

    // Variables pour l'AudioContext
    let audioContext;
    let hoverBuffer, clickBuffer;
    let soundEnabled = true;

    // Message de confirmation (formulaire)
    confirmationMessage.classList.remove("show");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        fetch("/", {
            method: "POST",
            body: formData
        })
            .then(() => {
                confirmationMessage.classList.add("show");
                form.reset();
                setTimeout(() => confirmationMessage.classList.remove("show"), 5000);
            })
            .catch(error => console.error("Erreur:", error));
    });

    // Fonction pour initialiser l'AudioContext après une interaction utilisateur
    function initAudioContext() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            loadAudioFiles();
        }
    }

    // Charger les fichiers audio
    function loadAudioFiles() {
        fetch('survol.mp3')
            .then(res => res.arrayBuffer())
            .then(buf => audioContext.decodeAudioData(buf))
            .then(decoded => hoverBuffer = decoded)
            .catch(err => console.error('Erreur survol:', err));

        fetch('click.mp3')
            .then(res => res.arrayBuffer())
            .then(buf => audioContext.decodeAudioData(buf))
            .then(decoded => clickBuffer = decoded)
            .catch(err => console.error('Erreur clic:', err));
    }

    // Fonction pour jouer un segment audio
    function playAudioSegment(buffer, startTime, duration) {
        if (!buffer || !soundEnabled || !audioContext) return;
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0, startTime, duration);
    }

    // Ajouter un écouteur d'événement pour initialiser l'AudioContext après un clic
    document.addEventListener('click', () => {
        initAudioContext();
        // Retirer l'écouteur d'événement après l'initialisation pour éviter de le déclencher plusieurs fois
        document.removeEventListener('click', initAudioContext);
    });

    // Ajouter des écouteurs d'événement pour les éléments interactifs
    document.querySelectorAll('a, button, .project-card, .skill').forEach(el => {
        el.addEventListener('mouseenter', () => playAudioSegment(hoverBuffer, 0, 1));
        el.addEventListener('click', () => playAudioSegment(clickBuffer, 0, 1));
    });

    if (marwanImage) marwanImage.addEventListener('mouseenter', () => playAudioSegment(hoverBuffer, 0, 1));
    if (logoImage) logoImage.addEventListener('mouseenter', () => playAudioSegment(hoverBuffer, 0, 1));

    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            soundToggle.classList.toggle('sound-off');
            soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
        });
    }

    // Scroll fluide
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Observer pour l'apparition des sections
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    sections.forEach(section => observer.observe(section));

    // Thème clair/sombre
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            themeToggle.classList.toggle('dark-mode');
            themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        });
    }

    // Mise à jour automatique de la classe active selon le scroll
    function updateActiveMenuItem() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSectionId = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveMenuItem);

    updateActiveMenuItem(); // Init
});
