// Hero typing animation
const phrases = ['intelligent solutions.', 'meaningful projects.', 'with code & curiosity.'];
const typed = document.querySelector('#typed');
let phraseIndex = 0, charIndex = 0, deleting = false;
function typeText() {
  const phrase = phrases[phraseIndex];
  charIndex += deleting ? -1 : 1;
  typed.textContent = phrase.slice(0, charIndex);
  let delay = deleting ? 45 : 85;
  if (!deleting && charIndex === phrase.length) { deleting = true; delay = 1450; }
  else if (deleting && charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 350; }
  window.setTimeout(typeText, delay);
}
typeText();

// Responsive mobile menu
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? '✕' : '☰';
});
links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = '☰';
}));

// Reveal content when it enters the viewport
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
}

// Cursor glow on pointer devices
const glow = document.querySelector('.cursor-glow');
if (window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
  window.addEventListener('pointermove', event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
    glow.style.opacity = '1';
  }, { passive: true });
}

document.querySelector('#year').textContent = new Date().getFullYear();
