'use strict';

const btnSwitchTheme = document.querySelector('.btn--theme');
let darkTheme = sessionStorage.getItem('darkTheme');

if (darkTheme === 'true') darkThemeOn();

btnSwitchTheme.addEventListener('click', () => {
  darkTheme = sessionStorage.getItem('darkTheme');
  darkTheme !== 'true' ? darkThemeOn() : darkThemeOff();
});

// Toggle the color scheme between light and dark mode
function darkThemeOn() {
  container.classList.add('dark-theme');
  textTheme.textContent = 'Dark Mode';
  sessionStorage.setItem('darkTheme', 'true');
}

function darkThemeOff() {
  container.classList.remove('dark-theme');
  textTheme.textContent = 'Light Mode';
  sessionStorage.setItem('darkTheme', null);
}
