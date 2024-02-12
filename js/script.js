const toDoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const toDoList = document.querySelector(".todo-list");
const toDoCompleted = document.querySelector(".todo-completed");
const toDoRemove = document.querySelector(".todo-remove");

const toDoData = JSON.parse(localStorage.getItem("todo")) || [];

const render = function () {
  toDoList.innerHTML = "";
  toDoCompleted.innerHTML = "";
  toDoData.forEach(function (item) {
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

    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });
    li.querySelector(".todo-remove").addEventListener(
      "click",
      function (event) {
        let i = event.target.offsetParent.offsetParent.textContent;

        if (i === item.text) {
          toDoData.splice(i, 1);
          //localStorage.removeItem("todo");
        }

        localStorage.setItem("todo", JSON.stringify(toDoData));
        render();
      }
    );
  });
  localStorage.setItem("todo", JSON.stringify(toDoData));
};

toDoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  if (newToDo.text !== "") {
    toDoData.push(newToDo);
    headerInput.value = "";
  }
  localStorage.setItem("todo", JSON.stringify(toDoData));
  render();
});

render();
