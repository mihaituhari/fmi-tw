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
      })
    }, 200);
  });

  let submenuItems = document.querySelectorAll('nav ul li');

  submenuItems.forEach(function(item) {
    item.addEventListener('click', function(event) {
      event.preventDefault();

      let childMenu = item.querySelector('ul');

      if (childMenu) {
        item.classList.toggle('active');
        item.blur();
      }
    });
  });
});
