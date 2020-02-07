//login.js
'use strict'
//browserWindow.setMenu(null);
const { ipcRenderer } = require('electron')
const remote = require('electron').remote;

document.getElementById('submit').addEventListener('click', () => {
        ipcRenderer.send('add-main-window')

})
document.getElementById('newUserButton').addEventListener('click', () => {
  ipcRenderer.send('add-newUser-window')
})
///add-viewStudents-window
