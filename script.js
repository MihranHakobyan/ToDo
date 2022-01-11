let todoInput = document.querySelector(".todo_input")
let todoButton = document.querySelector(".todo_button")
let todoFilter = document.querySelector(".todo_filter")
let todoList = document.querySelector(".todo_list")
let todo_div=document.querySelectorAll(".todo_div")

todoButton.addEventListener("click", addTodo)
todoFilter.addEventListener("click", filter)
todoList.addEventListener("click",deleteCheck)


function addTodo(event) {
    event.preventDefault()

    if (!todoInput.value.trim()) return;

    let todoDiv = document.createElement("div")
    todoDiv.classList.add("todo_div")
    let todoText = document.createElement("p")
    todoText.classList.add("todo_text")
    todoText.innerText = todoInput.value
    let todoIcones = document.createElement("div")
    todoIcones.classList.add("Icones")
    todoIcones.innerHTML = "<i class='fas fa-check'></i>"
    todoIcones.innerHTML += "<i class='fas fa-times'></i>"
    todoList.appendChild(todoDiv)
    todoDiv.appendChild(todoText)
    todoDiv.appendChild(todoIcones)


    /***call functions***/
    saveInLocalStorage(todoInput.value)

    /***clean input***/
    todoInput.value = "";
}
/******save in localstorage******/
function saveInLocalStorage(text){
    let todos;
    if(localStorage.getItem("todos")==null){
        todos=[]
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(text)
    localStorage.setItem("todos",JSON.stringify(todos))
}
    
function removeInLocalStorage(text){
    let todos
    if(localStorage.getItem("todos")==null){
        todos=[]
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    const index = todos.indexOf(text)
    todos.splice(index, 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}





function deleteCheck(event){
    let item=event.target
    if(item.classList[1]=="fa-check"){
        let todo= item.parentElement.parentElement;
        todo.classList.toggle("completed")
    }
    if(item.classList[1]=="fa-times"){
        let todo= item.parentElement.parentElement;
        removeInLocalStorage(todo.children[0].innerText)
        todo.classList.add("delete")
        
        todo.addEventListener("transitionend", function() {
               todo.remove()
        })
    }
}
function filter(event) {
    console.log("fdss")
    const todos = document.querySelectorAll(".todo_div")
    todos.forEach(todo => {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            default:
                todo.style.display = "flex";
        }

    })
}


