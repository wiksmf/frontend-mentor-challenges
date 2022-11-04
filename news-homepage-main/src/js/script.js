'use strict';

const mobileNavigationHandler = () => {
  const mobileNavigationButton = document.querySelectorAll('.btn-nav-menu');
  const mobileNavigationMenu = document.querySelector('.nav-menu');
  const mobileNavigationOverlay = document.querySelector('.menu-overlay');

  for (let button of mobileNavigationButton) {
    button.addEventListener('click', () => {
      mobileNavigationMenu.classList.toggle('open');
      mobileNavigationOverlay.classList.toggle('hidden');
    })
  }

  mobileNavigationOverlay.addEventListener('click', () => {
    mobileNavigationMenu.classList.remove('open');
    mobileNavigationOverlay.classList.add('hidden');
  })
}

mobileNavigationHandler();