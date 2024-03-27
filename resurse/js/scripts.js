/**
 * Grouped buttons.
 *
 * When one is clicked, we activate it and deactivate the others.
 */
document.addEventListener('DOMContentLoaded', function() {
  let buttons = document.querySelectorAll('.btn-group .btn');

  buttons.forEach(function(button) {
    button.addEventListener('click', function(event) {
      buttons.forEach(function(btn) {
        btn.classList.remove('active');
      });

      event.target.classList.add('active');
    });
  });
});

/**
 * Website navigation for mobile.
 */
document.addEventListener('DOMContentLoaded', function() {
  let burgerMenu = document.querySelector('.burger-menu');
  let mainMenu = document.querySelector('nav ul');

  burgerMenu.addEventListener('click', function() {
    mainMenu.classList.toggle('open');

    setTimeout(function() {
      mainMenu.querySelectorAll('.nav-text').forEach(function(item) {
        item.classList.toggle('animate');
      });
    }, 200);
  });

  let submenuButtons = document.querySelectorAll('nav ul li a.submenu');

  submenuButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
      event.preventDefault();

      button.parentElement.classList.toggle('active');
    });
  });
});
