'use strict';

const formInputManagement = () => {
  const sectionCardForm = document.querySelector('.section-card-form');
  const sectionThankYou = document.querySelector('.section-thank-you');
  const inputCardholderName = document.querySelector('.input-cardholder-name');
  const inputAccountNumber = document.querySelector('.input-account-number');
  const inputExpirationDateMM = document.querySelector('.input-expiration-date--month');
  const inputExpirationDateYY = document.querySelector('.input-expiration-date--year');
  const inputCvcNumber = document.querySelector('.input-cvc-number');
  const cardCardholderName = document.querySelector('.card-cardholder-name');
  const cardAccountNumber = document.querySelector('.card-account-number');
  const cardExpirationDateMM = document.querySelector('.card-expiration-date--mm');
  const cardExpirationDateYY = document.querySelector('.card-expiration-date--yy');
  const cardCvcNumber = document.querySelector('.card-cvc-number');
  const errorCardholderName = document.querySelector('.error-cardholder-name');
  const errorAccountNumber = document.querySelector('.error-account-number');
  const errorExpirationDateMM = document.querySelector('.error-expiration-date--month');
  const errorExpirationDateYY = document.querySelector('.error-expiration-date--year');
  const errorCvcNumber = document.querySelector('.error-cvc-number');
  const submitBtn = document.querySelector('.btn.btn-submit');
  const continueBtn = document.querySelector('.btn.btn-continue');

  let hasCardholderNameInputValue = false;
  let hasAccountNumberInputValue = false;
  let hasExpirationDateMMInputValue = false;
  let hasExpirationDateYYInputValue = false;
  let hasCvcNumberValue = false;

  inputCardholderName.addEventListener('input', () => {
    allowOnlyLetters(inputCardholderName);
    limitNumbers(inputCardholderName, 24);
    updateCardView(inputCardholderName, cardCardholderName);
  })

  inputAccountNumber.addEventListener('input', () => {
    setInputSpaces(inputAccountNumber);
    limitNumbers(inputAccountNumber, 19);
    updateCardView(inputAccountNumber, cardAccountNumber);
  })

  inputExpirationDateMM.addEventListener('input', () => {
    allowOnlyNumbers(inputExpirationDateMM);
    limitNumbers(inputExpirationDateMM, 2);
    updateCardViewPreserveZeros(inputExpirationDateMM, cardExpirationDateMM);
  })

  inputExpirationDateYY.addEventListener('input', () => {
    allowOnlyNumbers(inputExpirationDateYY);
    limitNumbers(inputExpirationDateYY, 2);
    updateCardViewPreserveZeros(inputExpirationDateYY, cardExpirationDateYY);
  })

  inputCvcNumber.addEventListener('input', () => {
    allowOnlyNumbers(inputCvcNumber);
    limitNumbers(inputCvcNumber, 3);
    updateCardView(inputCvcNumber, cardCvcNumber);
  });

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    checkIfAllInputHaveValue();
    if (
      hasCardholderNameInputValue &&
      hasAccountNumberInputValue &&
      hasExpirationDateMMInputValue &&
      hasExpirationDateYYInputValue &&
      hasCvcNumberValue
    ) showThankYouMessage()
  })

  continueBtn.addEventListener('click', (e) => {
    showCardForm()
  })

  const allowOnlyLetters = (inputElement) => {
    inputElement.value = inputElement.value.replace(/[^A-Za-z]/g, '').trim();
  }

  const allowOnlyNumbers = (inputElement) => {
    inputElement.value = inputElement.value.replace(/\D+/g, '').trim();
  }

  const setInputSpaces = (inputElement) => {
    inputElement.value = inputElement.value.replace(/\D+/g, '').replace(/(.{4})/g, '$1 ').trim();
  }

  const limitNumbers = (inputElement, inputMaxLength) => {
    if (inputElement.value.length > inputMaxLength)
      inputElement.value = inputElement.value.substring(0, inputMaxLength)
  }

  const updateCardView = (inputElement, cardElement) => {
    cardElement.textContent = inputElement.value;
  }

  const updateCardViewPreserveZeros = (inputElement, cardElement) => {
    if (typeof +inputElement.value === 'number' && inputElement.value.length < 2)
      cardElement.textContent = `0${inputElement.value}`;
    else updateCardView(inputElement, cardElement);
  }

  const showErrorMessage = (inputElement, errorElement) => {
    inputElement.classList.add('input-error');
    errorElement.classList.add('show-error')
  }

  const removeErrorMessage = (inputElement, errorElement) => {
    inputElement.classList.remove('input-error');
    errorElement.classList.remove('show-error')
  }

  const checkIfAllInputHaveValue = () => {
    const getCurrentYear = +('' + new Date().getFullYear()).substring(2);

    if (inputCardholderName.value.length < 3) {
      showErrorMessage(inputCardholderName, errorCardholderName);
      hasCardholderNameInputValue = false;
    } else {
      removeErrorMessage(inputCardholderName, errorCardholderName);
      hasCardholderNameInputValue = true;
    }

    if (inputAccountNumber.value.length < 19) {
      showErrorMessage(inputAccountNumber, errorAccountNumber);
      hasAccountNumberInputValue = false;
    } else {
      removeErrorMessage(inputAccountNumber, errorAccountNumber);
      hasAccountNumberInputValue = true;
    }

    if (inputExpirationDateMM.value.length <= 0 ||
      inputExpirationDateMM.value < 1 ||
      inputExpirationDateMM.value > 12) {
      showErrorMessage(inputExpirationDateMM, errorExpirationDateMM);
      hasExpirationDateMMInputValue = false;
    } else {
      removeErrorMessage(inputExpirationDateMM, errorExpirationDateMM);
      hasExpirationDateMMInputValue = true;
    }

    if (inputExpirationDateYY.value.length <= 0 ||
      inputExpirationDateYY.value <= getCurrentYear) {
      showErrorMessage(inputExpirationDateYY, errorExpirationDateYY);
      hasExpirationDateYYInputValue = false;
    } else {
      removeErrorMessage(inputExpirationDateYY, errorExpirationDateYY);
      hasExpirationDateYYInputValue = true;
    }

    if (inputCvcNumber.value.length < 3) {
      showErrorMessage(inputCvcNumber, errorCvcNumber);
      hasCvcNumberValue = false;
    } else {
      removeErrorMessage(inputCvcNumber, errorCvcNumber);
      hasCvcNumberValue = true;
    }
  }

  const showThankYouMessage = () => {
    sectionCardForm.classList.add('hide');
    sectionThankYou.classList.remove('hide');
  }

  const showCardForm = () => {
    sectionCardForm.classList.remove('hide');
    sectionThankYou.classList.add('hide');

    resetInputValue();
    resetCardValue();
  }

  const resetInputValue = () => {
    inputCardholderName.value = '';
    inputAccountNumber.value = '';
    inputExpirationDateMM.value = '';
    inputExpirationDateYY.value = '';
    inputCvcNumber.value = '';
  }

  const resetCardValue = () => {
    cardCardholderName.textContent = 'Jane Appleseed';
    cardAccountNumber.textContent = '0000 0000 0000 0000';
    cardExpirationDateMM.textContent = '00';
    cardExpirationDateYY.textContent = '00';
    cardCvcNumber.textContent = '000';
  }
}

formInputManagement();