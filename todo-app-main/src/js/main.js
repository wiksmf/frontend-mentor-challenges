'use strict';

const newItem = document.querySelector('.new-item');
const btnAdd = document.querySelector('.btn-add');
const btnShow = document.querySelectorAll('.btn-show');
const todoList = document.querySelector('.todo-list');

// Add new todos to the list
btnAdd.addEventListener('click', () => {
  const listItem = document.createElement('li');

  if (!newItem.value) return;

  listItem.classList.add('active');
  listItem.innerHTML = `<button class="btn btn-delete">DELETE</button>${newItem.value}`;
  todoList.appendChild(listItem);

  listItem.addEventListener('click', completedTodo);
  listItem.querySelector('.btn-delete').addEventListener('click', deleteTodo);

  newItem.value = '';
  newItem.focus();
});

// Mark todos as complete
function completedTodo(e) {
  if (e.target.tagName === 'LI') {
    e.target.style.backgroundColor = 'red';
    e.target.classList.remove('active');
    e.target.classList.add('completed');
  }
}

// Delete todos form the list
function deleteTodo(e) {
  e.target.parentNode.remove();
}

// Filter by all/active/complete todos
btnShow.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('btn-all')) console.log('all');
    if (btn.classList.contains('btn-active')) console.log('active');
    if (btn.classList.contains('btn-completed')) console.log('completed');
  });
});

// Clear all completed todos

// Toggle light and dark mode

// Drag and drop to reorder items on the list
