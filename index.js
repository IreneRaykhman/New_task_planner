document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const clearTasksButton = document.getElementById('clearTasksButton');
    const taskList = document.getElementById('taskList');
    const emptyMessage = document.getElementById('emptyMessage');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const updateUI = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                ${task.text}
            `;
            taskList.appendChild(li);
        });

        emptyMessage.style.display = tasks.length ? 'none' : 'block';
        clearTasksButton.disabled = tasks.length === 0;
    };
    
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            updateUI();
        }
    };

    const clearTasks = () => {
        tasks = [];
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateUI();
    };

    const toggleTaskCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateUI();
    };

    addTaskButton.addEventListener('click', addTask);
    clearTasksButton.addEventListener('click', clearTasks);
    taskList.addEventListener('change', (e) => {
        if (e.target.matches('input[type="checkbox"]')) {
            const index = e.target.getAttribute('data-index');
            toggleTaskCompletion(index);
        }
    });

    updateUI();
});
