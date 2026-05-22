


const todoList = document.getElementById("todo-list");
const userSelect = document.getElementById("user-select");

async function fetchTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await response.json();

  displayTodos(todos);
  populateUsers(todos);
}

function displayTodos(todos) {
  todoList.innerHTML = "";
  for (const todo of todos) {
    const li = document.createElement("li");
    li.textContent = `[${todo.userId}]: ${todo.title}`;
    todoList.appendChild(li);
  }
}

function populateUsers(todos) {
  const users = [...new Set(todos.map(t => t.userId))]; 
  for (const id of users) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ID: ${id}`;
    userSelect.appendChild(option);
  }

  userSelect.addEventListener("change", () => {
    const selectedId = parseInt(userSelect.value);
    if (selectedId) {
      const filtered = todos.filter(t => t.userId === selectedId);
      displayTodos(filtered);
    } else {
      displayTodos(todos);
    }
  });
}

fetchTodos();
