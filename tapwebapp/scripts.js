const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');

// Allows the todo to pass JSON to the local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];
todos.forEach((todo, index) => addTodoToList(todo, index));

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === '') return;

    // The function will set the item to the local storage
    todos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
    addTodoToList(todoText, todos.length - 1);

    todoInput.value = '';
}

function addTodoToList(todoText, index) {
    const li = document.createElement('li');
    li.textContent = todoText;

    const buttons = document.createElement('div');
    buttons.className = 'buttons';

    // The following function will then create a button
    // The button to edit the tasks that have been added by the user, and then creates the button.
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit my task';
    editButton.onclick = () => editTodo(index);

    // The function still creates a button
    // But this time it is the button that tells the user to delete their task
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Delete my task';
    removeButton.className = 'Delete my task';
    removeButton.onclick = () => removeTodo(index);

    buttons.appendChild(editButton);
    buttons.appendChild(removeButton);
    li.appendChild(buttons);

    todoList.appendChild(li);
}

function editTodo(index) {
    const newTodoText = prompt('Edit your task:', todos[index]);
    if (newTodoText !== null) {
        todos[index] = newTodoText;
        localStorage.setItem('todos', JSON.stringify(todos));
        todoList.children[index].firstChild.textContent = newTodoText;
    }
}

function removeTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    todoList.removeChild(todoList.children[index]);
}