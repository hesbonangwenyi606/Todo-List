// ----- AUTHENTICATION -----
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const authContainer = document.getElementById('auth-container');
const todoContainer = document.getElementById('todo-container');

const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');
const showLogin = document.getElementById('show-login');
const showSignup = document.getElementById('show-signup');
const logoutBtn = document.getElementById('logout-btn');

// Toggle forms
showLogin.addEventListener('click', () => {
  signupForm.style.display = 'none';
  loginForm.style.display = 'block';
});
showSignup.addEventListener('click', () => {
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
});

// Sign Up
signupBtn.addEventListener('click', () => {
  const firstName = document.getElementById('signup-firstname').value.trim();
  const lastName = document.getElementById('signup-lastname').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;

  if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
    return alert('Please fill in all fields');
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return alert('Please enter a valid email');

  // Check passwords match
  if (password !== confirmPassword) return alert('Passwords do not match');

  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.username === username)) return alert('Username already exists');
  if (users.find(u => u.email === email)) return alert('Email already registered');

  // Save new user
  users.push({ firstName, lastName, email, username, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Sign Up successful! Please Sign In.');

  // Clear form
  signupForm.reset();
  signupForm.style.display = 'none';
  loginForm.style.display = 'block';
});

// Sign In
loginBtn.addEventListener('click', () => {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    authContainer.style.display = 'none';
    todoContainer.style.display = 'block';
    localStorage.setItem('currentUser', username);
    loadTodos();
  } else {
    alert('Invalid credentials');
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  authContainer.style.display = 'block';
  todoContainer.style.display = 'none';
  localStorage.removeItem('currentUser');
});

// ----- TODO LIST -----
const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function loadTodos() {
  const username = localStorage.getItem('currentUser');
  const todos = JSON.parse(localStorage.getItem('todos')) || {};
  const userTodos = todos[username] || [];

  todoList.innerHTML = '';
  userTodos.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      removeTodo(task);
    });

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

function saveTodos(task) {
  const username = localStorage.getItem('currentUser');
  const todos = JSON.parse(localStorage.getItem('todos')) || {};
  if (!todos[username]) todos[username] = [];
  todos[username].push(task);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTodo(task) {
  const username = localStorage.getItem('currentUser');
  const todos = JSON.parse(localStorage.getItem('todos')) || {};
  todos[username] = todos[username].filter(t => t !== task);
  localStorage.setItem('todos', JSON.stringify(todos));
  loadTodos();
}

// Add task
addBtn.addEventListener('click', () => {
  const taskText = todoInput.value.trim();
  if (taskText === "") return;
  saveTodos(taskText);
  loadTodos();
  todoInput.value = '';
});

// Add task by pressing Enter
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addBtn.click();
});
