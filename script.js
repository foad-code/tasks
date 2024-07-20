document.addEventListener('DOMContentLoaded', function() {
    // تسجيل المستخدم
    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener('submit', function(event) {
            event.preventDefault();
            // الحصول على البيانات
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // التحقق من صحة البيانات
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // تخزين بيانات المستخدم
            localStorage.setItem('user', JSON.stringify({ fullName, email, password }));

            // الانتقال إلى صفحة تسجيل الدخول
            window.location.href = 'login.html';
        });
    }

    // تسجيل الدخول
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            // الحصول على البيانات
            const loginEmail = document.getElementById('loginEmail').value;
            const loginPassword = document.getElementById('loginPassword').value;

            // الحصول على بيانات المستخدم من التخزين
            const user = JSON.parse(localStorage.getItem('user'));

            // التحقق من صحة البيانات
            if (user && user.email === loginEmail && user.password === loginPassword) {
                // الانتقال إلى صفحة إدارة المهام
                window.location.href = 'tasks.html';
            } else {
                alert('Invalid email or password!');
            }
        });
    }

    // إدارة المهام
    if (document.getElementById('taskForm')) {
        document.getElementById('taskForm').addEventListener('submit', function(event) {
            event.preventDefault();
            // الحصول على البيانات
            const taskTitle = document.getElementById('taskTitle').value;
            const taskDescription = document.getElementById('taskDescription').value;
            const taskDueDate = document.getElementById('taskDueDate').value;

            // الحصول على المهام من التخزين
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

            // إضافة المهمة الجديدة
            tasks.push({ taskTitle, taskDescription, taskDueDate });

            // تخزين المهام
            localStorage.setItem('tasks', JSON.stringify(tasks));

            // عرض المهام
            displayTasks();
        });

        // عرض المهام
        function displayTasks() {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';

            tasks.forEach((task, index) => {
                const taskItem = document.createElement('div');
                taskItem.className = 'task-item';
                taskItem.innerHTML = `
                    <h3>${task.taskTitle}</h3>
                    <p>${task.taskDescription}</p>
                    <p>Due Date: ${task.taskDueDate}</p>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                `;
                taskList.appendChild(taskItem);
            });
        }

        // تعديل المهمة
        window.editTask = function(index) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const task = tasks[index];

            document.getElementById('taskTitle').value = task.taskTitle;
            document.getElementById('taskDescription').value = task.taskDescription;
            document.getElementById('taskDueDate').value = task.taskDueDate;

            // حذف المهمة من القائمة
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));

            // عرض المهام
            displayTasks();
        }

        // حذف المهمة
        window.deleteTask = function(index) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));

            // عرض المهام
            displayTasks();
        }

        // عرض المهام عند تحميل الصفحة
        displayTasks();
    }
});
