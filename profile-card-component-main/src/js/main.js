'use strict';

const container = document.querySelector('.container');
const card = document.querySelector('.card');
const profileName = document.querySelector('.card__profile-name');
const profileSocial = document.querySelectorAll('.card__social-data');

container.addEventListener('mousemove', e => {
  let x = (window.innerWidth / 2 - e.clientX) / 7;
  let y = (window.innerHeight / 2 - e.clientY) / 7;

  card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

container.addEventListener('mouseover', () => {
  profileName.classList.toggle('highlight-elements');
  profileSocial.forEach(el => el.classList.toggle('highlight-elements'));
});

container.addEventListener('mouseleave', () => {
  card.style.transform = 'rotate(0)';
});
