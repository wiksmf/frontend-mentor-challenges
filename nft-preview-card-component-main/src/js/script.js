'use strict';

const attribution = document.querySelector('.attribution-information');
const btn = document.querySelector('.attribution__btn');

btn.addEventListener('click', () => {
  attribution.classList.toggle('show');
});
