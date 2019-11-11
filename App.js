const form = document.getElementById('task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.getElementById('filter')
const taskInput = document.getElementById('task')


// Load event listener 
loadEventListeners();

// Load all event listener
function loadEventListeners(){
    form.addEventListener('submit', addTask);

    // Remove task event 
    taskList.addEventListener('click', removeTask);

    // Clear task event
    clearBtn.addEventListener('click', clearTasks);

    //Filter task event
    filter.addEventListener('keyup', filterTasks)

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

     // Clear input 
     taskInput.value = ''
     e.preventDefault()

}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove()
        }
    }
}

function clearTasks(e){
    // taskList.innerHTML = ''

    //Fast
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)

    }
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