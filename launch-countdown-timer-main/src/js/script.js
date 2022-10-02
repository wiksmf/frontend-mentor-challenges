'use strict';

const countdownTimer = () => {
  const currentDate = new Date();
  const countdownFromDate = currentDate.setDate(currentDate.getDate() + 14);

  setInterval(() => {
    const currentDate = new Date();
    const timeBetweenDates = countdownFromDate - currentDate;

    flipAllCards(timeBetweenDates);
  }, 250);

  const flipAllCards = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    flipCard(document.querySelector('[data-days]'), days);
    flipCard(document.querySelector('[data-hours]'), hours);
    flipCard(document.querySelector('[data-minutes]'), minutes);
    flipCard(document.querySelector('[data-seconds]'), seconds);
  };

  const flipCard = (card, updatedTimeValue) => {
    const topHalf = card.querySelector('.top');
    const bottomHalf = card.querySelector('.bottom');
    const currentTimeValue = +topHalf.textContent;

    if (updatedTimeValue === currentTimeValue) return;

    const topFlip = document.createElement('div');
    const bottomFlip = document.createElement('div');

    topFlip.classList.add('top-flip');
    bottomFlip.classList.add('bottom-flip');

    top.textContent = getTimeValueToDisplay(currentTimeValue);
    bottomHalf.textContent = getTimeValueToDisplay(currentTimeValue);
    topFlip.textContent = getTimeValueToDisplay(currentTimeValue);
    bottomFlip.textContent = getTimeValueToDisplay(updatedTimeValue);

    topFlip.addEventListener('animationstart', () => {
      topHalf.textContent = getTimeValueToDisplay(updatedTimeValue);
    });

    topFlip.addEventListener('animationend', () => {
      topFlip.remove();
    });

    bottomFlip.addEventListener('animationend', () => {
      bottomHalf.textContent = getTimeValueToDisplay(updatedTimeValue);
      bottomFlip.remove();
    });

    card.append(topFlip, bottomFlip);
  };

  const getTimeValueToDisplay = (timeValue) => {
    return timeValue < 10 ? `0${timeValue}` : timeValue === 0 ? '00' : timeValue;
  };
};

countdownTimer();
