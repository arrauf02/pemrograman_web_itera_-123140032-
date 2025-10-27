document.addEventListener('DOMContentLoaded', () => {

    // Selektor DOM
    const clockDisplay = document.getElementById('clock-display');
    const dateDisplay = document.getElementById('date-display');
    
    // Tugas (CRUD)
    const todoInput = document.getElementById('todo-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    
    // Jadwal Kuliah (Statis)
    const scheduleBody = document.getElementById('schedule-body');
    
    // Catatan (Update)
    const notesArea = document.getElementById('notes-area');

    // Jadwal Hari Ini (CRUD)
    const appointmentTime = document.getElementById('appointment-time');
    const appointmentDesc = document.getElementById('appointment-desc');
    const addAppointmentBtn = document.getElementById('add-appointment-btn');
    const appointmentList = document.getElementById('appointment-list');

    // State Aplikasi 
    let tasks = [];
    let appointments = [];

    // FITUR ES6+: Classes 
    class Task {
        constructor(id, text, isEditing = false) {
            this.id = id;
            this.text = text;
            this.isEditing = isEditing; // Status untuk mode Update
        }
    }
    
    class Appointment {
        constructor(id, time, desc, isEditing = false) {
            this.id = id;
            this.time = time;
            this.desc = desc;
            this.isEditing = isEditing; // Status untuk mode Update
        }
    }

    //Jam (Real-time)
    const updateTime = () => {
        const now = new Date();
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        clockDisplay.textContent = now.toLocaleTimeString('id-ID', timeOptions);
        dateDisplay.textContent = now.toLocaleDateString('id-ID', dateOptions);
    };

    //Jadwal Hari Ini 
    
    // Helper localStorage (Arrow Function)
    const getTodayString = () => new Date().toISOString().split('T')[0];
    const saveAppointments = () => {
        localStorage.setItem('dailyAppointments', JSON.stringify(appointments));
        localStorage.setItem('appointmentsDate', getTodayString());
    };

    const loadAppointments = () => {
        const storedDate = localStorage.getItem('appointmentsDate');
        if (storedDate === getTodayString()) {
            const stored = localStorage.getItem('dailyAppointments');
            // Konversi data JSON mentah menjadi instance Class
            if (stored) {
                appointments = JSON.parse(stored).map(a => new Appointment(a.id, a.time, a.desc, false));
            }
        } else {
            appointments = [];
            saveAppointments(); // Hapus data lama & simpan tanggal baru
        }
        renderAppointments();
    };

    // READ 
    const renderAppointments = () => {
        appointmentList.innerHTML = '';
        appointments.sort((a, b) => a.time.localeCompare(b.time));

        appointments.forEach(appt => {
            const li = document.createElement('li');
            li.setAttribute('data-id', appt.id);
            
            // === FITUR ES6+: Template Literals (Mode Baca vs Edit) ===
            if (appt.isEditing) {
                // Mode UPDATE
                li.innerHTML = `
                    <input type="time" class="edit-time" value="${appt.time}">
                    <input type="text" class="edit-desc" value="${appt.desc}">
                    <div class="action-buttons">
                        <button class="save-btn action-btn" data-id="${appt.id}">Simpan</button>
                    </div>
                `;
            } else {
                // Mode READ
                li.innerHTML = `
                    <div class="appointment-details">
                        <span class="time">${appt.time}</span>
                        <span class="desc">${appt.desc}</span>
                    </div>
                    <div class="action-buttons">
                        <button class="edit-btn action-btn" data-id="${appt.id}">Edit</button>
                        <button class="delete-btn action-btn" data-id="${appt.id}">X</button>
                    </div>
                `;
            }
            appointmentList.appendChild(li);
        });
    };

    // CREATE 
    const addAppointment = () => {
        const time = appointmentTime.value;
        const desc = appointmentDesc.value.trim();
        if (time === '' || desc === '') return;

        appointments.push(new Appointment(Date.now(), time, desc));
        saveAppointments();
        renderAppointments();
        appointmentTime.value = '';
        appointmentDesc.value = '';
    };

    // Event Handler untuk UPDATE dan DELETE 
    const handleAppointmentClick = (e) => {
        const id = Number(e.target.dataset.id);
        const targetAppt = appointments.find(a => a.id === id);

        if (!targetAppt) return;

        if (e.target.classList.contains('delete-btn')) {
            // DELETE
            appointments = appointments.filter(a => a.id !== id);
            saveAppointments();
            renderAppointments();
        } else if (e.target.classList.contains('edit-btn')) {
            // UPDATE (Step 1: Masuk mode edit)
            targetAppt.isEditing = true;
            renderAppointments();
        } else if (e.target.classList.contains('save-btn')) {
            // UPDATE (Step 2: Simpan perubahan)
            const li = e.target.closest('li');
            const newTime = li.querySelector('.edit-time').value;
            const newDesc = li.querySelector('.edit-desc').value;
            
            targetAppt.time = newTime;
            targetAppt.desc = newDesc;
            targetAppt.isEditing = false;
            
            saveAppointments();
            renderAppointments();
        }
    };
    

    //Jadwal Kuliah (Statis) 
    const renderSchedule = () => {
        const scheduleData = [
            { matkul: "intelegensi buatan", hari: "Senin", jam: "13.00 -15.30 ", ruangan: "GK2 124" },
            { matkul: "KEK", hari: "Selasa", jam: "09.20 - 11.00", ruangan: "GK2 223" },
            { matkul: "ASDOS TBFO", hari: "Selasa", jam: "15.00 - 17.30", ruangan: "GK2 110" },
            { matkul: "Praktikum Jarkom", hari: "Rabu", jam: "07.30 - 10.00", ruangan: "Lab IOT" },
            { matkul: "K3L", hari: "Rabu", jam: "10.20 - 12.00", ruangan: "GK2 112" },
            { matkul: "Kapita Selekta", hari: "Rabu", jam: "13.30 - 15.30", ruangan: "GK2 311" },
            { matkul: "MPTI", hari: "Kamis", jam: "08.00 - 10.00", ruangan: "GK2 223" },
            { matkul: "METOPEN", hari: "Kamis", jam: "13.00 - 15.30", ruangan: "GK2 318" },
            { matkul: "JARKOM", hari: "Jumat", jam: "08.00 - 10.00", ruangan: "Lab IOT" },
            { matkul: "Sistem Informasi", hari: "Jumat", jam: "10.00 - 11.45", ruangan: "GK2 114" },
            { matkul: "PemWeb", hari: "Jumat", jam: "13.00 - 15.00", ruangan: "GK2 123" },
            { matkul: "Praktikum Pemweb", hari: "Sabtu", jam: "15.00 - 17.30", ruangan: " " },
        ];
        scheduleBody.innerHTML = ''; 
        scheduleData.forEach(item => {
            scheduleBody.innerHTML += `<tr><td>${item.matkul}</td><td>${item.hari}</td><td>${item.jam}</td><td>${item.ruangan}</td></tr>`;
        });
    };

    //Daftar Tugas (CRUD) 
    const saveTasks = () => {
        localStorage.setItem('dashboardTasks', JSON.stringify(tasks));
    };
    const loadTasks = () => {
        const stored = localStorage.getItem('dashboardTasks');
        // Konversi data JSON mentah menjadi instance Class
        if (stored) {
            tasks = JSON.parse(stored).map(t => new Task(t.id, t.text, false));
        }
        renderTasks();
    };

    // READ 
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.setAttribute('data-id', task.id);
            
            if (task.isEditing) {
                // Mode UPDATE
                li.innerHTML = `
                    <input type="text" class="edit-input" value="${task.text}">
                    <div class="action-buttons">
                        <button class="save-btn action-btn" data-id="${task.id}">Simpan</button>
                    </div>
                `;
            } else {
                // Mode READ
                li.innerHTML = `
                    <span class="task-text">${task.text}</span>
                    <div class="action-buttons">
                        <button class="edit-btn action-btn" data-id="${task.id}">Edit</button>
                        <button class="delete-btn action-btn" data-id="${task.id}">X</button>
                    </div>
                `;
            }
            taskList.appendChild(li);
        });
    };

    // CREATE 
    const addTask = () => {
        const taskText = todoInput.value.trim();
        if (taskText === '') return;
        tasks.push(new Task(Date.now(), taskText));
        saveTasks();
        renderTasks();
        todoInput.value = '';
    };

    // Event Handler untuk UPDATE dan DELETE 
    const handleTaskClick = (e) => {
        const id = Number(e.target.dataset.id);
        const targetTask = tasks.find(t => t.id === id);

        if (!targetTask) return;

        if (e.target.classList.contains('delete-btn')) {
            // DELETE
            tasks = tasks.filter(t => t.id !== id);
            saveTasks();
            renderTasks();
        } else if (e.target.classList.contains('edit-btn')) {
            // UPDATE (Step 1: Masuk mode edit)
            targetTask.isEditing = true;
            renderTasks();
        } else if (e.target.classList.contains('save-btn')) {
            // UPDATE (Step 2: Simpan perubahan)
            const li = e.target.closest('li');
            const newText = li.querySelector('.edit-input').value.trim();
            
            if (newText) {
                targetTask.text = newText;
                targetTask.isEditing = false;
                saveTasks();
                renderTasks();
            }
        }
    };


    //Catatan Singkat 
    const saveNotes = () => {
        localStorage.setItem('dashboardNotes', notesArea.value);
    };
    const loadNotes = () => {
        notesArea.value = localStorage.getItem('dashboardNotes') || '';
    };

    // FITUR ES6+: Async/Await dan Promise 
    const setupDashboard = async () => {
        updateTime();
        setInterval(updateTime, 1000);
        renderSchedule();

        // Mensimulasikan pemuatan data asinkron
        await new Promise(resolve => setTimeout(resolve, 100)); // Delay kecil
        
        loadTasks();
        loadAppointments();
        loadNotes();

        // Setup Event Listeners
        addTaskBtn.addEventListener('click', addTask);
        todoInput.addEventListener('keypress', (e) => e.key === 'Enter' && addTask());
        taskList.addEventListener('click', handleTaskClick);

        addAppointmentBtn.addEventListener('click', addAppointment);
        appointmentList.addEventListener('click', handleAppointmentClick);

        notesArea.addEventListener('keyup', saveNotes);
    };

    setupDashboard();
});