const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Add task
addBtn.addEventListener('click', () => {
  const taskText = todoInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement('li');
  li.textContent = taskText;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => li.remove());

  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  todoInput.value = '';
});

// Optional: Add task by pressing Enter
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});
