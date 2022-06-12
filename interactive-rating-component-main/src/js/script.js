'use strict';

// Function to handle feedback submission
const cardManagement = () => {
  const cardRating = document.querySelector('.card-1');
  const cardThank = document.querySelector('.card-2');
  const displayScore = document.querySelector('.user-score');
  const scores = document.querySelectorAll('.score');
  const btnSubmit = document.querySelector('.btn');

  let userScore;

  scores.forEach(score => {
    score.addEventListener('click', () => {
      scores.forEach(score => score.classList.remove('active'));

      score.classList.add('active');
      userScore = score.dataset.score;
    });
  });

  btnSubmit.addEventListener('click', () => {
    if (!userScore) return;

    cardRating.classList.add('card--hide');
    cardThank.classList.add('card--show');

    displayScore.textContent = userScore;
  });
};

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
  cardManagement();
  attributionManagement();
};

init();
