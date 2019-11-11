const taskInput = document.getElementById('task')
const form = document.getElementById('task-form')
const clearBtn = document.getElementsByClassName('clear-tasks')
const filter = document.getElementById('filter')
const taskList = document.getElementsByClassName('collection')

// Load event listener 
loadEventListeners();

// Load all event listener
function loadEventListeners(){
    form.addEventListener('submit', addTask);
}

function addTask(e){
    e.preventDefault()

    if(taskInput.value === ''){
        alert('Add a Task')
    }

    // Create li element, add class and innerText
    const li = document.createElement('li')
    li.className = 'collection-item'
    li.innerText = taskInput.value

    // Create link element, add class and innerHTML
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa fa-remove"></i>'

    // Append link to li 
    li.appendChild(link)
    

    // Clear input 
    taskInput.value = ''

    // Append li to ul 
    taskList[0].appendChild(li)

}