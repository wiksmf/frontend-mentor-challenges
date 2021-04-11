'use strict';

const jobList = document.querySelector('.job__list');
const filterBar = document.querySelector('.filter-bar');
const filterBarFilters = document.querySelector('.filters');
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
    <div class="job ${job.featured ? 'job__featured' : ''}" data-id=${job.id} > 
      <div class="job__information">
        <div class="job__logo-box">
          <img src="${job.logo}" class="job__logo" alt="">
        </div>
        <div class="job__description">
          <p class="job__company">${job.company} 
          ${job.new ? '<span class="job__type job__type--new">New!</span>' : ''}
          ${
            job.featured
              ? '<span class="job__type job__type--featured">Featured</span>'
              : ''
          }  
          </p>
          <a href='#' class="job__position u-mt-sm u-mb-sm">${job.position}</a>
          <ul class="job__details">
            <li class="job__details-date u-mb-xs">${job.postedAt}</li>
            <li class="job__details-contract u-mb-xs">${job.contract}</li>
            <li class="job__details-location u-mb-xs">${job.location}</li>
          </ul>
        </div>  
      </div>
      <div class="job__categories u-mt-sm">
        <span class="job__filter" data-id="${job.role}">
          ${job.role}
        </span>
        <span class="job__filter" data-id="${job.level}">
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

function renderList(list) {
  let html = '';
  list.forEach(
    item => (html += `<li class="job__filter" data-id="${item}">${item}</li>`),
  );
  return html;
}

function clearJobList() {
  jobList.innerHTML = '';
}

function displayFilters() {
  let html = '';
  filterJobs.forEach(
    job =>
      (html = `
        <li class="filters__item" data-id="${job}">
          <span class="filters__filter">${job}</span>
          <button class="btn btn-remove">
            <img src="src/img/icon-remove.svg" alt="Remove ${job} from filters">
          </button>
        </li>
      `),
  );
  filterBarFilters.insertAdjacentHTML('beforeend', html);
}

jobList.addEventListener('click', e => {
  if (e.target.closest('.job__filter')) {
    filterBar.classList.add('filter-bar--visible');
    displayJobs(e);
  }
});

filterBar.addEventListener('click', e => {
  if (e.target.closest('.btn-remove')) {
    const index = filterJobs.indexOf(e.target.parentNode.dataset.id);
    filterJobs.splice(index, 1);
    // console.log(e.target.parentElement);
    // e.target.parentElement.remove();

    // PROBLEMS !!!!!!!!!!!!!!!!!!!!!!!!!!

    console.log(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode,
    );

    clearJobList();

    data.forEach(job => {
      if (selectedJobs(job)) renderData(job);
    });

    if (filterJobs.length < 1) {
      filterBar.classList.remove('filter-bar--visible');
      clearJobList();
      data.forEach(el => renderData(el));
    }
  }
});

function displayJobs(e) {
  if (!filterJobs.includes(e.target.dataset.id)) {
    clearJobList();
    filterJobs.push(e.target.dataset.id);
    displayFilters();

    data.forEach(job => {
      if (selectedJobs(job)) renderData(job);
    });
  }
}

function selectedJobs(data) {
  let filtered = true;
  filterJobs.forEach(job => {
    if (
      data.role !== job &&
      data.level !== job &&
      !data.languages.includes(job) &&
      !data.tools.includes(job)
    )
      filtered = false;
  });

  return filtered;
}

btnClear.addEventListener('click', () => {
  filterJobs.splice(0, filterJobs.length);
  filterBar.classList.remove('filter-bar--visible');
  clearJobList();
  filterBarFilters.innerHTML = '';
  data.forEach(el => renderData(el));
});

getData();
