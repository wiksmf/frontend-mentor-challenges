'use strict';

const navigationBtn = document.querySelector('.navigation__btn');
const navigation = document.querySelector('.navigation__nav');

navigationBtn.addEventListener('click', () => {
  navigation.classList.toggle('u-hidden')
  navigation.classList.toggle('navigation__nav--open')
  navigationBtn.classList.toggle('navigation__btn--open')
});