
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const titleInput = document.querySelector('#task');
    const descriptionInput = document.querySelector('#description');
    const uncompletedTasks = document.querySelector('#uncompletedTasks');
    const completedTasks = document.querySelector('#completedTasks');
    
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
      tasks = JSON.parse(tasks);
    } else {
      tasks = [];
    }
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  

    function displayTasks() {
      uncompletedTasks.innerHTML = '';
      completedTasks.innerHTML = '';
  
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `Task: ${task.title}, Description: ${task.description} 
          <button onclick="completeTask(${index})">Complete</button> 
          <button onclick="deleteTask(${index})">Delete</button>`;
        if (task.completed) {
          li.classList.add('completed');
          completedTasks.appendChild(li);
        } else {
          uncompletedTasks.appendChild(li);
        }
      });
    }

  
    function addTask(event) {
      event.preventDefault();
      const title = titleInput.value.trim();
      const description = descriptionInput.value.trim();
  
      if (title === '' || description === '') {
        alert('Please enter both title and description for the task');
        return;
      }
  
      const newTask = {
        title: title,
        description: description,
        completed: false
      };
   tasks.push(newTask);
      saveTasks();
      displayTasks();
  
      titleInput.value = '';
      descriptionInput.value = '';
    }

  
    window.completeTask = function(index) {
      tasks[index].completed = true;
      saveTasks();
      displayTasks();
    }

  
    window.deleteTask = function(index) {
      tasks.splice(index, 1);
      saveTasks();
      displayTasks();
    }
    
  
    form.addEventListener('submit', addTask);
  
    displayTasks();
  });



