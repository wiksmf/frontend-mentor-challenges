'use strict';

const btnShare = document.querySelector('.btn-share');
const shareItem = document.querySelector('.share');
const socialIcons = document.querySelector('.social-icon');

btnShare.addEventListener('click', displayOptions);

function displayOptions() {
  socialIcons.classList.toggle('social-icon--open');
  btnShare.classList.toggle('btn--open');
  shareItem.classList.toggle('share--open');
}
