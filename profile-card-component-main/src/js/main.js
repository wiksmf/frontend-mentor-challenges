'use strict';

const container = document.querySelector('.container');
const card = document.querySelector('.card');
const profileImg = document.querySelector('.card__profile-photo');
const profileName = document.querySelector('.card__profile-name');
const profileSocial = document.querySelectorAll('.card__social-data');

container.addEventListener('mousemove', e => {
  let x = (window.innerWidth / 2 - e.clientX) / 10;
  let y = (window.innerHeight / 2 - e.clientY) / 10;

  card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

container.addEventListener('mouseover', () => {
  profileImg.classList.toggle('highlight-elements');
  profileName.classList.toggle('highlight-elements');
  profileSocial.forEach(el => el.classList.toggle('highlight-elements'));
});

container.addEventListener('mouseleave', () => {
  card.style.transform = 'rotate(0deg)';
});
