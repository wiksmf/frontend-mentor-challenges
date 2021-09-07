'use strict';

const container = document.querySelector('.container');
const card = document.querySelector('.card');
const profileImg = document.querySelector('.card__profile-photo');
const profileName = document.querySelector('.card__profile-name');
const profileSocial = document.querySelectorAll('.card__social-data');

container.addEventListener('mousemove', e => {
  let x = (window.innerWidth / 2 - e.clientX) / 25;
  let y = (window.innerHeight / 2 - e.clientY) / 25;

  card.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
});

// container.addEventListener('mouseover', () => {
//   profileImg.classList.toggle('update-style');
//   profileName.classList.toggle('update-style');
//   profileSocial.forEach(el => el.classList.toggle('update-style'));
// });

container.addEventListener('mouseleave', e => {
  card.style.transform = 'rotate(0deg)';
});
