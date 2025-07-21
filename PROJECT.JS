let tasks = [];

document.getElementById('taskForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('taskName').value.trim();
  const priority = document.getElementById('taskPriority').value;
  const isImportant = document.getElementById('taskImportant').checked;
  const date = document.getElementById('taskDate').value || new Date().toISOString().split('T')[0];

  if (!name) {
    alert("Task name cannot be empty.");
    return;
  }

  const task = {
    id: Date.now(),
    name,
    priority,
    isImportant,
    isCompleted: false,
    date
  };

  tasks.push(task);
  renderTasks();
  console.log(JSON.stringify(tasks));
  this.reset();
});

function renderTasks() {
  const container = document.getElementById('taskmanager');
  container.innerHTML = '';

  tasks.forEach(task => {
    const div = document.createElement('div');
    div.className = 'task';

    if (task.isImportant) div.classList.add('important');
    if (task.isCompleted) div.classList.add('completed');

    div.innerHTML = `
      <div class="task-info">
        <strong>${task.name}</strong> - ${task.priority}
        <span class="task-date">Added on: ${task.date}</span>
      </div>
      <div class="task-buttons">
        <button class="complete-btn" onclick="toggleComplete(${task.id})">${task.isCompleted ? 'Undo' : 'Complete'}</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    container.appendChild(div);
  });
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
  console.log(JSON.stringify(tasks));
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.isCompleted = !task.isCompleted;
    renderTasks();
    console.log(JSON.stringify(tasks));
  }
}
