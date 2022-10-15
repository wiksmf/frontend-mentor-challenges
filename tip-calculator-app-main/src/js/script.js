'use strict';

const calculateTip = () => {
  const inputBill = document.querySelector('#bill');
  const inputPeople = document.querySelector('#people');
  const inputTip = document.querySelector('#tip-custom');
  const buttonsTip = document.querySelectorAll('.btn-tip');
  const errorBill = document.querySelector('.error-bill');
  const errorTip = document.querySelector('.error-tip');
  const errorPeople = document.querySelector('.error-people');
  const tipAmountPerPerson = document.querySelector('.amount-value--final');
  const tipTotalPerPerson = document.querySelector('.total-value--final');
  const btnReset = document.querySelector('.btn-reset');

  let isInputBillTouched = false;
  let isInputPeopleTouched = false;
  let isInputTipTouched = false;
  let billValue = 0
  let numberOfPeopleValue = 0
  let tipValue = 0;

  inputBill.addEventListener('input', () => {
    isInputBillTouched = true;

    if (inputBill.value > 0) {
      billValue = inputBill.value;
      removeErrorClass(inputBill, errorBill);
    }

    if (isInputBillTouched && inputBill.value < 1)
      addErrorClass(inputBill, errorBill);

    calculateTip();
  })

  inputPeople.addEventListener('input', () => {
    isInputPeopleTouched = true;

    if (inputPeople.value > 0) {
      numberOfPeopleValue = inputPeople.value;
      removeErrorClass(inputPeople, errorPeople);
    }

    if (isInputPeopleTouched && inputPeople.value < 1)
      addErrorClass(inputPeople, errorPeople);

    calculateTip(billValue, numberOfPeopleValue, tipValue);
  })

  inputTip.addEventListener('input', () => {
    isInputTipTouched = true;

    buttonsTip.forEach(btn => btn.classList.remove('active'));

    if (inputTip.value > 0) {
      tipValue = inputTip.value;
      removeErrorClass(inputTip, errorTip);
    }

    if (isInputTipTouched && inputTip.value < 1)
      addErrorClass(inputTip, errorTip);

    calculateTip(billValue, numberOfPeopleValue, tipValue);
  })

  buttonsTip.forEach(btn => {
    btn.addEventListener('click', () => {
      isInputTipTouched = true;

      buttonsTip.forEach(btn => btn.classList.remove('active'));
      btn.classList.add('active');

      checkInput(btn.dataset.tip, tipValue)

      if (btn.dataset.tip > 0) {
        tipValue = btn.dataset.tip;
        removeErrorClass(inputTip, errorTip);
      }

      if (isInputTipTouched && btn.dataset.tip < 1)
        addErrorClass(inputTip, errorTip);

      calculateTip(billValue, numberOfPeopleValue, tipValue);
    })
  })

  const addErrorClass = (inputElement, errorMessage) => {
    inputElement.classList.add('input-error')
    errorMessage.classList.add('show')
  }

  const removeErrorClass = (inputElement, errorMessage) => {
    inputElement.classList.remove('input-error')
    errorMessage.classList.remove('show')
  }

  const calculateTip = (billValue, numberOfPeopleValue, tipValue) => {
    console.log(billValue, numberOfPeopleValue, tipValue);

    if (billValue && numberOfPeopleValue && tipValue) {
      const tipAmountValue = (((billValue / 100) * tipValue) / numberOfPeopleValue).toFixed(2);
      const totalValue = ((billValue / numberOfPeopleValue) + +tipAmountValue).toFixed(2);

      tipAmountPerPerson.textContent = tipAmountValue;
      tipTotalPerPerson.textContent = totalValue;

      btnReset.classList.add('active');
      btnReset.addEventListener('click', resetInputFields)
    }
  }

  const resetInputFields = () => {
    inputBill.value = '';
    inputPeople.value = '';
    inputTip.value = '';
    buttonsTip.forEach(btn => btn.classList.remove('active'));
    btnReset.classList.remove('active');

    tipAmountPerPerson.textContent = '0.00';
    tipTotalPerPerson.textContent = '0.00';

    removeErrorClass(inputBill, errorBill);
    removeErrorClass(inputPeople, errorPeople);
    removeErrorClass(inputTip, errorTip);
  }
}

calculateTip();