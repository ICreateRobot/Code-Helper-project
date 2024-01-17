// main.js

// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow,dialog,ipcMain,shell  } = require('electron')
const path = require('path');
const fs = require('fs');
const data_processing = require('./data_processing');

// const NODE_ENV = 'production' //生产环境
// const NODE_ENV = 'development' //开发环境
const NODE_ENV = process.env.NODE_ENV  //通过配置文件

function createWindow () {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 450,
    height: 850,
    resizable:false,//禁止改变窗口大小
    frame: false,
    webPreferences: {
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
        enableRemoteModule: true,
        preload: path.join(__dirname, 'preload.js'),
    }
  })

  
  // 加载 index.html
  // mainWindow.loadFile('dist/index.html') // 此处跟electron官网路径不同，需要注意
  // mainWindow.loadURL('http://127.0.0.1:5173/') 
  mainWindow.loadURL(
    NODE_ENV === 'development'
    ? 'http://localhost:5173'
    :`file://${path.join(__dirname, '../dist/index.html')}`
  );
  // app.setAppUserModelId("明治") //在主进程的app这里修改
  app.setName("名字");
  // 打开开发工具
  mainWindow.webContents.openDevTools()

  ipcMain.on('close',e=>{
    app.quit();
  });


  //配置文件错误
  ipcMain.on('deployFileErr',e=>{
    dialog.showMessageBox({ type: 'warning',title: '提示', message: '配置文件错误，请重新导入或初始化' })
  });

  //导入配置文件
  ipcMain.on('importDeployFile',e=>{
    importDeployFile(mainWindow);
  });

  //导入网络配置文件
  ipcMain.on('importWebDeployFile',e=>{
    openFileDialog();
  });
  // 打开产品官网
  ipcMain.on('openNewWindows',e=>{
    getNewwindows();
  })
  //保存模板到本地
  ipcMain.on('saveModuleFile',e=>{
    saveModuleFile();
  })
   //替换配置文件
  ipcMain.on('replaceModeConfigFile',(e,fileName)=>{
    replaceModeConfigFile(fileName,mainWindow);
  })
  //设置默认模式
  ipcMain.on('setDefaultModel',(e,mode)=>{
    // console.log("mode:",mode)
    setDefaultModel(mode,mainWindow)
  })
  //设置语言和风格
  ipcMain.on('setLanguageAndStyle',(e,data)=>{
    setLanguageAndStyle(data,mainWindow)
  })

  //获取版本号
  ipcMain.handle('getAppVersion', getAppVersion);
  //获取模式
  ipcMain.handle('getModes', getModes);
  



}


// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


//网络文件
function openFileDialog() {
 
}

//导入配置文件
function importDeployFile(mainWindow) {
  const options = {
    title: '导入文件', // 设置对话框标题
    defaultPath: '/path/to/default/directory' // 默认路径（可选）
  }

  dialog.showOpenDialog(options).then((result) => {
    if (!result.canceled && result.filePaths[0]) {
      let newFileUrl =result.filePaths[0];//资源管理器打开的文件
      let fileName = newFileUrl.split("\\").pop().split('.')[0];//导入文件名
      // http://127.0.0.1:5173/assets/config_test.xml
      let fileUrl =`${path.join(__dirname, '../dist/config/'+fileName+'.json')}`;//配置文件位置      
      try {
        const fileData = fs.readFileSync(newFileUrl);//获取用户文件数据
        const deployFileState = fs.createWriteStream(fileUrl);//创建写入流
        deployFileState.write(data_processing.dataAnalysis(fileData));//写入数据
        deployFileState.end();//写入完成标记

        //标记写入完成    监听写入完成情况前必须标记写入完成
        deployFileState.on('finish', () => {
          dialog.showMessageBox({
            type: 'info',
            title: '提示',
            defaultId: 0,
            message: "导入完成",
            buttons: ['确定']
          }).then(result => {
            let response = result.response;//取消为0.确定为1
            if (response) {
              // console.log("初始化完成")
            } else {
              mainWindow.webContents.reload();//刷新页面
            }
          }).catch(err => {
            console.log(err);
          });
        })
      } catch (err) {
        console.error(`无法读取文件：${err}`);
      }
    } else {
        console.log("取消了选择");
    }
  }).catch((err) => {
      console.error("发生错误：", err);
  });

}

// 获取文件名和软件版本
function getAppVersion(){
  let versions = new Array();
  let url  = `${path.join(__dirname, '../package.json')}`
  try { 
    files = fs.readFileSync(url,"utf8");
    const jsonData = JSON.parse(files);
    versions.push(jsonData.version);
    versions.push(jsonData.name);
    // console.log("版本号",versions)

    
  } catch (error) {
    console.log("报错：",error)
  }
  if(versions.length>0)
    return versions;
  else
    return -1;  
}

//打开外部网站
function getNewwindows(){
  shell.openExternal("https://www.icrobot.com/www/cn/index.html#/index")
}

// 保存模板
function saveModuleFile(){
  let configFileUrl  = `${path.join(__dirname, '../dist/configModule.xml')}`
  dialog.showSaveDialog({ 
    filters: [
      { name: 'Config Files', extensions: ['xml'] }, // 可选择的文本文件格式
      { name: 'All Files', extensions: ['*'] } // 所有文件格式
    ],
    title: '保存模板',
    defaultPath: '~/configModuleFile' 
  }).then(result => {
      // result.filePath 为用户选择的文件保存路径
      let saveFileUrl = result.filePath;
      // console.log("用户选择的文件保存路径：", saveFileUrl)
      const fileData = fs.readFileSync(configFileUrl);//获取配置文件数据
      const deployFileState = fs.createWriteStream(saveFileUrl);//创建写入流
      deployFileState.write(fileData);//写入数据
      deployFileState.end();//写入完成标记

      deployFileState.on('finish', () => {
        dialog.showMessageBox({
          type: 'info',
          title: '提示',
          defaultId: 0,
          message: "文件已保存",
          buttons: ['确定']
        }).then(result => {
          console.log("文件已保存");
        }).catch(err => {
          console.log(err);
        });
      })

  }).catch(err => {
      console.error("发生错误：", err)
  })
}

//获取所有配置文件
function getModes(){
  let files = null
  try { 
      files = fs.readdirSync('./dist/config');
      // fileName.substring(0, fileName.lastIndexOf('.')) ; // 返回不包含扩展名的文件名
      // console.log("目录下的所有文件名称：");
      for (let fileIndex in files) {
          files[fileIndex] = files[fileIndex].substring(0,files[fileIndex].lastIndexOf('.'))
      }
  } catch (error) {
    
  }
  return files;
}
//替换文件
function replaceModeConfigFile(fileName, mainWindow) {
  let oldConfigfileUrl = `${path.join(__dirname, '../dist/config/' + fileName + '.json')}`;//配置文件位置
  const options = {
    title: '导入文件', // 设置对话框标题
    defaultPath: '/path/to/default/directory' // 默认路径（可选）
  }
  dialog.showOpenDialog(options).then((result) => {
    if (!result.canceled && result.filePaths[0]) {
      let newFileUrl = result.filePaths[0];//资源管理器打开的文件
      let fileName = newFileUrl.split("\\").pop().split('.')[0];//导入文件名
      // http://127.0.0.1:5173/assets/config_test.xml
      let fileUrl = `${path.join(__dirname, '../dist/config/' + fileName + '.json')}`;//配置文件位置      
      try {
        fs.unlink(oldConfigfileUrl, err => {
          if (err == null) {
            console.log("删除成功");
            // importDeployFile(mainWindow);
            const fileData = fs.readFileSync(newFileUrl);//获取用户文件数据
            const deployFileState = fs.createWriteStream(fileUrl);//创建写入流
            deployFileState.write(data_processing.dataAnalysis(fileData));//写入数据
            deployFileState.end();//写入完成标记
            //标记写入完成    监听写入完成情况前必须标记写入完成
            deployFileState.on('finish', () => {
              dialog.showMessageBox({
                type: 'info',
                title: '提示',
                defaultId: 0,
                message: "导入完成",
                buttons: ['确定']
              }).then(result => {
                let response = result.response;//取消为0.确定为1
                if (response) {
                  // console.log("初始化完成")
                } else {
                  mainWindow.webContents.reload();//刷新页面
                }
              }).catch(err => {
                console.log(err);
              });
            })

          } else {
            console.log("删除失败")
            dialog.showMessageBox({
              type: 'error',
              title: '错误',
              defaultId: 0,
              message: "无法替换文件",
              buttons: ['确定']
            }).then(result => {
              console.log("报错弹窗");
            }).catch(err => {
              console.log(err);
            });
          }
        });
      } catch (err) {
        console.error(`无法读取文件：${err}`);
      }
    } else {
      console.log("取消了选择");
    }
  }).catch((err) => {
    console.error("发生错误：", err);
  });
}
//设置默认模式
function setDefaultModel(mode,mainWindow){
  let url  = `${path.join(__dirname, '../public/configData.json')}`
  try { 
    files = fs.readFileSync(url,"utf8");
    let jsonData = JSON.parse(files);
    jsonData.mode = mode;
    jsonData.modificationTime = getTodayTime();
    let json_dataString = JSON.stringify(jsonData);//将对象转换为字符串
    
    fs.writeFile(url,json_dataString, err => {
      //如果写入失败，则回调函数调用时，会传入错误对象，如写入成功，会传入 null
      if(err == null){
        mainWindow.webContents.reload();//刷新页面
      }else{
        console.log(err);
      }
    });
  } catch (error) {
    console.log("报错：",error)
  }
}


//设置语言和风格
function setLanguageAndStyle(data,mainWindow){
  let url  = `${path.join(__dirname, '../public/configData.json')}`
  let language = '';//语言
  let style = "";//风格
  if(data[0] == 'Chinese'){
    language ='中文';
  }else{
    language ='英文';
  }

  if(data[1] == "style1"){
    style = '酷黑';
  }else if(data[1] == "style2"){
    style = '清新';
  }else{
    style = '欢快';
  }
  try { 
    files = fs.readFileSync(url,"utf8");
    jsonData = JSON.parse(files);
    jsonData.language = language;
    jsonData.style = style;
    jsonData.modificationTime = getTodayTime();
    let json_dataString = JSON.stringify(jsonData);//将对象转换为字符串
    
    fs.writeFile(url,json_dataString, err => {
      //如果写入失败，则回调函数调用时，会传入错误对象，如写入成功，会传入 null
      if(err == null){
        mainWindow.webContents.reload();//刷新页面
      }else{
        console.log(err);
      }
    });
  } catch (error) {
    console.log("报错：",error)
  }
}


//获取当前时间
function getTodayTime() {
  var day = new Date();
  let seconds = day.getSeconds();
  if (seconds < 10) { // 如果月份值小于10，则在前面加上0
    seconds = "0" + seconds;
  } else {
    seconds = seconds;
  }
  let minutes = day.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  } else {
    minutes = minutes;
  }
  let month = day.getMonth()
  if (month < 10) {
  month = "0" + month;
  }
  let time = day.getFullYear() + "年" + (day.getMonth() + 1) + "月" + day.getDate() + "日 " + day.getHours() + ":" + minutes + ":"     + seconds;
  return time
}