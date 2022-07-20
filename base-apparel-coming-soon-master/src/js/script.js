'use strict';

// Function to validate email
const emailValidation = () => {
  const emailFormWrapper = document.querySelector('.email-form-wrapper');
  const userEmail = document.querySelector('.user-email');
  const emailRE = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (!userEmail.value.match(emailRE)) emailFormWrapper.classList.add('email-error');
  else emailFormWrapper.classList.remove('email-error');
};

// Attribution view management
const attributionManagement = () => {
  const btnAttribution = document.querySelector('.attribution-btn');
  const overlay = document.querySelector('.overlay');

  btnAttribution.addEventListener('click', () => {
    btnAttribution.classList.toggle('show');
    overlay.classList.toggle('hidden');
  });

  overlay.addEventListener('click', (e) => {
    if (!overlay.classList.contains('hidden')) {
      btnAttribution.classList.remove('show');
      overlay.classList.add('hidden');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btnAttribution.classList.contains('show')) {
      btnAttribution.classList.remove('show');
      overlay.classList.add('hidden');
    }
  });
};

const init = () => {
  const emailForm = document.querySelector('.email-form');
  const submitButton = document.querySelector('.btn-email');

  submitButton.addEventListener('click', emailValidation);
  emailForm.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      emailValidation();
    }
  });

  attributionManagement();
};

init();
