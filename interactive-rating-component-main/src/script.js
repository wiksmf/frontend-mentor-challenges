'use strict';

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

const attributionManagement = () => {
  const attribution = document.querySelector('.attribution-information');
  const btnAttribution = document.querySelector('.attribution-btn');

  btnAttribution.addEventListener('click', () => {
    attribution.classList.toggle('show');
  });
};

const init = () => {
  cardManagement();
  attributionManagement();
};

init();
