const formButton = document.getElementById("box__form-button");
const formInput = document.getElementById("box__form-input");
const boxTask = document.querySelector(".box__task");

let tasks;
!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem("tasks")));

let todoItemElems = [];

function Task(description) {
  this.description = description;
  this.completed = false;
}

const createTemplate = (task, index) => {
  return `          <div class="box__task-1 ${task.completed ? "checked" : ""}">
  <div class="box__task-1-text">${task.description}</div>
  <div class="box__task-1-button">
    <input onclick="completeTask(${index})" class="box__task-1-button-input" type="checkbox" ${
    task.completed ? "checked" : ""
  }>
    <button onclick="deleteTask(${index})" class="box__task-1-button-delete">
      <img src="./img/delete.png" alt="del">
    </button>
  </div>
</div>`;
};

const filterTasks = () => {
  const activeTasks =
    tasks.length && tasks.filter((item) => item.completed == false);
  const completedTasks =
    tasks.length && tasks.filter((item) => item.completed == true);
  tasks = [...activeTasks, ...completedTasks];
};

const fillHtmlList = () => {
  boxTask.innerHTML = "";
  if (tasks.length > 0) {
    filterTasks();
    tasks.forEach((item, index) => {
      boxTask.innerHTML += createTemplate(item, index);
    });
    todoItemElems = document.querySelectorAll(".box__task-1");
  }
};

fillHtmlList();

const updateLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoItemElems[index].classList.add("checked");
  } else {
    todoItemElems[index].classList.remove("checked");
  }
  updateLocal();
  fillHtmlList();
};

formButton.addEventListener("click", () => {
  tasks.push(new Task(formInput.value));
  updateLocal();
  fillHtmlList();
  formInput.value = "";
});

const deleteTask = (index) => {
  todoItemElems[index].classList.add("delition");
  setTimeout(() => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
  }, 500);
};
