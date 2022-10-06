'use strict';

const themeSwitcher = () => {
  const btnThemeSwitcher = document.querySelector('.btn-theme-switcher');
  const body = document.querySelector('body');

  let themeSettingsFromLocalStorage = localStorage.getItem('dark-mode');

  const darkThemeOn = () => {
    body.classList.remove('light');
    body.classList.add('dark');
    btnThemeSwitcher.classList.remove('off');
    localStorage.setItem('dark-mode', true);
  };

  const lightThemeOn = () => {
    body.classList.remove('dark');
    body.classList.add('light');
    btnThemeSwitcher.classList.add('off');
    localStorage.setItem('dark-mode', null);
  };

  if (themeSettingsFromLocalStorage === 'true') darkThemeOn();
  if (themeSettingsFromLocalStorage === 'null') lightThemeOn();

  btnThemeSwitcher.addEventListener('click', () => {
    body.classList.contains('dark') ? lightThemeOn() : darkThemeOn();
  });
};

themeSwitcher();
