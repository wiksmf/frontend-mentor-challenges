'use strict';

const btnShare = document.querySelector('.btn-share');
const socialIcons = document.querySelector('.social-icon');

btnShare.addEventListener('click', displayOptions);

function displayOptions() {
  socialIcons.classList.toggle('social-icon--open');
  btnShare.classList.toggle('btn--open');
}
