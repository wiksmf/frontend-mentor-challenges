'use strict';

const labels = document.querySelectorAll('.input-wrapper label');
const formElement = document.querySelector('.form');
const firstNameInput = document.querySelector('.first-name');
const firstNameError = document.querySelector('.first-name-error');
const lastNameInput = document.querySelector('.last-name');
const lastNameError = document.querySelector('.last-name-error');
const emailInput = document.querySelector('.email');
const emailError = document.querySelector('.email-error');
const passwordInput = document.querySelector('.password');
const passwordError = document.querySelector('.password-error');
const btnSubmitForm = document.querySelector('.btn.btn-submit');
const emailRE = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

const inputLabelManagement = () => {
  labels.forEach(label => {
    label.innerHTML = label.innerText
      .split('')
      .map(
        (letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
      )
      .join('');
  });
}

const displayError = (input, error, email) => {
  input.classList.add('error');
  error.classList.add('show');
  email && input.length > 0 ? input.classList.add('valid') : input.classList.remove('valid');
};

const removeError = (input, error) =>{
  input.classList.remove('error');
  error.classList.remove('show');
  input.classList.add('valid');
};

const formValidation = (e) => {
  e.preventDefault();
  !firstNameInput.value ? displayError(firstNameInput, firstNameError) : removeError(firstNameInput, firstNameError);
  !lastNameInput.value ? displayError(lastNameInput, lastNameError) : removeError(lastNameInput, lastNameError);
  !emailInput.value.match(emailRE) ? displayError(emailInput, emailError, true ) : removeError(emailInput, emailError);
  !passwordInput.value ? displayError(passwordInput, passwordError) : removeError(passwordInput, passwordError);
}

firstNameInput.addEventListener('input', () => {
  !firstNameInput.value ? displayError(firstNameInput, firstNameError) : removeError(firstNameInput, firstNameError);
})

lastNameInput.addEventListener('input', () => {
  !lastNameInput.value ? displayError(lastNameInput, lastNameError) : removeError(lastNameInput, lastNameError);
})

emailInput.addEventListener('input', () => {
  !emailInput.value.match(emailRE) ? displayError(emailInput, emailError, true) : removeError(emailInput, emailError);
})

passwordInput.addEventListener('input', () => {
  !passwordInput.value ? displayError(passwordInput, passwordError) : removeError(passwordInput, passwordError);
})  

formElement.addEventListener('submit', formValidation);

inputLabelManagement();