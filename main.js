'use strict'

const path = require('path')
const fs = require('fs').promises
const electron = require('electron')
const { app, ipcMain } = require('electron')

const Window = require('./Window')
const DataStore = require('./DataStore')
require('electron-reload')(__dirname)
const BrowserWindow = electron.BrowserWindow
// create a new todo store name "Todos Main"
const todosData = new DataStore({ name: 'Todos Main' })
function main () {

  // todo list window
  let mainWindow = new Window({
    //startup login.html
    file: path.join('renderer', 'login.html'),
    resizable:false
  })
  mainWindow.setMenu(null);
  // add todo window
  let addTodoWin

  let addTodoWin2
  // initialize with todos
  mainWindow.once('show', () => {
    mainWindow.webContents.send('todos', todosData.todos)
  })
  // create add todo window
  ipcMain.on('add-todo-window', () => {
    // if addTodoWin does not already exist
    addTodoWin = new Window({
      file: path.join('renderer', 'bugTest.html'),
      width: 500,
      height: 800,
      // close with the main window
      //parent: mainWindow,
      resizable:false
    })
    addTodoWin.setMenu(null);

  })
  ipcMain.on('add-viewStudents-window', () => {
    // if addTodoWin does not already exist
    addTodoWin2 = new Window({
      file: path.join('renderer', 'VS.html'),
      width: 500,
      height: 800,
      // close with the main window
      //parent: mainWindow,
      resizable:false
    })
    addTodoWin2.setMenu(null);

  })
  ipcMain.on('add-viewEvent-window', () => {
    addTodoWin = new Window({
      file: path.join('renderer', 'viewEvents.html'),
      width: 500,
      height: 800,
      resizable:false
    })
    addTodoWin.setMenu(null);

  })
  ipcMain.on('add-new-window', () =>{
    if(!addTodoWin){
      addTodoWin = new Window({
        file:path.join('renderer', 'bugTest.html'),
        width:500,
        height:800,
        resizable:false
      })
      addTodoWin.setMenu(null);

    }
  })
  ipcMain.on('add-newUser-window', () => {
    // if addTodoWin does not already exist
    if (!addTodoWin) {
      // create a new add todo window
      addTodoWin = new Window({
        //newUser.html
        file: path.join('renderer', 'newUser.html'),
        width: 500,
        height: 800,
        // close with the main window
        //parent: mainWindow,
        resiable:false
      })
      addTodoWin.setMenu(null);

    }
  })
  ipcMain.on('add-main-window', () => {
    // if addTodoWin does not already exist

      addTodoWin = new Window({
        file: path.join('renderer', 'index.html'),
        width: 500,
        height: 800,
        // close with the main window
        resiable:false
      })
      addTodoWin.setMenu(null);

    mainWindow.close()
  })
  ipcMain.on('add-event-window', () => {
    // if addTodoWin does not already exist
    addTodoWin = new Window({
      file: path.join('renderer', 'event.html'),
      width: 500,
      height: 800,
      // close with the main window
      //parent: mainWindow,
      resizable:false
    })
    addTodoWin.setMenu(null);

  })
  // delete-todo from todo list window
  ipcMain.on('delete-todo', (event, todo) => {
    const updatedTodos = todosData.deleteTodo(todo).todos
    mainWindow.send('todos', updatedTodos)
  })
}
app.on('ready', main)
app.on('window-all-closed', function () {
  app.quit()
})
