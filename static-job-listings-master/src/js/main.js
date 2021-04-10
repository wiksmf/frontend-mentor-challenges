'use strict';

const jobList = document.querySelector('.job__list');
const filterBar = document.querySelector('.filter__bar');
const btnClear = document.querySelector('.btn-clear');

let filterJobs = [];
let data;

async function getData() {
  try {
    const res = await fetch('../../data.json');
    if (!res.ok) throw new Error('problem :(');
    data = await res.json();
    data.forEach(el => renderData(el));
  } catch (e) {
    console.log(e);
  }
}

function renderData(job) {
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
          <span class="job__date">${job.postedAt}</span>
          <span class="job__contract">${job.contract}</span>
          <span class="job_location">${job.location}</span>
        </p>
      </div>
      <div class="job__requirements categories">
        <span class="job__role filter" data-id="${job.role}">${job.role}</span>
        <span class="job__level filter" data-id="${job.level}">
          ${job.level}
        </span>
        <ul class="job__languages">
          ${job.languages.length > 0 ? renderList(job.languages) : ''}
        </ul>
        <ul class="job__tools">
          ${job.tools.length > 0 ? renderList(job.tools) : ''}
        </ul>
      </div>
    </div>    
    `;

  jobList.insertAdjacentHTML('beforeend', html);
}

function clearJobList() {
  jobList.innerHTML = '';
}

jobList.addEventListener('click', e => {
  if (e.target.closest('.filter')) {
    filterBar.classList.remove('hidden');
    displayJobs(e);
  }
});

function displayJobs(e) {
  if (!filterJobs.includes(e.target.dataset.id)) {
    let filteredArr = [];

    filterJobs.push(e.target.dataset.id);
    displayFilters();

    data.forEach(details => {
      if (selectedJobs(details)) {
        filteredArr.push(details);
        clearJobList();
      }
    });

    filteredArr.forEach(item => renderData(item));
  }
}

function selectedJobs(data) {
  let filtered = false;
  filterJobs.forEach(job => {
    if (
      data.role === job ||
      data.level === job ||
      data.languages.includes(job) ||
      data.tools.includes(job)
    )
      filtered = true;
  });

  return filtered;
}

filterBar.addEventListener('click', e => {
  if (e.target.closest('.btn-close')) {
    removeFilter(e);
  }
});

function removeFilter(e) {
  const index = filterJobs.indexOf(e.target.parentNode.dataset.id);
  filterJobs.splice(index, 1);
  e.target.parentNode.parentNode.removeChild(e.target.parentNode);

  if (filterJobs.length < 1) {
    filterBar.classList.add('hidden');
    clearJobList();
    data.forEach(el => renderData(el));
  }
}

function displayFilters() {
  let html = '';
  filterJobs.forEach(
    job =>
      (html = `<li class="filter__item" data-id="${job}">${job} <button class="btn btn-close">X</button></li>`),
  );
  filterBar.insertAdjacentHTML('beforeend', html);
}

function renderList(list) {
  let html = '';

  list.forEach(
    item =>
      (html += `<li class="job__language filter" data-id="${item}">${item}</é>`),
  );

  return html;
}

getData();
