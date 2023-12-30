// src/preload.js
 
// const { contextBridge, ipcRenderer } from 'electron'
const  { contextBridge, ipcRenderer }  = require('electron')
window.ipcRenderer = ipcRenderer
// Expose ipcRenderer to the client
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (instruct) => {
    ipcRenderer.send(instruct)//转发
  }
})
 
