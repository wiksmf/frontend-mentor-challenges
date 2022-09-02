'use strict';

const adviceGenerator = () => {
  const adviceIdElement = document.querySelector('.advice-id');
  const adviceTextElement = document.querySelector('.advice-text');
  const generateAdviceBtn = document.querySelector('.btn-new-advice');
  
  const adviceApiUrl = 'https://api.adviceslip.com/advice';

  const getAdvice = async () => {
    const adviceFromApi = await (await fetch(adviceApiUrl)).json();
    const { id: adviceId, advice: adviceText } = adviceFromApi.slip;

    displayAdvice(adviceId, adviceText);
  }

  const displayAdvice = (adviceId, adviceText) => {
    adviceIdElement.textContent = adviceId;
    adviceTextElement.textContent = adviceText;
  }

  generateAdviceBtn.addEventListener('click', getAdvice);
  getAdvice();
}

adviceGenerator();