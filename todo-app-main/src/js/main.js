'use strict';

const container = document.querySelector('.container');
const themeSwitch = document.querySelector('.btn-theme');
const newItem = document.querySelector('.new-item');
const btnAdd = document.querySelector('.btn-add');
const btnClear = document.querySelector('.btn-clear');
const btnFilter = document.querySelectorAll('.btn-filter');
const displayTodoList = document.querySelector('.todo-list');
const displayItemsLeft = document.querySelector('.items-left');

// let todoList = [JSON.parse(localStorage.getItem('todoList'))];
let todoList = [];

// Event handlers
document.addEventListener('DOMContentLoaded', displayTodo());
btnAdd.addEventListener('click', addTodo);
btnClear.addEventListener('click', deleteCompleted);
themeSwitch.addEventListener('click', switchTheme);
btnFilter.forEach(btn =>
  btn.addEventListener('click', () => {
    if (btn.classList.contains('btn-all')) filterView();
    if (btn.classList.contains('btn-active')) filterView('completed');
    if (btn.classList.contains('btn-completed')) filterView('not-completed');
  }),
);

// Toggle light and dark mode
let theme = localStorage.getItem('theme');

function darkThemeOn() {
  container.classList.add('container--dark');
  themeSwitch.classList.add('btn-theme--dark');
  localStorage.setItem('theme', 'true');
}

function darkThemeOff() {
  container.classList.remove('container--dark');
  themeSwitch.classList.remove('btn-theme--dark');
  localStorage.setItem('theme', null);
}

function switchTheme() {
  theme = localStorage.getItem('theme');
  theme !== 'true' ? darkThemeOn() : darkThemeOff();
}

if (theme === 'true') darkThemeOn();

// List all todos saved in local storage
function displayTodo(todoList = JSON.parse(localStorage.getItem('todoList'))) {
  if (todoList)
    todoList.forEach(todo => {
      const listItem = document.createElement('li');

      listItem.classList.add('item-list');
      listItem.setAttribute('draggable', true);
      listItem.innerHTML = `
        <div class="checkbox-container">
          <input type="checkbox" class="btn btn-check" 
            ${todo.isCompleted ? 'checked' : ''} />
          <span class="check"></span>
        </div>
        <p class="item ${todo.isCompleted ? 'completed' : ''}">${todo.todo}</p>
        <button class="btn btn-delete">DELETE</button>
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

  itemsLeft();
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
  itemsLeft();
  newItem.value = '';
  newItem.focus();
}

// Mark todos as complete
function completedTodo(todo, completed) {
  const index = todoList.findIndex(index => index.todo === todo.todo);
  todoList[index].isCompleted = completed;
  localStorage.setItem('todoList', JSON.stringify(todoList));
  itemsLeft();
}

// Delete todos form the list
function deleteTodo(todo) {
  const index = todoList.findIndex(index => index.todo === todo.todo);
  todoList.splice(index, 1);
  localStorage.setItem('todoList', JSON.stringify(todoList));
  itemsLeft();
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
      e.target.classList.contains('item-list')
    ) {
      const draggingItem = document.querySelector('.dragging');
      const item = [...document.querySelectorAll('.item-list')];
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
function filterView(itemType) {
  let completedItems = [...document.querySelectorAll('.item')];
  completedItems.forEach(item => {
    item.parentNode.classList.remove('hide');
  });

  if (itemType) {
    completedItems = completedItems.filter(item =>
      itemType === 'completed'
        ? item.classList.contains('completed')
        : !item.classList.contains('completed'),
    );

    completedItems.forEach(item => {
      item.parentNode.classList.add('class', 'hide');
    });
  }
}

// Display left todos
function itemsLeft() {
  const itemsLength = [...document.querySelectorAll('.item')];
  displayItemsLeft.textContent = itemsLength.filter(
    item => !item.classList.contains('completed'),
  ).length;
}
