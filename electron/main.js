// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron')
const path = require('path');
const fs = require('fs');
const writeFile = require('fs/promises');
const data_processing = require('./data_processing');
const http = require('http');

// const NODE_ENV = 'production' //生产环境
// const NODE_ENV = 'development' //开发环境
const NODE_ENV = process.env.NODE_ENV  //通过配置文件
console.log("当前环境1：",process.platform);
function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 450,
    height: 800,
    minWidth:450,
    minHeight:290,
    resizable: true,//禁止改变窗口大小
    frame: false,
    //icon: path.join(__dirname, '../dist/img/code2.ico'),//window
    //icon: path.join(__dirname, '../dist/img/icon.icns'),
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })
/*
  console.log("路径：",path.join(__dirname, '../dist/img/icon.icns'));
  if(process.platform ==='darwin'){
    app.dock.setIcon(path.join(__dirname,'../dist/img/icon.icns'));
  }
*/
  // 加载 index.html
  // mainWindow.loadFile('dist/index.html') // 此处跟electron官网路径不同，需要注意
  // mainWindow.loadURL('http://127.0.0.1:5173/') 

  mainWindow.loadURL(
    NODE_ENV === 'development'
      ? 'http://localhost:5173'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );
  // app.setAppUserModelId("明治") //在主进程的app这里修改
  //app.setName("名字");
  // 打开开发工具
   //mainWindow.webContents.openDevTools()

  
  // 设置初始显示模式
  set_display_mode(mainWindow);

  ipcMain.on('close', e => {
    app.quit();
  });


  //配置文件错误
  ipcMain.on('deployFileErr', e => {
    dialog.showMessageBox({ type: 'warning', title: '提示', message: '配置文件错误，请重新导入或初始化' })
  });

  //导入配置文件
  ipcMain.on('importDeployFile', e => {
    importDeployFile(mainWindow);
  });

  //导入网络配置文件
  ipcMain.on('importWebDeployFile', e => {
    openFileDialog();
  });
  // 打开产品官网
  ipcMain.on('openNewWindows', e => {
    getNewwindows();
  })
  //保存模板到本地
  ipcMain.on('saveModuleFile', e => {
    saveModuleFile();
  })
  //替换配置文件
  ipcMain.on('replaceModeConfigFile', (e, fileName) => {
    replaceModeConfigFile(fileName, mainWindow);
  })
  //设置默认模式
  ipcMain.on('setDefaultModel', (e, mode) => {
    // console.log("mode:",mode)
    setDefaultModel(mode, mainWindow)
  })
  //设置语言和风格
  ipcMain.on('setLanguageAndStyle', (e, data) => {
    setLanguageAndStyle(data, mainWindow)
  })
  //设置是否可复制
  ipcMain.on('setReproducibility', (e, data) => {
    setReproducibility(data, mainWindow)
  })
  //无互联网连接
  ipcMain.on('noInternetLink', (e) => {
    noInternetLink();
  })
  //网络连接-请求版本
  ipcMain.on('internetLink', (e, version) => {
    internetLink(version);
  })
  //窗口最小化
  ipcMain.on('windowsMini', (e) => {
    mainWindow.minimize();//最小化窗口
  })

  //窗口最小化
  ipcMain.on('windowsMax', (e) => {
    if(mainWindow.isMaximized()){
      mainWindow.restore();//恢复窗口大小
    }else{
      mainWindow.maximize();//最大化窗口
    }
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
  createWindow();
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
      let newFileUrl = result.filePaths[0];//资源管理器打开的文件
      let fileName = newFileUrl.split("\\").pop().split('.')[0];//导入文件名
      // http://127.0.0.1:5173/assets/config_test.xml
      let fileUrl = `${path.join(__dirname, '../dist/config/' + fileName + '.json')}`;//配置文件位置    
      
      let newFileUrlArrs = newFileUrl.split('.')
      if(newFileUrlArrs[newFileUrlArrs.length - 1] != 'xml'){
         // 数据导入失败
         dialog.showMessageBox({
          type: 'info',
          title: '提示',
          defaultId: 0,
          message: "导入失败，文件扩展名应为“xml”格式",
          buttons: ['确定']
        }).then(result => {
        }).catch(err => {console.log(err);});
        return;
      }
      try {
        const fileData = fs.readFileSync(newFileUrl);//获取用户文件数据
        let importData =data_processing.dataAnalysis(fileData);//初始化数据
        if(importData != false){

          const deployFileState = fs.createWriteStream(fileUrl);//创建写入流
          deployFileState.write(importData);//写入数据
          deployFileState.end();//写入完成标记
          //标记写入完成    监听写入完成情况前必须标记写入完成
          deployFileState.on('finish', () => {
            dialog.showMessageBox({
              type: 'info',
              title: '提示',
              defaultId: 0,
              message: "导入成功",
              buttons: ['确定']
            }).then(result => {
              let response = result.response;//取消为0.确定为1
              if (response) {
                // console.log("初始化完成")
              } else {
                setDefaultModel(fileName,mainWindow);//设置默认模式
                mainWindow.webContents.reload();//刷新页面
              }
            }).catch(err => {
              console.log(err);
            });
          })

        }else{
          // 数据导入失败
          dialog.showMessageBox({
            type: 'info',
            title: '提示',
            defaultId: 0,
            message: "导入失败，导入格式不正确",
            buttons: ['确定']
          }).then(result => {
            let response = result.response;//取消为0.确定为1
            if (response) {
              // console.log("初始化完成")
            } else {
              // mainWindow.webContents.reload();//刷新页面
            }
          }).catch(err => {
            console.log(err);
          });
          
        }
        
      } catch (err) {
        console.error(`无法读取文件：${err}`);
         // 数据导入失败
         dialog.showMessageBox({
          type: 'info',
          title: '提示',
          defaultId: 0,
          message: "导入失败:"+err,
          buttons: ['确定']
        }).then(result => {
          let response = result.response;//取消为0.确定为1
          if (response) {
            // console.log("初始化完成")
          } else {
            // mainWindow.webContents.reload();//刷新页面
          }
        }).catch(err => {
          console.log(err);
        });
      }
    } else {
      console.log("取消了选择");
    }
  }).catch((err) => {
    console.error("发生错误：", err);
  });


}

// 获取文件名和软件版本
function getAppVersion() {
  let versions = new Array();
  let url = `${path.join(__dirname, '../package.json')}`
  try {
    files = fs.readFileSync(url, "utf8");
    const jsonData = JSON.parse(files);
    versions.push(jsonData.version);
    versions.push(jsonData.productName);
    // console.log("版本号",versions)


  } catch (error) {
    console.log("报错：", error)
  }
  if (versions.length > 0)
    return versions;
  else
    return -1;
}

//打开外部网站
function getNewwindows() {
  console.log("open web");
  shell.openExternal("https://www.icrobot.com/www/cn/index.html#/index").then(()=>{
    console.log("open-yes")
  }).catch(()=>{
    console.log("open-no")
  });
}

// 保存模板
function saveModuleFile() {
  let configFileUrl = `${path.join(__dirname, '../dist/configModule.xlsm')}`
  console.log("用户选择的文件保存路径1：", configFileUrl)
  dialog.showSaveDialog({
    filters: [
      { name: 'Config Files', extensions: ['xlsm'] }, // 可选择的文本文件格式
      { name: 'All Files', extensions: ['*'] } // 所有文件格式
    ],
    title: '保存模板',
    defaultPath: '~/configModuleFile'
  }).then(result => {
    console.log("path", result)
    if (!result.canceled) {
      // result.filePath 为用户选择的文件保存路径
      let saveFileUrl = result.filePath;
      
      console.log("用户选择的文件保存路径2：", saveFileUrl)
      const fileData = fs.readFileSync(configFileUrl);//获取配置文件数据
      console.log("data:", fileData)
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
    } else {
      console.log("取消了保存")
    }


  }).catch(err => {
    console.error("发生错误：", err)
  })
}

//获取所有配置文件
function getModes() {
  console.log("getModes-log1")
  let configfilesUrl = `${path.join(__dirname, '../dist/config')}`;//配置文件夹位置
  let files = null
  try {
    files = fs.readdirSync(configfilesUrl);
    // fileName.substring(0, fileName.lastIndexOf('.')) ; // 返回不包含扩展名的文件名
    console.log("目录下的所有文件名称：");
    for (let fileIndex in files) {
      console.log(files[fileIndex].substring(0, files[fileIndex].lastIndexOf('.')));
      files[fileIndex] = files[fileIndex].substring(0, files[fileIndex].lastIndexOf('.'))
    }
  } catch (error) {
    console.log("err:", error)
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
      let newFileUrlArrs = newFileUrl.split('.')
      if(newFileUrlArrs[newFileUrlArrs.length - 1] != 'xml'){
         // 数据导入失败
         dialog.showMessageBox({
          type: 'info',
          title: '提示',
          defaultId: 0,
          message: "导入失败，文件扩展名应为“xml”格式",
          buttons: ['确定']
        }).then(result => {
        }).catch(err => {console.log(err);});
        return;
      }
      // http://127.0.0.1:5173/assets/config_test.xml
      let fileUrl = `${path.join(__dirname, '../dist/config/' + fileName + '.json')}`;//配置文件位置   
      let fileData;//获取用户文件数据
      let importData;//导入的数据
      let isLose = false;//是否失败
      try {
        fileData = fs.readFileSync(newFileUrl);//获取用户文件数据
        importData = data_processing.dataAnalysis(fileData)
      } catch (error) {
        isLose = true;
      }
      if(isLose){
        // 数据导入失败
        dialog.showMessageBox({
          type: 'info',
          title: '提示',
          defaultId: 0,
          message: "导入失败，文件格式不正确",
          buttons: ['确定']
        }).then(result => {
          let response = result.response;//取消为0.确定为1
          if (response) {
            // console.log("初始化完成")
          } else {
            // mainWindow.webContents.reload();//刷新页面
          }
        }).catch(err => {
          console.log(err);
        });
        
      }else{
        try {
          fs.unlink(oldConfigfileUrl, err => {
            if (err == null) {
              console.log("删除成功");
              // importDeployFile(mainWindow);
              const deployFileState = fs.createWriteStream(fileUrl);//创建写入流
              deployFileState.write(importData);//写入数据
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
                    setDefaultModel(fileName,mainWindow);//设置默认模式
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
          // 数据导入失败
          dialog.showMessageBox({
            type: 'info',
            title: '提示',
            defaultId: 0,
            message: "导入失败:"+err,
            buttons: ['确定']
          }).then(result => {
            let response = result.response;//取消为0.确定为1
            if (response) {
              // console.log("初始化完成")
            } else {
              // mainWindow.webContents.reload();//刷新页面
            }
          }).catch(err => {
            console.log(err);
          });
        }
      }
    } else {
      console.log("取消了选择");
    }
  }).catch((err) => {
    console.error("发生错误：", err);
  });
  
}
//设置默认模式
function setDefaultModel(mode, mainWindow) {
  let url = `${path.join(__dirname, '../dist/configData.json')}`
  try {
    files = fs.readFileSync(url, "utf8");
    let jsonData = JSON.parse(files);
    jsonData.mode = mode;
    jsonData.modificationTime = getTodayTime();
    let json_dataString = JSON.stringify(jsonData);//将对象转换为字符串

    fs.writeFile(url, json_dataString, err => {
      //如果写入失败，则回调函数调用时，会传入错误对象，如写入成功，会传入 null
      if (err == null) {
        mainWindow.webContents.reload();//刷新页面
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log("报错：", error)
  }
}

// 无互联网连接
function noInternetLink() {
  dialog.showMessageBox({
    type: 'info',
    title: '提示',
    defaultId: 0,
    message: "无互联网连接",
    buttons: ['确定']
  }).then(result => {
    console.log("无互联网连接弹窗");
  }).catch(err => {
    console.log(err);
  });
}



// 互联网连接-请求版本
function internetLink(versions) {
  // 要发送的数据对象
  // console.log("sss",versions);
  // return ;
  const sendData = { appName: "'CodeHelper'", AppVersion: "'" + versions.version + "'" };
  const url = 'http://119.3.123.115:8080/appVersionManage/getAppState'; // 修改为目标API的URL

  // 将参数转换成查询字符串格式
  let queryString = '';
  for (const [key, value] of Object.entries(sendData)) {
    if (queryString !== '') {
      queryString += '&';
    }
    queryString += `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }

  // 构建完整的URL（包括查询字符串）
  const fullUrl = `${url}?${queryString}`;
  // 创建HTTP请求选项
  const options = {
    method: 'POST', // 可以根据需要设置其他HTTP方法，比如POST、PUT等
  };

  // 发起HTTP请求
  const req = http.request(fullUrl, options, res => {
    let data = '';

    // 接收服务器返回的数据流
    res.on('data', chunk => {
      data += chunk;
    });

    // 当数据接收完全后进行处理
    res.on('end', () => {
      let receiveData = JSON.parse(data);
      if (receiveData.code == 200) {
        // 请求成功
        if (!receiveData.data.appState) {
          dialog.showMessageBox({
            type: 'info',
            title: '提示',
            defaultId: 0,
            message: "当前版本不可用，请下载最新版本 ",
            buttons: ['确定']
          }).then(result => {
            shell.openExternal("https://www.icrobot.com/www/cn/index.html#/file/index?type1=%E8%BD%AF%E4%BB%B6%E8%B5%84%E6%96%99")
            app.exit();
          }).catch(err => {
            console.log(err);
          });
        } else {
          // 当前版本->最新版本：
          //0.0.1->1.0.0:-1,当前版本低
          //1.0.1->1.0.0:1，当前版本高
          //1.0.0->1.0.0:0，当前版本一致
          let state = compareVersions(receiveData.data.appVersion, receiveData.data.newAppVersion);
          if (state == 0) {
            //当前是最新版本
            if(!versions.isOpen){
              return ;
            }
            dialog.showMessageBox({
              type: 'info',
              title: '提示',
              defaultId: 0,
              message: "当前是最新版本 ",
              buttons: ['确定']
            }).then(result => {
              console.log("最新版本");
            }).catch(err => {
              console.log(err);
            });

          } else if (state == -1) {
            //当前有更新版本
            dialog.showMessageBox({
              type: 'info',
              title: '提示',
              defaultId: 0,
              message: "当前软件有更新：" + receiveData.data.newAppVersion,
              buttons: ['确定']
            }).then(result => {
              shell.openExternal("https://www.icrobot.com/www/cn/index.html#/file/index?type1=%E8%BD%AF%E4%BB%B6%E8%B5%84%E6%96%99")
            }).catch(err => {
              console.log(err);
            });

          } else {
            //当前版本比更新版本高
            dialog.showMessageBox({
              type: 'info',
              title: '提示',
              defaultId: 0,
              message: "当前软件最新版本为：#" + receiveData.data.appVersion + "#\n请联系管理员进行更新",
              buttons: ['确定']
            }).then(result => {
              app.exit();
            }).catch(err => {
              console.log(err);
            });
          }
        }
      } else {
        // 请求失败
        dialog.showMessageBox({
          type: 'info',
          title: '提示',
          defaultId: 0,
          message: "检查更新失败：#" + receiveData.msg + "#\n请联系管理员",
          buttons: ['确定']
        }).then(result => {
          // app.exit();
        }).catch(err => {
          console.log(err);
        });
      }
      console.log(`Response from ${req.method}:`, JSON.parse(data));
    });
  });

  req.on('error', (err) => {
    console.error(`Request error: ${err}`);
  });

  // 结束请求
  req.end();
}


function compareVersions(version1, version2) {
  let v1 = version1.split(".");
  let v2 = version2.split(".");

  for (let i = 0; i < v1.length; i++) {
    if (parseInt(v1[i]) > parseInt(v2[i])) return 1;
    if (parseInt(v1[i]) < parseInt(v2[i])) return -1;
  }

  if (v1.length < v2.length) return -1;
  if (v1.length > v2.length) return 1;

  return 0;
}

//设置语言和风格
function setLanguageAndStyle(data, mainWindow) {

  let url = `${path.join(__dirname, '../dist/configData.json')}`
  let language = '';//语言
  let style = "";//风格
  if (data[0] == 'Chinese') {
    language = '中文';
  } else {
    language = '英文';
  }
  style = data[1];
  // if(data[1] == "style1"){
  //   style = '酷黑';
  // }else if(data[1] == "style2"){
  //   style = '清新';
  // }else{
  //   style = '欢快';
  // }
  try {
    files = fs.readFileSync(url, "utf8");
    jsonData = JSON.parse(files);
    jsonData.language = language;
    jsonData.style = style;
    jsonData.modificationTime = getTodayTime();
    let json_dataString = JSON.stringify(jsonData);//将对象转换为字符串

    fs.writeFile(url, json_dataString, err => {
      //如果写入失败，则回调函数调用时，会传入错误对象，如写入成功，会传入 null
      if (err == null) {
        mainWindow.webContents.reload();//刷新页面
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log("报错：", error)
  }
}

//设置代码是否可复制
function setReproducibility(data, mainWindow) {
  console.log("点击data：",data);
  let url = `${path.join(__dirname, '../dist/configData.json')}`
  let reproducibility = data;
  console.log(reproducibility);
  try {
    let files = fs.readFileSync(url, "utf8");
    jsonData = JSON.parse(files);
    jsonData.reproducibleOrNot = reproducibility;
    jsonData.modificationTime = getTodayTime();
    let json_dataString = JSON.stringify(jsonData);//将对象转换为字符串

    fs.writeFile(url, json_dataString, err => {
      //如果写入失败，则回调函数调用时，会传入错误对象，如写入成功，会传入 null
      if (err == null) {
        mainWindow.webContents.reload();//刷新页面
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log("报错：", error)
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
  let time = day.getFullYear() + "年" + (day.getMonth() + 1) + "月" + day.getDate() + "日 " + day.getHours() + ":" + minutes + ":" + seconds;
  return time
}

//设置初始模式
function set_display_mode(mainWindow){
  console.log("infunction");
  let modeName = readConfigModeName();
  let configs = getModes();
  console.log('modeName',modeName);
  console.log('configs',configs);
  for(let name in configs){
    console.log('['+modeName+'-'+configs[name]+':'+configs[name] == modeName+']');
    if(configs[name] == modeName){
      return;
    }
  }
  setDefaultModel(configs[0],mainWindow);
}
function readConfigModeName(){
  let configName;
  let url = `${path.join(__dirname, '../dist/configData.json')}`
  try {
    files = fs.readFileSync(url, "utf8");
    const jsonData = JSON.parse(files);
    configName = jsonData.mode;
  } catch (error) {
    console.log("报错：", error)
  }
  return configName;
}
