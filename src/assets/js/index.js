document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  const navToggle = document.querySelector('.nav-toggle');

  // Add click event listener to the toggle button
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('nav--closed');

      // Check if nav has nav--closed class after the toggle
      if (nav.classList.contains('nav--closed')) {
        // Nav is closed - use light-1
        if (header) {
          header.classList.remove('light-2');
          header.classList.add('light-1');
        }
        // Also update the navToggle
        this.classList.remove('light-2');
        this.classList.add('light-1');
      } else {
        // Nav is open - use light-2
        if (header) {
          header.classList.remove('light-1');
          header.classList.add('light-2');
        }
        // Also update the navToggle
        this.classList.remove('light-1');
        this.classList.add('light-2');
      }
    });
  }
});
