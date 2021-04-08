'use strict';

const jobList = document.querySelector('.job__list');
const filterBar = document.querySelector('.filter__bar');
let filterJobs = [];

async function getData() {
  try {
    const res = await fetch('../../data.json');
    if (!res.ok) throw new Error('problem :(');
    const data = await res.json();
    renderData(data);
  } catch (e) {
    console.log(e);
  }
}

function renderData(jobs) {
  jobs.forEach(job => {
    const html = `
    <div class="job" data-id=${job.id}> 
      <div class="job__logo-box">
        <img src="${job.logo}" job="job__logo" alt="">
        </div>
      <div class="job__description">
        <p class="job__company">${job.company} 
          <span class="job__new">${job.new ? 'New' : ''}</span>
          <span class="job__featured">${job.featured ? 'Featured' : ''}</span>
       </p>
        <p class="job__position"${job.position}</p>
        <p class="job__details">
          <span class="job__date">${job.posted}</span>
          <span class="job__contract">${job.contract}</span>
          <span class="job_location">${job.location}</span>
        </p>
      </div>
      <div class="job__requirements categories">
        <span class="job__role">${job.role}</span>
        <span class="job__level">${job.level}</span>
        <ul class="job__languages">${renderList(job.languages)}</ul>

      </div>
    </div>    
    `;

    jobList.insertAdjacentHTML('beforeend', html);
  });
}

function renderList(list) {
  let html = '';

  if (list < 1) return;

  list.forEach(item => (html += `<li class="job__language">${item}</é>`));

  return html;
}

getData();
