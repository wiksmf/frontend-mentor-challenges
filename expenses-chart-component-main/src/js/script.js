'use strict';

const loadExpensesChart = () => {
  const getCurrentDayIndex = () => {
    const today = new Date();
    const dayIndex =  today.getDay();
    const getCurrentDayStartingFromMonday = dayIndex - (dayIndex === 0 ? -6 : 1);

    return getCurrentDayStartingFromMonday;
  }

  const displayChart = (expense, averageMaxValue) => {
    const chartContainer = document.querySelector('.chart-container');
    const columnDay = document.createElement('div');
    const dailyAmount = document.createElement('span');
    const chartBar = document.createElement('span');
    const date = document.createElement('p');
    
    columnDay.classList.add('column-day');
    dailyAmount.classList.add('daily-amount');
    date.classList.add('weekday');
    chartBar.classList.add('chart-bar');

    dailyAmount.textContent = `$${expense.amount}`;
    chartBar.style.height = `${averageMaxValue * expense.amount}rem`;
    date.textContent = expense.day;

    columnDay.appendChild(dailyAmount);
    columnDay.appendChild(chartBar);
    columnDay.appendChild(date);

    chartContainer.appendChild(columnDay);
  };

  const highlightCurrentDay = () => {
    const columnDays = document.querySelectorAll('.column-day');
    const currentDay = getCurrentDayIndex();

    columnDays.forEach((column, index) => {
      if (index === currentDay) column.classList.add('highlight')
    })
  }

  const getExpensesDataFromJson = async () => {
    const expensesDataFromJson = await (await fetch('/data.json')).json();
    const chartContainerMaxHeight = 15;

    const maxExpenseValue = Math.max(...expensesDataFromJson.map((expense) => expense.amount));
    const averageMaxValue = chartContainerMaxHeight / maxExpenseValue;
  
    expensesDataFromJson.forEach((expense) => {
      displayChart(expense, averageMaxValue);
    })

    highlightCurrentDay();
  }

  getExpensesDataFromJson();
}

loadExpensesChart();