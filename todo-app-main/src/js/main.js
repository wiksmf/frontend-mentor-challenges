'use strict';

const container = document.querySelector('.container');
const themeSwitch = document.querySelector('.btn-theme');
const newItem = document.querySelector('.new-item');
const btnAdd = document.querySelector('.btn-add');
const btnClear = document.querySelector('.btn-clear');
const btnFilter = document.querySelectorAll('.btn-filter');
const displayTodoList = document.querySelector('.todo-list');

let todoList = JSON.parse(localStorage.getItem('todoList'));

document.addEventListener('DOMContentLoaded', displayTodo());
btnAdd.addEventListener('click', addTodo);
btnClear.addEventListener('click', deleteCompleted);
themeSwitch.addEventListener('click', switchTheme);

// Toggle light and dark mode
function switchTheme() {
  container.classList.toggle('container--dark');
  themeSwitch.classList.toggle('btn-theme--dark');
}

// List all todos saved in local storage
function displayTodo(todoList = JSON.parse(localStorage.getItem('todoList'))) {
  todoList.forEach(todo => {
    const listItem = document.createElement('li');

    listItem.classList.add('item-list');
    listItem.setAttribute('draggable', true);
    listItem.innerHTML = `
      <div class="checkbox-container">
        <input type="checkbox" class="btn btn-check" />
        <span class="check"></span>
      </div>
      <p class="item">${todo.todo}</p>
      <button class="btn btn-delete">DELETE</button>
    `;

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
      deleteTodo(todo);
      displayTodoList.removeChild(listItem);
    });

    displayTodoList.appendChild(listItem);
  });
}

// Mark todos as complete
function completedTodo(todo, completed) {
  const index = todoList.findIndex(index => index.todo === todo.todo);
  todoList[index].isCompleted = completed;
  // console.log(todoList[index], todoList[index].isCompleted);
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Delete todos form the list
function deleteTodo(todo) {
  const index = todoList.findIndex(index => index.todo === todo.todo);
  todoList.splice(index, 1);
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Clear all completed todos
// function deleteCompleted() {
//   todoList = JSON.parse(localStorage.getItem('todoList'));
//   todoList.forEach(todo => {
//     console.log(todo);

//     if (todo.isCompleted) console.log(todo);
//     deleteTodo(todo);
//   });
// }

// Add new todos to the list
function addTodo() {
  const todo = newItem.value.trim();

  if (!todo) return;

  const todoItem = {
    todo,
    isCompleted: false,
  };

  displayTodo([todoItem]);
  todoList.push(todoItem);
  localStorage.setItem('todoList', JSON.stringify(todoList));

  newItem.value = '';
  newItem.focus();
}

// Filter by all/active/complete todos
btnFilter.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('btn-all')) {
    }
    if (btn.classList.contains('btn-active')) {
    }
    if (btn.classList.contains('btn-completed')) {
    }
  });
});

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

dragItems();
