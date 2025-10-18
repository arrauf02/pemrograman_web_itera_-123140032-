let tasks = [];

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateIncompleteCount(); 
}


function validateTask(name, deadline) {
    if (!name.trim()) {
        return "Nama tugas tidak boleh kosong.";
    }

    if (!deadline) {
        return "Deadline tugas wajib diisi.";
    }

    const deadlineDate = new Date(deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(deadlineDate.getTime()) || deadlineDate < today) {
        return "Deadline tidak valid atau sudah terlewat.";
    }

    return null; 
}

function addTask(e) {
    e.preventDefault();

    const nameInput = document.getElementById('task-name');
    const courseInput = document.getElementById('task-course');
    const deadlineInput = document.getElementById('task-deadline');
    const errorDisplay = document.getElementById('form-error');

    const name = nameInput.value;
    const course = courseInput.value;
    const deadline = deadlineInput.value;

    const validationError = validateTask(name, deadline);

    if (validationError) {
        errorDisplay.textContent = validationError;
        return;
    }

    errorDisplay.textContent = ''; 

    const newTask = {
        id: Date.now(), 
        name: name,
        course: course || 'Umum',
        deadline: deadline,
        isCompleted: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    nameInput.value = '';
    courseInput.value = '';
    deadlineInput.value = '';
}

function toggleComplete(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    if (confirm("Anda yakin ingin menghapus tugas ini?")) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }
}

function getFilteredTasks() {
    const filterStatus = document.getElementById('filter-status').value;
    const searchCourse = document.getElementById('search-course').value.toLowerCase();

    let filteredTasks = tasks;

    if (filterStatus === 'incomplete') {
        filteredTasks = filteredTasks.filter(task => !task.isCompleted);
    } else if (filterStatus === 'completed') {
        filteredTasks = filteredTasks.filter(task => task.isCompleted);
    }

    if (searchCourse) {
        filteredTasks = filteredTasks.filter(task => 
            task.course.toLowerCase().includes(searchCourse)
        );
    }

    return filteredTasks;
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    const filteredTasks = getFilteredTasks();
    
    taskList.innerHTML = '';

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `<p style="text-align: center; color: #999;">Tidak ada tugas yang cocok dengan filter.</p>`;
        return;
    }

    filteredTasks.sort((a, b) => {
        if (a.isCompleted && !b.isCompleted) return 1;
        if (!a.isCompleted && b.isCompleted) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.isCompleted ? 'completed' : ''}`;
        
        const completeButtonText = task.isCompleted ? 'Batalkan' : 'Selesai';
        const completeButtonClass = task.isCompleted ? 'complete-btn' : 'complete-btn mark-done';

        li.innerHTML = `
            <div class="task-info">
                <h4>${task.name} <span style="font-size: 0.8em; color: #007bff;">(${task.course})</span></h4>
                <p>Deadline: ${new Date(task.deadline).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p style="color: ${task.isCompleted ? 'green' : (new Date(task.deadline) < new Date() ? 'red' : '#333')}; font-weight: bold;">Status: ${task.isCompleted ? 'Selesai' : 'Belum Selesai'}</p>
            </div>
            <div class="task-actions">
                <button class="${completeButtonClass}" onclick="toggleComplete(${task.id})">${completeButtonText}</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Hapus</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function updateIncompleteCount() {
    const incompleteCount = tasks.filter(task => !task.isCompleted).length;
    document.getElementById('incomplete-count').textContent = incompleteCount;
}


document.getElementById('task-form').addEventListener('submit', addTask);

document.getElementById('filter-status').addEventListener('change', renderTasks);
document.getElementById('search-course').addEventListener('input', renderTasks);

document.addEventListener('DOMContentLoaded', loadTasks);