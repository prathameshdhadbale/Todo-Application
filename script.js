
function gettodolist() {
    let string_todolist = localStorage.getItem("todoList");
    let todoList = JSON.parse(string_todolist);
    if (todoList === null) {
        return [];
    } else {
        return todoList;
    }
}

function saveTodoList(todoList) {
    let string_todolist = JSON.stringify(todoList);
    localStorage.setItem("todoList", string_todolist);
}


let todoItemsContainer = document.getElementById('todoItemsContainer');
let unique = 4;

let todoList = gettodolist();

function deleteTodo(todoId, todoList) {
    let todoElement = document.getElementById(todoId);
    let unique_no = parseInt(todoId[4]);
    let index = todoList.findIndex(element => element.unique_no === unique_no);
    console.log(index)
    todoList.splice(index, 1);
    todoItemsContainer.removeChild(todoElement);
}

function onStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    let indexTodoObj = todoList.findIndex((todo_item) => {
        let todoid = "todo" + todo_item.unique_no;
        if (todoid === todoId) {
            return true;
        } else {
            return false;
        }
    });

    if (todoList[indexTodoObj].checked === true) {
        todoList[indexTodoObj].checked = false;
    } else {
        todoList[indexTodoObj].checked = true;
    }
}

function createandappendtodo(todo) {
    let todoId = "todo" + todo.unique_no;
    let checkboxId = "checkbox" + todo.unique_no;
    let labelId = "label" + todo.unique_no;


    let todoElement = document.createElement('li');
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row", "m-2");
    todoElement.id = todoId;
    todoItemsContainer.append(todoElement);

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = checkboxId;
    checkbox.checked = todo.checked;
    checkbox.classList.add("checkbox-input")
    checkbox.onclick = function() {
        onStatusChange(checkboxId, labelId, todoId);
    }
    todoElement.append(checkbox);

    let labelContainer = document.createElement('div');
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.append(labelContainer);

    let label = document.createElement('label');
    label.setAttribute("for", checkboxId);
    label.classList.add("checkbox-label")
    label.textContent = todo.text;
    if (todo.checked === true) {
        label.classList.add("checked");
    }
    label.id = labelId;
    labelContainer.append(label);

    let deleteIconContainer = document.createElement('div');
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.append(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        deleteTodo(todoId, todoList);

    };
    deleteIconContainer.append(deleteIcon);

}

function addTodo() {
    let todoUserInput = document.getElementById('todoUserInput');
    if (todoUserInput.value === "") {
        alert("the Task Input empty");
        return;
    }
    const newTodo = {
        text: todoUserInput.value,
        unique_no: unique,
        checked: false
    };
    unique += 1;
    todoList.push(newTodo);
    createandappendtodo(newTodo);
    todoUserInput.value = "";

}


document.getElementById('addTodoButton').addEventListener("click", function() {
    addTodo();

})

document.getElementById('saveTodoButton').addEventListener("click", function() {
    saveTodoList(todoList);
})

for (let eachtodo of todoList) {
    createandappendtodo(eachtodo);
}