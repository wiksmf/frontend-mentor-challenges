'use strict';

const switchPlanView = () => {
  const btnPlanSwitcher = document.querySelector('.btn-price-switcher');
  const cardsFace = document.querySelectorAll('.card-face');

  const switchPlan = () => {
    cardsFace.forEach(card => {
      card.classList.toggle('is-flipped');
    })
  }

  btnPlanSwitcher.addEventListener('click', () => {
    switchPlan();
    btnPlanSwitcher.classList.toggle('switch');
  });
}

switchPlanView();