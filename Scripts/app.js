import {
  GetFromLocalStorage,
  SaveToLocalStorage,
  RemoveFromLocalStorage,
  UpdateLocalStorage,
} from "./LocalStorage.js";

const incompleteTasks = document.getElementById("incomplete-tasks");
const inProgressTasks = document.getElementById("in-progress-tasks");
const completeTasks = document.getElementById("complete-tasks");

const taskName = document.getElementById("task-name");
const taskDesc = document.getElementById("task-desc");
const dueDate = document.getElementById("due-date");
const priority = document.getElementById("priority");
const progress = document.getElementById("progress");

const addTaskBtn = document.getElementById("addTaskBtn");

function displayTasks() {
  
  incompleteTasks.innerHTML = "";
  inProgressTasks.innerHTML = "";
  completeTasks.innerHTML = "";

  const tasks = GetFromLocalStorage();
  console.log(tasks);
  for (let data of tasks) {
    
    const taskDiv = document.createElement("div");
    const taskName = document.createElement("h3");
    const taskDesc = document.createElement("p");
    const taskPriority = document.createElement("p");
    const taskDueDate = document.createElement("p");
    const taskEdit = document.createElement("button");

    const taskEditDiv = document.createElement("div");

    const taskEditName = document.createElement("input");
    taskEditName.placeholder = "Task Name";
    taskEditName.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (taskEditName.value === "") {
        } else {
          data.name = taskEditName.value;
          taskName.innerText = data.name;
          UpdateLocalStorage(data.id, data);
          displayTasks()
        }
      }
    });

    const taskEditDesc = document.createElement("input");
    taskEditDesc.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (taskEditDesc.value === "") {
        } else {
          data.description = taskEditDesc.value;
          taskDesc.innerText = data.description;
          UpdateLocalStorage(data.id, data);
          displayTasks()
        }
      }
    });
    taskEditDesc.placeholder = "Task Description";

    const taskEditStatus = document.createElement("select");
    const statusOptions = ["Incomplete", "In Progress", "Complete"];
    statusOptions.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.addEventListener("click", (e) => {
        data.status = option;
        UpdateLocalStorage(data.id, data);

        if (data.status === "Incomplete") {
          incompleteTasks.appendChild(taskDiv);
        } else if (data.status === "In Progress") {
          inProgressTasks.appendChild(taskDiv);
        } else if (data.status === "Complete") {
          completeTasks.appendChild(taskDiv);
        }
        displayTasks()
      });
      opt.innerText = option;
      taskEditStatus.appendChild(opt);
    });

    const taskEditPriority = document.createElement("select");
    const priorityOptions = ["Low", "Medium", "High"];
    priorityOptions.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.innerText = option;

      opt.addEventListener("click", () => {
        data.priorityStatus = option;
        taskPriority.innerText = data.priorityStatus;
        UpdateLocalStorage(data.id, data);

        if (data.priorityStatus === "Low") {
          taskDiv.classList.add("order-3");
          taskDiv.classList.remove("order-1");
          taskDiv.classList.remove("order-2");
        } else if (data.priorityStatus === "Medium") {
          taskDiv.classList.add("order-2");
          taskDiv.classList.remove("order-1");
          taskDiv.classList.remove("order-3");
        } else if (data.priorityStatus === "High") {
          taskDiv.classList.add("order-1");
          taskDiv.classList.remove("order-2");
          taskDiv.classList.remove("order-3");
          displayTasks()
        }
      });

      taskEditPriority.appendChild(opt);
    });

    const taskEditDueDate = document.createElement("input");
    taskEditDueDate.type = "date";
    taskEditDueDate.addEventListener("change", () => {
      data.dueDate = taskEditDueDate.value;
      taskDueDate.innerText = data.dueDate;
      UpdateLocalStorage(data.id, data);
      displayTasks()
    });

    const taskEditclose = document.createElement("button");
    const taskEditDelete = document.createElement("button");

    taskEditDiv.classList.add(
      "flex",
      "flex-col",
      "items-center",
      "w-full",
      "h-full",
      "hidden",
      "absolute",
      "top-0",
      "left-0",
      "bg-gray-200",
      "p-4",
      "rounded-lg",
      "shadow-md",
      "overflow-auto",
      "z-10"
    );
    taskEditName.classList.add(
      "border",
      "border-gray-300",
      "p-2",
      "rounded-lg",
      "mb-2"
    );
    taskEditDesc.classList.add(
      "border",
      "border-gray-300",
      "p-2",
      "rounded-lg",
      "mb-2"
    );
    taskEditStatus.classList.add(
      "border",
      "border-gray-300",
      "p-2",
      "rounded-lg",
      "mb-2"
    );
    taskEditPriority.classList.add(
      "border",
      "border-gray-300",
      "p-2",
      "rounded-lg",
      "mb-2"
    );
    taskEditDueDate.classList.add(
      "border",
      "border-gray-300",
      "p-2",
      "rounded-lg",
      "mb-2"
    );

    taskDiv.classList.add(
      "w-[90%]",
      "h-[250px]",
      "mx-auto",
      "flex",
      "flex-col",
      "items-center",
      "bg-white",
      "rounded-lg",
      "shadow-md",
      "p-4",
      "mb-4",
      "overflow-auto",
      "relative",
      "block"
    );
    taskName.classList.add("text-2xl", "font-bold");
    taskDesc.classList.add("text-gray-700", "mb-2");
    taskPriority.classList.add("text-gray-700", "mb-2");
    taskDueDate.classList.add("text-gray-700", "mb-2");
    taskEdit.classList.add(
      "bg-blue-500",
      "text-white",
      "px-4",
      "py-2",
      "rounded"
    );
    taskEdit.innerText = "Edit";

    taskEdit.addEventListener("click", () => {
      taskEditDiv.classList.toggle("hidden");
    });

    taskEditclose.innerText = "Close";
    taskEditclose.classList.add(
      "bg-blue-500",
      "text-white",
      "px-4",
      "py-2",
      "rounded"
    );
    taskEditclose.addEventListener("click", () => {
      taskEditDiv.classList.toggle("hidden");
    });

    taskEditDelete.innerText = "Delete";
    taskEditDelete.classList.add(
      "bg-red-500",
      "text-white",
      "px-4",
      "py-2",
      "rounded"
    );
    taskEditDelete.addEventListener("click", () => {
      RemoveFromLocalStorage(data.id);
      taskDiv.remove();
    });

    taskName.innerText = data.name;
    taskDesc.innerText = data.description;

    taskPriority.innerText = data.priorityStatus;
    taskDueDate.innerText = data.dueDate;

    if (data.priorityStatus === "Low") {
      taskDiv.classList.add("order-3");
      taskDiv.classList.remove("order-1");
      taskDiv.classList.remove("order-2");
    } else if (data.priorityStatus === "Medium") {
      taskDiv.classList.add("order-2");
      taskDiv.classList.remove("order-1");
      taskDiv.classList.remove("order-3");
    } else if (data.priorityStatus === "High") {
      taskDiv.classList.add("order-1");
      taskDiv.classList.remove("order-2");
      taskDiv.classList.remove("order-3");
    }

    taskDiv.appendChild(taskName);
    taskDiv.appendChild(taskDesc);
    taskDiv.appendChild(taskDueDate);
    taskDiv.appendChild(taskPriority);
    taskDiv.appendChild(taskEdit);
    taskDiv.appendChild(taskEditDiv);
    taskEditDiv.appendChild(taskEditName);
    taskEditDiv.appendChild(taskEditDesc);
    taskEditDiv.appendChild(taskEditStatus);
    taskEditDiv.appendChild(taskEditPriority);
    taskEditDiv.appendChild(taskEditDueDate);
    taskEditDiv.appendChild(taskEditclose);
    taskEditDiv.appendChild(taskEditDelete);

    console.log(data.status);
    if (data.status === "Incomplete") {
      incompleteTasks.appendChild(taskDiv);
    } else if (data.status === "In Progress") {
      inProgressTasks.appendChild(taskDiv);
    } else if (data.status === "Complete") {
      completeTasks.appendChild(taskDiv);
    }
  }
}

addTaskBtn.addEventListener("click", () => {
  if (
    taskName.value === "" ||
    taskDesc.value === "" ||
    dueDate.value === "" ||
    priority.value === "" ||
    progress.value === ""
  ) {
  } else {
    const task = {
        id: Math.floor(Math.random() * 1000),
      name: taskName.value,
      description: taskDesc.value,
      status: progress.value,
      priorityStatus: priority.value,
      dueDate: dueDate.value,
    };

    SaveToLocalStorage(task);
    displayTasks();
  }
});

displayTasks();
