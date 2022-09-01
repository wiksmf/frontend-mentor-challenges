'use strict';

const slider = function () {
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const slides = document.querySelectorAll('.slide');
  const maxSlide = slides.length;

  let currentSlide = 0;

  const goToSlide = (slide) => {
    slides.forEach(
      (currentSlide, i) => (currentSlide.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = () => {
    if (currentSlide === maxSlide - 1) currentSlide = 0;
    else currentSlide++;
    
    goToSlide(currentSlide);
  };

  const previousSlide = () => {
    if (currentSlide === 0) currentSlide = maxSlide - 1;
    else currentSlide--;
  
    goToSlide(currentSlide);
  };
  
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', previousSlide);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') previousSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  goToSlide(0);
};

slider();