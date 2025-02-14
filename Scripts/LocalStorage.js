


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

function RemoveFromLocalStorage(taskId) {
    const data = GetFromLocalStorage();
    const index = data.findIndex(task => task.id === taskId);
    if (index > -1) {
        data.splice(index, 1);
    }
    localStorage.setItem('tasks', JSON.stringify(data));
}

function UpdateLocalStorage(taskId, updatedTask) {
    const data = GetFromLocalStorage();
    const index = data.findIndex(task => task.id === taskId);
    if (index > -1) {
        data[index] = updatedTask;
    }
    localStorage.setItem('tasks', JSON.stringify(data));
}

export { GetFromLocalStorage, SaveToLocalStorage, RemoveFromLocalStorage, UpdateLocalStorage };