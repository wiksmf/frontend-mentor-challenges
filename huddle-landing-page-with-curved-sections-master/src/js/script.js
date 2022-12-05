'use strict';

const useruserEmailValidation = () => {
  const userEmail = document.querySelector('#subscribe-email');
  const errorMessage = document.querySelector('.error-input');
  const emailRE = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (!userEmail.value.match(emailRE)) {
    userEmail.classList.add('error');
    errorMessage.classList.add('show');
  } else {
    userEmail.classList.remove('error');
    errorMessage.classList.remove('show');
  }
};

const init = () => {
  const newsletterForm = document.querySelector('.subscribe-form');
  const submitNewsletterFormButton = document.querySelector('.btn-subscribe--footer');

  submitNewsletterFormButton.addEventListener('click', (e) => {
    e.preventDefault();
    userEmailValidation();
  });

  newsletterForm.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      userEmailValidation();
    }
  });
};

init();
