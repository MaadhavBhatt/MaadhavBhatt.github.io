/**
 * Convention:
 * 1. typewriter: the typewriter element with the full name visible when screen-width >= 750px.
 * 2. first typewriter: the typewriter element with the first name visible when screen-width < 750px.
 * 3. second typewriter: the typewriter element with the second name visible when screen-width < 750px.
 */

// Handles which typewriter to show based on screen width.
function handleTypewriterVisibility() {
  var w = window.innerWidth;

  const largeHeading = document.querySelector('#large-heading');
  const splitHeading1 = document.querySelector('#split-heading-1');
  const splitHeading2 = document.querySelector('#split-heading-2');

  if (w >= 600) {
    largeHeading.classList.remove('d-none');
    splitHeading1.classList.add('d-none');
    splitHeading2.classList.add('d-none');
  } else {
    largeHeading.classList.add('d-none');
    splitHeading1.classList.remove('d-none');
    splitHeading2.classList.remove('d-none');
  }
}

// Handles the typewriter fade delay based on screen width.
function handleTypewriterFadeDelay() {
  var w = window.innerWidth;

  const typewriterFade = document.querySelectorAll('.typewriter-fade');
  const typewriter = document.querySelector('.typewriter');
  const firstTypewriter = document.querySelector('.typewriter-1');
  const secondTypewriter = document.querySelector('.typewriter-2');

  let typewriterFadeDelay;

  if (w >= 925) {
    // The cursor delay and the reveal delay are the same in the singular typewriter.
    let delay = window.getComputedStyle(typewriter).getPropertyValue('--typewriter-cursor-delay');
    let speed = window.getComputedStyle(typewriter).getPropertyValue('--typewriter-speed');

    speed = parseFloat(speed.split('s')[0]);
    delay = parseFloat(delay.split('s')[0]);

    typewriterFadeDelay = speed + delay;
    typewriterFadeDelay = typewriterFadeDelay.toString() + 's';
  } else {
    let delay = [
      // The cursor delay and the reveal delay are the same in the first typewriter.
      window.getComputedStyle(firstTypewriter).getPropertyValue('--typewriter-cursor-delay'),
      window.getComputedStyle(secondTypewriter).getPropertyValue('--typewriter-cursor-delay'),
      window.getComputedStyle(secondTypewriter).getPropertyValue('--typewriter-reveal-delay'),
    ];
    let speed = [
      window.getComputedStyle(firstTypewriter).getPropertyValue('--typewriter-speed'),
      window.getComputedStyle(secondTypewriter).getPropertyValue('--typewriter-speed'),
    ];

    speed = speed.map((s) => parseFloat(s.split('s')[0]));
    delay = delay.map((d) => parseFloat(d.split('s')[0]));

    typewriterFadeDelay = speed[0] + delay[0] + speed[1] + delay[1];
    typewriterFadeDelay = typewriterFadeDelay.toString() + 's';
  }

  typewriterFade.forEach((element) => {
    element.style.setProperty('--typewriter-fade-delay', typewriterFadeDelay);
  });
}

window.addEventListener('load', handleTypewriterVisibility);
window.addEventListener('resize', handleTypewriterVisibility);
window.addEventListener('load', handleTypewriterFadeDelay);

// Reset typewriter cursor display related custom property to avoid problems on reload.
window.addEventListener('DOMContentLoaded', () => {
  const firstTypewriter = document.querySelector('.typewriter-1');
  const secondTypewriter = document.querySelector('.typewriter-2');

  firstTypewriter.style.setProperty('--show-typewriter', 'block');
  secondTypewriter.style.setProperty('--show-typewriter', 'none');
});

// Show second typewriter cursor after 5 seconds.
setTimeout(() => {
  const firstTypewriter = document.querySelector('.typewriter-1');
  const secondTypewriter = document.querySelector('.typewriter-2');

  firstTypewriter.style.setProperty('--show-typewriter', 'none');
  secondTypewriter.style.setProperty('--show-typewriter', 'block');
}, 2000);

// Remove the typewriter cursor after 10 seconds.
setTimeout(() => {
  const typewriter = document.querySelector('.typewriter');
  const firstTypewriter = document.querySelector('.typewriter-1');
  const secondTypewriter = document.querySelector('.typewriter-2');

  typewriter.style.setProperty('--show-typewriter', 'none');
  firstTypewriter.style.setProperty('--show-typewriter', 'none');
  secondTypewriter.style.setProperty('--show-typewriter', 'none');

  // Remove typewriter related classes
  const typewriterElements = document.querySelectorAll(
    '.typewriter, .typewriter-1, .typewriter-2, .typewriter-fade'
  );
  typewriterElements.forEach((element) => {
    // Remove typewriter classes
    element.classList.remove('typewriter', 'typewriter-1', 'typewriter-2', 'typewriter-fade');

    // Make sure the text is fully visible
    element.style.width = 'auto';
    element.style.animation = 'none';
    element.style.opacity = '1';

    // Remove any typewriter-specific styles
    element.style.setProperty('--typewriter-speed', '0s');
    element.style.setProperty('--typewriter-cursor-delay', '0s');
    element.style.setProperty('--typewriter-reveal-delay', '0s');
    element.style.setProperty('--typewriter-fade-delay', '0s');
  });
}, 5000);
