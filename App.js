const form = document.getElementById('task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.getElementById('filter')
const taskInput = document.getElementById('task')


// Load event listener 
loadEventListeners();

// Load all event listener
function loadEventListeners(){

    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit', addTask);

    // Remove task event 
    taskList.addEventListener('click', removeTask);

    // Clear task event
    clearBtn.addEventListener('click', clearTasks);

    //Filter task event
    filter.addEventListener('keyup', filterTasks)

}


function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
      tasks =[];
  }else{
      tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){
    // Create li element, add class and innerText
    const li = document.createElement('li')
    li.className = 'collection-item'
    li.innerText = task
    // li.appendChild(document.createTextNode(taskInput.value));

    // Create link element, add class and innerHTML
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa fa-remove"></i>'

    // Append link to li 
    li.appendChild(link)

    // Append li to ul 
    taskList.appendChild(li)
  })


}


function addTask(e){

    if(taskInput.value === ''){
       return  alert('Add a Task')
    }

    // Create li element, add class and innerText
    const li = document.createElement('li')
    li.className = 'collection-item'
    li.innerText = taskInput.value
    // li.appendChild(document.createTextNode(taskInput.value));

    // Create link element, add class and innerHTML
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa fa-remove"></i>'

    // Append link to li 
    li.appendChild(link)

    // Append li to ul 
    taskList.appendChild(li)

    //** Store in LS
    StoreTaskInLocalStorage(taskInput.value);


     // Clear input 
     taskInput.value = ''
     e.preventDefault()

}


// ** this is for local storage persist 
function StoreTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks =[];
  }else{
      tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task)

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// ** 



function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove()

        // remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks =[];
  }else{
      tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearTasks(e){
    // taskList.innerHTML = ''

    //Fast
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }

    // Clear from LS
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();

}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block'
        }else{
            task.style.display = 'none'
        }
    })

}