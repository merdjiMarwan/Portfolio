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

// Compétences : animation en cascade
gsap.from(".skills-list .skill", {
  scrollTrigger: {
    trigger: ".skills",
    start: "top 80%",
  },
  opacity: 0,
  y: 30,
  stagger: 0.1,
  duration: 0.6,
  ease: "power2.out"
});

// Projets : chaque carte apparaît au scroll
gsap.utils.toArray(".project-card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    delay: i * 0.2,
    ease: "power2.out"
  });
});

// Contact : fade-in au scroll
gsap.from("#contact", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
  },
  opacity: 0,
  y: 100,
  duration: 1.2,
  ease: "power2.out"
});
