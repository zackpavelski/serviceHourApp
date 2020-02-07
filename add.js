'use strict'

const { ipcRenderer } = require('electron')

document.getElementById('todoForm').addEventListener('submit', (evt) => {
  // prevent default refresh functionality of forms
  evt.preventDefault()

  // input on the form
  const input = evt.target[0]+evt.target[1]+evt.target[2]+evt.target[3];

  string final = document.getElementById("name").value + "-"
    + document.getElementById("age").value
    + document.getElementById("grade").value
    + document.getElementById("hours").value
    + document.getElementById("awards").value;


  // send todo to main process
  ipcRenderer.send('add-todo', input.value)

  // reset input
  input.value = ''

})
