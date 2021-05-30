'use strict';

const container = document.querySelector('.container');
const newItem = document.querySelector('.block__add-todo__input');
const btnAdd = document.querySelector('.btn-add');
const btnClear = document.querySelector('.btn-clear');
const btnFilter = document.querySelectorAll('.btn-filter');
const displayTodoList = document.querySelector('.list');
const itemsLeft = document.querySelector('.items-left');

let todoList = JSON.parse(localStorage.getItem('todoList'));

// List all todos saved in local storage
function displayTodo(todoList = JSON.parse(localStorage.getItem('todoList'))) {
  if (!todoList) return;

  todoList.forEach(todo => {
    const listItem = document.createElement('li');

    listItem.classList.add('list-item');
    listItem.setAttribute('draggable', true);
    listItem.innerHTML = `
      <input type="checkbox" class="btn btn-check" 
        ${todo.isCompleted ? 'checked' : ''} />
      <span class="btn-check--icon"></span>
      <p class="item ${todo.isCompleted ? 'completed' : ''}">${todo.todo}</p>
      <button class="btn btn-delete"></button>
    `;

    // Add event handlers to each todo
    listItem.addEventListener('dragstart', () => {
      listItem.classList.add('dragging');
    });

    listItem.addEventListener('dragend', () => {
      listItem.classList.remove('dragging');
    });

    listItem.querySelector('.btn-check').addEventListener('click', () => {
      const completed = listItem.querySelector('.btn-check').checked
        ? true
        : false;

      completed
        ? listItem.querySelector('.item').classList.add('completed')
        : listItem.querySelector('.item').classList.remove('completed');

      completedTodo(todo, completed);
    });

    listItem.querySelector('.btn-delete').addEventListener('click', () => {
      displayTodoList.removeChild(listItem);
      deleteTodo(todo);
    });

    displayTodoList.appendChild(listItem);
  });

  displayItemsLeft();
  dragItems();
}

// Add new todo to the list
function addTodo() {
  const todo = newItem.value.trim();

  if (!todo) return;

  const todoItem = {
    todo,
    isCompleted: false,
  };

  todoList.push(todoItem);
  localStorage.setItem('todoList', JSON.stringify(todoList));
  displayTodo([todoItem]);
  displayItemsLeft();
  dragItems();

  newItem.value = '';
  newItem.focus();
}

// Mark todos as complete
function completedTodo(todo, completed) {
  const index = todoList.findIndex(index => index.todo === todo.todo);

  todoList[index].isCompleted = completed;
  localStorage.setItem('todoList', JSON.stringify(todoList));
  displayItemsLeft();
}

// Delete todos form the list
function deleteTodo(todo) {
  const index = todoList.findIndex(index => index.todo === todo.todo);

  todoList.splice(index, 1);
  localStorage.setItem('todoList', JSON.stringify(todoList));
  displayItemsLeft();
}

// Clear all completed todos
function deleteCompleted() {
  const completedItems = [...document.querySelectorAll('.completed')];

  completedItems.forEach(item => item.parentNode.remove(item));

  todoList = JSON.parse(localStorage.getItem('todoList'));
  todoList = todoList.filter(todo => !todo.isCompleted);
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Drag and drop to reorder items on the list
function dragItems() {
  displayTodoList.addEventListener('dragover', e => {
    e.preventDefault();

    if (
      !e.target.classList.contains('dragging') &&
      e.target.classList.contains('list-item')
    ) {
      const draggingItem = document.querySelector('.dragging');
      const item = [...document.querySelectorAll('.list-item')];
      const currentPosition = item.indexOf(draggingItem);
      const newPosition = item.indexOf(e.target);
      const moved = todoList.splice(currentPosition, 1);

      currentPosition > newPosition
        ? displayTodoList.insertBefore(draggingItem, e.target)
        : displayTodoList.insertBefore(draggingItem, e.target.nextSibling);

      todoList.splice(newPosition, 0, moved[0]);
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  });
}

// Filter by all/active/complete todos
function filterView(isCompleted) {
  let completedItems = [...document.querySelectorAll('.item')];

  completedItems.forEach(item => {
    item.parentNode.classList.remove('u-hide');
  });

  if (isCompleted) {
    completedItems = completedItems.filter(item =>
      isCompleted === 'completed'
        ? item.classList.contains('completed')
        : !item.classList.contains('completed'),
    );

    completedItems.forEach(item => {
      item.parentNode.classList.add('class', 'u-hide');
    });
  }
}

// Display left todos
function displayItemsLeft() {
  const itemsLength = [...document.querySelectorAll('.item')];

  itemsLeft.textContent =
    itemsLength.filter(item => !item.classList.contains('completed')).length ||
    'No';
}

// Initialize event handlers
function init() {
  document.addEventListener('DOMContentLoaded', displayTodo());
  btnAdd.addEventListener('click', addTodo);
  newItem.addEventListener('keydown', e => {
    if (e.keyCode === 13) btnAdd.click();
  });
  btnClear.addEventListener('click', deleteCompleted);
  btnFilter.forEach(btn =>
    btn.addEventListener('click', e => {
      if (btn === e.target) {
        document.querySelector('.selected').classList.remove('selected');
        btn.classList.add('selected');
      }

      if (btn.classList.contains('btn-all')) filterView();
      if (btn.classList.contains('btn-active')) filterView('completed');
      if (btn.classList.contains('btn-completed')) filterView('not-completed');
    }),
  );
}

init();
