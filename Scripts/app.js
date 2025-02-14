import { GetFromLocalStorage, SaveToLocalStorage, RemoveFromLocalStorage, UpdateLocalStorage } from "./LocalStorage.js";


    const incompleteTasks = document.getElementById('incomplete-tasks');
    const inProgressTasks = document.getElementById('in-progress-tasks');
    const completeTasks = document.getElementById('complete-tasks');

    const taskName = document.getElementById('task-name');
    const taskDesc = document.getElementById('task-desc');
    const dueDate = document.getElementById('due-date');
    const priority = document.getElementById('priority');
    const progress = document.getElementById('progress');

    const addTaskBtn = document.getElementById('addTaskBtn');







    function displayTasks() {

        const tasks = GetFromLocalStorage();
        for (let data of tasks)
        {

            const taskDiv = document.createElement('div');
            const taskName = document.createElement('h3');
            const taskDesc = document.createElement('p');
            const taskPriority = document.createElement('p');
            const taskDueDate = document.createElement('p');
            const taskEdit = document.createElement('button');

            const taskEditDiv = document.createElement('div');
            const taskEditName = document.createElement('input');
            const taskEditDesc = document.createElement('input');

            const taskEditStatus = document.createElement('select');
            const statusOptions = ['Incomplete', 'In Progress', 'Complete'];
            statusOptions.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.addEventListener('click', (e) => {
                task.status = option;
                    

                if (task.status === 'Incomplete') {
                    incompleteTasks.appendChild(taskDiv);
                } else if (task.status === 'In Progress') {
                    inProgressTasks.appendChild(taskDiv);
                } else if (task.status === 'Complete') {
                    completeTasks.appendChild(taskDiv);
                }

                })
                opt.innerText = option;
                taskEditStatus.appendChild(opt);
            });

            const taskEditPriority = document.createElement('select');
            const priorityOptions = ['Low', 'Medium', 'High'];
            priorityOptions.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.innerText = option;

                


                taskEditPriority.appendChild(opt);
            });

            const taskEditDueDate = document.createElement('input');
            taskEditDueDate.type = 'date';

            const taskEditSave = document.createElement('button');
            const taskEditDelete = document.createElement('button');


            taskEditDiv.classList.add('flex', 'justify-between', 'items-center', 'w-full', 'h-full', 'hidden');



            taskDiv.classList.add('w-[90%]',"h-[100px]", 'mx-auto', 'flex', 'justify-between', 'items-center', 'bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'mb-4');
            taskName.classList.add('text-lg', 'font-bold');
            taskDesc.classList.add('text-gray-700');
            taskPriority.classList.add('text-gray-700');
            taskDueDate.classList.add('text-gray-700');
            taskEdit.classList.add('bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded');
            taskEdit.innerText = 'Edit';


            taskEdit.addEventListener('click', (e) => {
                taskEditDiv.classList.toggle('hidden');
            });
          
          
          
          
            taskName.innerText = data.name;
            taskDesc.innerText = data.description;
            
            taskPriority.innerText = data.priorityStatus;
            taskDueDate.innerText = data.dueDate;




            taskDiv.appendChild(taskName);
            taskDiv.appendChild(taskDesc);
            taskDiv.appendChild(taskDueDate);
            taskDiv.appendChild(taskPriority);
            if (task.status === 'Incomplete') {
                incompleteTasks.appendChild(taskDiv);
            } else if (task.status === 'In Progress') {
                inProgressTasks.appendChild(taskDiv);
            } else if (task.status === 'Complete') {
                completeTasks.appendChild(taskDiv);
            }
        };

    }






addTaskBtn.addEventListener('click', (e) => {
    const task = {
    name: taskName.value,
    description: taskDesc.value,
    status: progress.value, 
    priorityStatus: priority.value, 
    dueDate: dueDate.value 
    };

    SaveToLocalStorage(task);
});