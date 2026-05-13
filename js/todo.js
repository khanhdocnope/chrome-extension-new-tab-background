// ================================================================
// todo.js — Todo Widget: Rendering and Event Logic
// Depends on: state.js, storage.js
// ================================================================

// ===== RENDER TASKS =====
function renderTasks() {
  if (!todoList) return;
  todoList.innerHTML = '';

  tasksList.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `todo-item ${task.completed ? 'completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      tasksList[index].completed = checkbox.checked;
      renderTasks();
      saveTasks();
    });

    const textSpan = document.createElement('span');
    textSpan.className = 'todo-text';
    textSpan.textContent = task.text;

    const delBtn = document.createElement('button');
    delBtn.className = 'todo-delete';
    delBtn.innerHTML = '×';
    delBtn.title = 'Delete';
    delBtn.addEventListener('click', () => {
      tasksList.splice(index, 1);
      renderTasks();
      saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

// ===== INPUT LISTENER =====
if (todoInput) {
  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const text = todoInput.value.trim();
      if (text) {
        tasksList.push({ text, completed: false });
        todoInput.value = '';
        renderTasks();
        saveTasks();
      }
    }
  });
}
