'use strict';

const form = document.querySelector('.form');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const password = document.querySelector('#pwd');

const regEx = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  pwd: /(?=.*\d)(?=.*[a-zA-Z])\w{7,}/,
};

form.addEventListener('submit', e => {
  e.preventDefault();

  !firstName.value ? displayError(firstName) : removeError(firstName);
  !lastName.value ? displayError(lastName) : removeError(lastName);

  !regEx.email.test(email.value)
    ? displayError(email, 'email@example/com')
    : removeError(email);

  !regEx.pwd.test(password.value)
    ? displayError(password)
    : removeError(password);
});

function displayError(input, placeholder = '') {
  input.classList.add('error__input');
  input.nextElementSibling.classList.remove('u-hidden');
  input.setAttribute('placeholder', placeholder);
}

function removeError(input) {
  input.classList.remove('error__input');
  input.nextElementSibling.classList.add('u-hidden');
}
