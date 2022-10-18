'use strict';

const generatePassword = () => {
  const passwordField = document.querySelector('#password');
  const passwordLengthElement = document.querySelector('.password-option--length');
  const passwordOptionsCheckboxes = [...document.querySelectorAll('input[type="checkbox"]')];
  const strengthInfo = document.querySelector('.strength-info--big');
  const strengthBar = document.querySelectorAll('.strength-bar');
  const passwordLengthInput = document.querySelector('#length');
  const copyPasswordText = document.querySelector('.btn-copy--text');
  const copyPasswordBtn = document.querySelector('.btn-copy');
  const generatePasswordBtn = document.querySelector('.btn-generate');

  const strengthValues = ['too-weak', 'weak', 'medium', 'strong'];
  const charset = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '+-_=$!?*&#.,:;@%^',
  };

  let passwordLengthValue = 0;
  let fullPasswordCharset = '';
  let finalPassword = '';

  const setPasswordLengthValue = () => {
    passwordLengthValue = +passwordLengthInput.value;
    passwordLengthElement.textContent = passwordLengthValue;

    updateInputRange(passwordLengthValue);
  }

  const updateInputRange = (value) => {
    passwordLengthInput.style.background = `linear-gradient(
      to right, #A4FFAF 0%, #A4FFAF ${(value * 5) - .5}%, #18171F ${value * 5}%, #18171F 100%
    )`;
  }

  const addStrengthClass = (maxValue, strengthClass) => {
    strengthBar.forEach(bar => bar.className = 'strength-bar');
    strengthInfo.textContent = strengthValues[maxValue - 1];

    for (let i = 0; i < maxValue; i++)
      strengthBar[i].classList.add(strengthClass);
  }

  const updateStrengthView = () => {
    const getCheckedCheckboxes = passwordOptionsCheckboxes.filter(checkbox => checkbox.checked);

    switch (true) {
      case passwordLengthValue >= 15 && getCheckedCheckboxes.length === 4:
        addStrengthClass(4, 'strength-bar--strong');
        break;
      case passwordLengthValue >= 10 && getCheckedCheckboxes.length >= 3:
        addStrengthClass(3, 'strength-bar--medium');
        break;
      case passwordLengthValue >= 5 && getCheckedCheckboxes.length >= 2:
        addStrengthClass(2, 'strength-bar--weak');
        break;
      default:
        addStrengthClass(1, 'strength-bar--too-weak');
        break;
    }
  }

  const getRandomCharset = (fullPasswordCharset) => {
    return Math.trunc(Math.random() * fullPasswordCharset);
  }

  const getPassword = (getCheckedCheckboxes) => {
    getCheckedCheckboxes.forEach(checkbox => {
      const key = checkbox.getAttribute('id');
      fullPasswordCharset += charset[key];
    });

    for (let i = 0; i < passwordLengthValue; i++)
      finalPassword += fullPasswordCharset[getRandomCharset(fullPasswordCharset.length)];

    return finalPassword;
  }

  const createNewPassword = () => {
    const getCheckedCheckboxes = passwordOptionsCheckboxes.filter(checkbox => checkbox.checked);

    if (passwordLengthValue === 0) return;
    if (getCheckedCheckboxes.length === 0) return;

    fullPasswordCharset = '';
    finalPassword = '';

    passwordField.value = getPassword(getCheckedCheckboxes);
  }

  const copyPassword = () => {
    if (!passwordField) return;

    copyPasswordText.classList.add('show');
    setTimeout(() => copyPasswordText.classList.remove('show'), 1000);

    passwordField.select();
    document.execCommand('copy');
  }

  passwordLengthInput.addEventListener('input', () => {
    setPasswordLengthValue()
    updateStrengthView();
  });
  passwordOptionsCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      updateStrengthView();
    });
  })
  generatePasswordBtn.addEventListener('click', createNewPassword);
  copyPasswordBtn.addEventListener('click', copyPassword);
}

generatePassword();