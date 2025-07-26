gsap.registerPlugin(ScrollTrigger);

// Navbar : fade-in au chargement
gsap.from("nav", {
  y: -50,
  opacity: 0,
  duration: 1,
  ease: "power2.out"
});

// Héros : apparition image et texte
gsap.from(".hero-img img", {
  opacity: 0,
  y: -100,
  scale: 0.8,
  duration: 1.5,
  ease: "power2.out"
});

gsap.from(".hero-text", {
  opacity: 0,
  x: 100,
  duration: 1.2,
  delay: 0.5,
  ease: "power2.out"
});

// Fonctions animation Compétences et Projets
function animateSkills() {
  gsap.set(".skills-list .skill", { opacity: 0, y: 30 });
  gsap.to(".skills-list .skill", {
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: "power2.out"
  });
}

function animateProjects() {
  const cards = gsap.utils.toArray(".project-card");
  gsap.set(cards, { opacity: 0, y: 50 });
  cards.forEach((card, i) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: i * 0.3,
      ease: "power2.out"
    });
  });
}

// Au clic n'importe où dans la page, on lance les deux animations
document.addEventListener("click", () => {
  animateSkills();
  animateProjects();
});
