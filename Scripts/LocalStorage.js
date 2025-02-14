const task = {
    name: "Task Name",
    description: "Task Description",
    status: "Incomplete", 
    priorityStatus: "High", 
    dueDate: "2023-12-31" 
};


function GetFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks === null) {
        return [];
    }

    return tasks;
}

function SaveToLocalStorage(task) {
    const data = GetFromLocalStorage()
    if (data.includes(task)) {
        return;
    }
    data.push(task);
    localStorage.setItem('tasks', JSON.stringify(data));
}

function RemoveFromLocalStorage(task) {
    const data = GetFromLocalStorage();
    const index = data.indexOf(task);
    if (index > -1) {
        data.splice(index, 1);
    }
    localStorage.setItem('tasks', JSON.stringify(data));
}

function UpdateLocalStorage(task) {
    const data = GetFromLocalStorage();
    const index = data.indexOf(task);
    if (index > -1) {
        data[index] = task;
    }
    localStorage.setItem('tasks', JSON.stringify(data));
}

export { GetFromLocalStorage, SaveToLocalStorage, RemoveFromLocalStorage, UpdateLocalStorage };