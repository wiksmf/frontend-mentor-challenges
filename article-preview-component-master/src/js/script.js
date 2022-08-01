'use strict';

// Share section management
const shareToggle = () => {
  const btnShare = document.querySelectorAll('.btn.btn-share');
  const socialsPopup = document.querySelector('.user-socials');

  for (const btn of btnShare) {
    btn.addEventListener('click', () => {
      socialsPopup.classList.toggle('show');
      btn.classList.toggle('active');
    })
  }
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
  attributionManagement();
  shareToggle();
};

init();
