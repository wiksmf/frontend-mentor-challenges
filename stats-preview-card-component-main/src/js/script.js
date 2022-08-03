'use strict';

// Incrementing counter
const incrementingCounter = () => {
  const counters = document.querySelectorAll('.counter');

  counters.forEach((counter, index) => {
    counter.innerText = 0;

    const updateCounter = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const timer = index === 0 || index === 2 ? 60 : 1;
      const increment = target / 200;

      if (count < target) {
        counter.innerText = `${Math.ceil(count + increment)}`;
        setTimeout(updateCounter, timer);
      } else {
        counter.innerHTML = target;
      }
    }
    updateCounter();
  })
}

// Attribution view management
const attributionManagement = () => {
  const btnAttribution = document.querySelector('.attribution-btn');
  const overlay = document.querySelector('.overlay');

  btnAttribution.addEventListener('click', () => {
    btnAttribution.classList.toggle('show');
    overlay.classList.toggle('hidden');
  });

  overlay.addEventListener('click', e => {
    if (!overlay.classList.contains('hidden')) {
      btnAttribution.classList.remove('show');
      overlay.classList.add('hidden');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && btnAttribution.classList.contains('show')) {
      btnAttribution.classList.remove('show');
      overlay.classList.add('hidden');
    }
  });
};

const init = () => {
  incrementingCounter()
  attributionManagement();
};

init();
