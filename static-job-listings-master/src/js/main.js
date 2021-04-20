'use strict';

const jobList = document.querySelector('.job__list');
const filterBar = document.querySelector('.filter-bar');
const filterBarFilters = document.querySelector('.filters');
const btnClear = document.querySelector('.btn-clear');

let filters = [];
let data;

// Get the data
async function getData() {
  try {
    const res = await fetch('../../data.json');
    if (!res.ok)
      throw new Error('Whoops..something went wrong while getting data 💔');

    data = await res.json();
    data.forEach(job => displayJobs(job));
  } catch (e) {
    alert(e);
  }
}

// Render the data on the page
function displayJobs(job) {
  const html = `
    <div class="job ${job.featured ? 'job__featured' : ''}" data-id=${job.id} > 
      <div class="job__information">
        <div class="job__logo-box">
          <img src="${job.logo}" class="job__logo" alt="">
        </div>
        <div class="job__description">
          <p class="job__company">
            ${job.company} 
            ${
              job.new
                ? '<span class="job__type job__type--new">New!</span>'
                : ''
            }
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
        <span class="job__filter" data-id="${job.role}">${job.role}</span>
        <span class="job__filter" data-id="${job.level}">${job.level}</span>
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

// Render lists
function renderList(list) {
  let html = '';
  list.forEach(
    item => (html += `<li class="job__filter" data-id="${item}">${item}</li>`),
  );
  return html;
}

// Display the filters in the filter bar
function displayFilters() {
  let html = '';
  filters.forEach(
    filter =>
      (html = `
        <li class="filters__item" data-id="${filter}">
          <span class="filters__filter">${filter}</span>
          <button class="btn btn-remove" aria-label="Remove ${filter} from filters"></button>
        </li>
      `),
  );
  filterBarFilters.insertAdjacentHTML('beforeend', html);
}

// Filter the jobs
function filterJobs(e) {
  if (e.target.closest('.job__filter')) {
    filterBar.classList.add('filter-bar--visible');

    if (!filters.includes(e.target.dataset.id)) {
      filters.push(e.target.dataset.id);
      displayFilters();
      updateJobs();
    }
  }
}

// Display jobs by filters
function updateJobs() {
  clearJobList();
  data.forEach(job => {
    if (selectedJobs(job)) displayJobs(job);
  });
}

// Check if a job category is in the filter list
function selectedJobs(job) {
  let filtered = true;
  filters.forEach(filter => {
    if (
      job.role !== filter &&
      job.level !== filter &&
      !job.languages.includes(filter) &&
      !job.tools.includes(filter)
    )
      filtered = false;
  });

  return filtered;
}

// Remove a single filter
function removeFilter(e) {
  if (e.target.closest('.btn-remove')) {
    const index = filters.indexOf(e.target.parentNode.dataset.id);
    filters.splice(index, 1);

    if (filters.length < 1) filterBar.classList.remove('filter-bar--visible');

    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    updateJobs();
  }
}

// Remove all filters
function removeAllFilters() {
  filters.splice(0, filters.length);
  filterBar.classList.remove('filter-bar--visible');
  filterBarFilters.innerHTML = '';
  clearJobList();
  data.forEach(job => displayJobs(job));
}

// Clear the job list container
function clearJobList() {
  jobList.innerHTML = '';
}

// Initialize stuff
function init() {
  jobList.addEventListener('click', e => filterJobs(e));
  filterBar.addEventListener('click', e => removeFilter(e));
  btnClear.addEventListener('click', removeAllFilters);
  getData();
}

init();
