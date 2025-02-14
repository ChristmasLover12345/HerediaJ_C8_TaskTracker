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
                UpdateLocalStorage(data);

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

                opt.addEventListener('click', (e) => { 
                    task.priorityStatus = option;
                    taskPriority.innerText = task.priorityStatus;
                    UpdateLocalStorage(data);

                    if (task.priorityStatus === 'Low') {
                        taskDiv.classList.add('order-3');
                        taskDiv.classList.remove('order-1');
                        taskDiv.classList.remove('order-2');
                    }
                    else if (task.priorityStatus === 'Medium') {
                        taskDiv.classList.add('order-2');
                        taskDiv.classList.remove('order-1');
                        taskDiv.classList.remove('order-3');
                    }
                    else if (task.priorityStatus === 'High') {
                        taskDiv.classList.add('order-1');
                        taskDiv.classList.remove('order-2');
                        taskDiv.classList.remove('order-3');
                    }


                });


                taskEditPriority.appendChild(opt);
            });

            const taskEditDueDate = document.createElement('input');
            taskEditDueDate.type = 'date';

            const taskEditclose = document.createElement('button');
            const taskEditDelete = document.createElement('button');


            taskEditDiv.classList.add('flex', 'flex-col', 'items-center', 'w-full', 'h-full', 'hidden', 'absolute', 'top-0', 'left-0', 'bg-gray-200', 'p-4', 'rounded-lg', 'shadow-md');



            taskDiv.classList.add('w-[90%]',"h-[100px]", 'mx-auto', 'flex', 'justify-between', 'items-center', 'bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'mb-4', 'overflow-auto', 'relative');
            taskName.classList.add('text-lg', 'font-bold');
            taskDesc.classList.add('text-gray-700');
            taskPriority.classList.add('text-gray-700');
            taskDueDate.classList.add('text-gray-700');
            taskEdit.classList.add('bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded');
            taskEdit.innerText = 'Edit';


            


            taskEdit.addEventListener('click', (e) => {
                taskEditDiv.classList.toggle('hidden');
                
            });
          
          taskEditclose.innerText = 'Close';
            taskEditclose.classList.add('bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded');
            taskEditclose.addEventListener('click', (e) => {
                taskEditDiv.classList.toggle('hidden');
            })
          
          
            taskName.innerText = data.name;
            taskDesc.innerText = data.description;
            
            taskPriority.innerText = data.priorityStatus;
            taskDueDate.innerText = data.dueDate;


            if (task.priorityStatus === 'Low') {
                taskDiv.classList.add('order-3');
                taskDiv.classList.remove('order-1');
                taskDiv.classList.remove('order-2');
            }
            else if (task.priorityStatus === 'Medium') {
                taskDiv.classList.add('order-2');
                taskDiv.classList.remove('order-1');
                taskDiv.classList.remove('order-3');
            }
            else if (task.priorityStatus === 'High') {
                taskDiv.classList.add('order-1');
                taskDiv.classList.remove('order-2');
                taskDiv.classList.remove('order-3');
            }



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