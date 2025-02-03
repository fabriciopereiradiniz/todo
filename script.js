document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const showAllButton = document.getElementById('show-all');
    const showCompletedButton = document.getElementById('show-completed');
    const showPendingButton = document.getElementById('show-pending');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    /* function pra renderizar as tasks */
    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            if (filter === 'completed' && !task.completed) return;
            if (filter === 'pending' && task.completed) return;

            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            if (task.completed) {
                taskItem.classList.add('completed');
            }

            const checkbox = document.createElement('div');
            checkbox.classList.add('custom-checkbox');
            if (task.completed) {
                checkbox.classList.add('checked');
            }
            checkbox.addEventListener('click', () => toggleComplete(index));

            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskText.classList.add('task-text');

            const removeButton = document.createElement('div');
            removeButton.classList.add('remove-button');
            removeButton.innerHTML = '&#10005;'; // x
            removeButton.addEventListener('click', () => confirmRemoveTask(index));

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskText);
            taskItem.appendChild(removeButton);
            taskList.appendChild(taskItem);
        });
    }

    /* function pra adicionar task */
    function addTask(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function confirmRemoveTask(index) {
        if (confirm('Tem certeza que deseja remover esta tarefa?')) {
            removeTask(index);
        }
    }

    function removeTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    taskForm.addEventListener('submit', addTask);
    showAllButton.addEventListener('click', () => renderTasks('all'));
    showCompletedButton.addEventListener('click', () => renderTasks('completed'));
    showPendingButton.addEventListener('click', () => renderTasks('pending'));

    renderTasks();
});

const optionsButton = document.getElementById('options-button');
const optionsMenu = document.getElementById('options-menu');

optionsButton.addEventListener('click', () => {
    optionsButton.classList.toggle('active');
});
/* function data-filter */
optionsMenu.addEventListener('click', (event) => {
    if (event.target.classList.contains('option')) {
        const filter = event.target.getAttribute('data-filter');
        renderTasks(filter); 
        optionsButton.classList.remove('active'); 
    }
});