'use strict';

const trackingInformationManagement = () => {
  const timeTrackingDashboard = document.querySelector('.main');
  const btnView = document.querySelectorAll('.btn-view-option');
  const trackingDataUrl = '/data.json';

  const getTrackingData = async () => {
    const trackingDataFromFile = await (await fetch(trackingDataUrl)).json();

    trackingDataFromFile.forEach(record => displayData(record));
  }

  const displayData = (record) => {
    const dashboardCard = `
      <div class="card-dashboard--card">
        <div class="card-dashboard--header card-dashboard--${record.title.toLowerCase()}"></div>

        <div class="card-dashboard--details">
          <div class="card-dashboard--category">
            <p class="category">${record.title}</p>
            <button type="button" class="btn btn-dashboard-options" aria-label="See more"></button>
          </div>

          <div class="card-dashboard--tracks">
            <p class="current-time">
              <span class="current-hours daily">${record.timeframes.daily.current}</span>
              <span class="current-hours weekly show">${record.timeframes.weekly.current}</span>
              <span class="current-hours monthly">${record.timeframes.monthly.current}</span>
            hrs</p>
            <p class="previous-time">Previous 
              <span class="time-info">week</span> - 
              <span class="previous-hours daily">${record.timeframes.daily.previous}</span>
              <span class="previous-hours weekly show">${record.timeframes.weekly.previous}</span>
              <span class="previous-hours monthly">${record.timeframes.monthly.previous}</span>
            hrs</p>
          </div>
        </div>
      </div>
    `;

    timeTrackingDashboard.insertAdjacentHTML('beforeend', dashboardCard);
  }

  const showSelectedDashboard = (dashboard, selectedView) => {
    dashboard.forEach(record => {
      record.classList.remove('show');

      if (record.classList.contains(selectedView))
        record.classList.add('show');
    });
  }

  const changeDashboard = (selectedView) => {
    const currentHours = document.querySelectorAll('.current-hours');
    const previousHours = document.querySelectorAll('.previous-hours');

    showSelectedDashboard(currentHours, selectedView);
    showSelectedDashboard(previousHours, selectedView); 
  }

  btnView.forEach(btn => {
    btn.addEventListener('click', () => {
      btnView.forEach(btn => btn.classList.remove('active'));

      btn.classList.add('active');
      btn.classList.contains('btn--daily') 
        ? changeDashboard('daily')
        : btn.classList.contains('btn--weekly') 
        ? changeDashboard('weekly')
        : changeDashboard('monthly');
   });
  });

  getTrackingData();
}

trackingInformationManagement();