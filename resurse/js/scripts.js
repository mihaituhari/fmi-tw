document.addEventListener('DOMContentLoaded', function() {

  /**
   * Grouped buttons.
   *
   * When one is clicked, we activate it and deactivate the others.
   */
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
