'use strict'

const { ipcRenderer } = require('electron')

// delete todo by its text value ( used below in event listener)
const deleteTodo = (e) => {
  ipcRenderer.send('delete-todo', e.target.textContent)
}
document.getElementById('viewAll').addEventListener('click', () => {
  ipcRenderer.send('add-viewStudents-window')

})
document.getElementById('createStudent').addEventListener('click', () => {
  ipcRenderer.send('add-todo-window')

})

document.getElementById('createEvent').addEventListener('click', () => {
  ipcRenderer.send('add-event-window')
})
document.getElementById('viewEvent').addEventListener('click', () => {
  ipcRenderer.send('add-viewEvent-window')
})


// on receive todos
ipcRenderer.on('todos', (event, todos) => {
  // get the todoList ul
  const todoList = document.getElementById('todoList')

  // create html string
  const todoItems = todos.reduce((html, todo) => {
    html += `<li class="todo-item">${todo}</li>`

    return html
  }, '')

  // set list html to the todo items
  todoList.innerHTML = todoItems

  // add click handlers to delete the clicked todo
  todoList.querySelectorAll('.todo-item').forEach(item => {
    item.addEventListener('click', deleteTodo)
  })
})
