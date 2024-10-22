document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('ft_list');
    const newTaskBtn = document.getElementById('newTaskBtn');
    
    loadTasks();

    newTaskBtn.addEventListener('click', () => {
        const task = prompt("Enter a new TO DO:");
        if (task) {
            addTask(task);
            saveTasks();
        }
    });

    function addTask(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'to-do';
        taskDiv.textContent = task;

        taskDiv.addEventListener('click', () => {
            if (confirm("Do you want to remove this TO DO?")) {
                listContainer.removeChild(taskDiv);
                saveTasks();
            }
        });

        listContainer.prepend(taskDiv);
    }

    function saveTasks() {
        const tasks = [...listContainer.children].map(taskDiv => taskDiv.textContent);
        document.cookie = `tasks=${JSON.stringify(tasks)}; path=/; max-age=${60 * 60 * 24 * 7}`;
    }

    function loadTasks() {
        const cookies = document.cookie.split('; ');
        const taskCookie = cookies.find(cookie => cookie.startsWith('tasks='));

        if (taskCookie) {
            const tasks = JSON.parse(taskCookie.split('=')[1]);
            tasks.forEach(task => addTask(task));
        }
    }
});
