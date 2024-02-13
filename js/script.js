const toDoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const toDoList = document.querySelector(".todo-list");
const toDoCompleted = document.querySelector(".todo-completed");

let toDoData = JSON.parse(localStorage.getItem("todo")) || [];

const render = function () {
  toDoList.innerHTML = "";
  toDoCompleted.innerHTML = "";
  toDoData.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";

    if (item.completed) {
      toDoCompleted.append(li);
    } else {
      toDoList.append(li);
    }

    li.querySelector(".todo-complete").addEventListener("click", () => {
      item.completed = !item.completed;
      render();
    });
    li.querySelector(".todo-remove").addEventListener("click", () => {
      toDoData.splice(index, 1);

      localStorage.setItem("todo", JSON.stringify(toDoData));
      render();
    });
  });
  localStorage.setItem("todo", JSON.stringify(toDoData));
};

render();

toDoControl.addEventListener("submit", (event) => {
  event.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  if (newToDo.text.trim() !== "") {
    toDoData.push(newToDo);
    headerInput.value = "";
  }
  localStorage.setItem("todo", JSON.stringify(toDoData));
  render();
});
