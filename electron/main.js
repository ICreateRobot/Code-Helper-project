// main.js

// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow,dialog,ipcMain,Menu  } = require('electron')
const path = require('path');
const fs = require('fs');

// const NODE_ENV = 'production' //生产环境
// const NODE_ENV = 'development' //开发环境
const NODE_ENV = process.env.NODE_ENV  //通过配置文件

function createWindow () {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
        enableRemoteModule: true,
        preload: path.join(__dirname, 'preload.js'),
    }
  })

  // 创建自定义的菜单模板
  const windowMenuData = [
    // { label: '文件', submenu: [{ role: '导入' }] },
    // { label: '模式', submenu: [{ role: 'Arduino' }, { role: 'Python' }] },
    // { label: '视图', submenu: [{ role: 'togglefullscreen' }]}
  ]
  // 将菜单模板转换为菜单对象
  const windowMenu = Menu.buildFromTemplate(windowMenuData)
  // 设置应用程序菜单
  Menu.setApplicationMenu(windowMenu)


  // 加载 index.html
  // mainWindow.loadFile('dist/index.html') // 此处跟electron官网路径不同，需要注意
  // mainWindow.loadURL('http://127.0.0.1:5173/') 
  mainWindow.loadURL(
    NODE_ENV === 'development'
    ? 'http://localhost:5173'
    :`file://${path.join(__dirname, '../dist/index.html')}`
  );
  

  // 打开开发工具
  mainWindow.webContents.openDevTools()

  ipcMain.on('close',e=>{
    openFileDialog();
  });


  //配置文件错误
  ipcMain.on('deployFileErr',e=>{
    dialog.showMessageBox({ type: 'warning',title: '提示', message: '配置文件错误，请重新导入或初始化' })
  });
  //初始化配置文件
  ipcMain.on('initDeployFile',e=>{
    initDeployFile(mainWindow);
  });

  //导入配置文件
  ipcMain.on('importDeployFile',e=>{
    importDeployFile(mainWindow);
  });

  //导入网络配置文件
  ipcMain.on('importWebDeployFile',e=>{
    openFileDialog();
  });



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



function openFileDialog() {
  const options = {
      title: '选择文件', // 设置对话框标题
      defaultPath: '/path/to/default/directory' // 默认路径（可选）
  }
  dialog.showOpenDialog(options).then((result) => {
      if (!result.canceled && result.filePaths[0]) {
        // let fileUrl =result.filePaths[0];//资源管理器打开的文件
        // http://127.0.0.1:5173/assets/config_test.xml
        let fileUrl =`${path.join(__dirname, '../dist/config_test.xml')}`;//配置文件位置
          console.log("已选择文件：", fileUrl);
          
          // 这里可以处理选定的文件或者其他操作

          try {
            const data = fs.readFileSync(fileUrl);
            
            // 打印文件内容
            console.log(data.toString());
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

//初始化配置文件
function initDeployFile(mainWindow) {
  let initFileUrl=`${path.join(__dirname, '../dist/config_test_init.xml')}`;//初始化文件地址
  let deployFileUrl=`${path.join(__dirname, '../dist/config_test.xml')}`;//配置文件地址
  try {    
    const initData = fs.readFileSync(initFileUrl);//初始化数据

    const deployFileState = fs.createWriteStream(deployFileUrl);//创建写入流
    deployFileState.write(initData);//写入数据
    deployFileState.end();//写入完成标记
    //标记写入完成    监听写入完成情况前必须标记写入完成
    deployFileState.on('finish', () => {
      dialog.showMessageBox({
            type: 'info',
            title: '提示',
            defaultId: 0,
            message:"初始化完成",
            buttons:['确定']
        }).then(result=>{
          let response = result.response;//取消为0.确定为1
          if(response){
            // console.log("初始化完成")
          }else{
            console.log("初始化完成")
            mainWindow.webContents.reload();//刷新页面
          }
        }).catch(err=>{
            console.log(err);
        });
    })
  } catch (err) {
      console.error(`无法读取文件：${err}`);
  }  
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
      // http://127.0.0.1:5173/assets/config_test.xml
      let fileUrl =`${path.join(__dirname, '../public/config_test.xml')}`;//配置文件位置
      
      
      try {
        const fileData = fs.readFileSync(newFileUrl);//获取用户文件数据
        const deployFileState = fs.createWriteStream(fileUrl);//创建写入流
        deployFileState.write(fileData);//写入数据
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