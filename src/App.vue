

<template>
  <div class="topContent" :class="(configFileData.style == 'style1') ? 'backgroundColor1':(configFileData.style == 'style2'?'backgroundColor2':'backgroundColor3')">
     <!-- 顶部内容 -->
     <topContent :appName="appName" :languageData="language" :configFileData="configFileData"/>
  </div>
 
  <div class="mainContent">
     <!-- 主要内容 -->
     <div class="contentMenu" :class="(configFileData.style == 'style1') ? 'backgroundColor1':(configFileData.style == 'style2'?'backgroundColor2':'backgroundColor3')">
       <!-- 按键 -->
       <Menu @openImprotAlter="openImprotAlter" @openModuleAlter="openModuleAlter" @openSetAlter='openSetAlter' :languageData="language"/>
     </div>

     <!-- 弹窗遮罩 -->
     <div v-if="isAlter" class="alterShade" @click="colseAlters" :class="(configFileData.style == 'style1') ? 'alterShade1':(configFileData.style == 'style2'?'alterShade2':'alterShade3')"></div>
     <!-- 弹窗 -->
     <div v-if="isAlter" >
        <div v-if="alterName == 'import'">
          <importView @closeAlter="colseAlters" :languageData="language" :configFileData="configFileData"/>
        </div>
        <div v-if="alterName == 'selectModel'">
          <moduleView @closeAlter="colseAlters" @refreshView="refreshView" :languageData="language" :configFileData="configFileData"/>
        </div>
        <div v-if="alterName == 'setView'">
          <setView @closeAlter="colseAlters" :AppName="appName" :appVersion="version" :languageData="language" :configFileData="configFileData" @check_for_updates="check_for_updates"/>
        </div>
     </div>

     <div class="contentData" :class="(configFileData.style == 'style1') ? 'backgroundColor1':(configFileData.style == 'style2'?'backgroundColor2':'backgroundColor3')">
       <!-- 数据 -->
       <div class="constentBg">
        <Showdata />
       </div>
       
     </div>
  </div>
  <div class="bottomContent" :class="(configFileData.style == 'style1') ? 'backgroundColor1':(configFileData.style == 'style2'?'backgroundColor2':'backgroundColor3')">
   <!-- 版权 -->
    <span class="textSize" :class="(configFileData.style == 'style1') ? 'textColorStyle1':(configFileData.style == 'style2'?'textColorStyle2':'textColorStyle3')">
      © {{language.ui_text_copyright}}
    </span>
  </div>
 </template>
 <script>
 import topContent from './components/topTitle.vue'
 import Menu from './components/menu.vue'
 import Showdata from './components/showdata.vue'
 import importView from './components/alterView/importView.vue'
 import moduleView from './components/alterView/moduleView.vue'
 import setView from './components/alterView/setView.vue'
 import axios from 'axios';
 
 export default{

   
   components:{
     topContent,//顶部内容
     Menu,//菜单
     Showdata,//数据
     importView,//导入弹窗
     moduleView,//模式弹窗
     setView,//设置
   },  
   mounted() {
    this.readConfigData();
    this.getAppVersion();
    
    
   },    
     data(){
       return{
        context:"显示内容",
        isAlter:false,//是否打开弹窗
        alterName:'import',//弹窗名称
        version:'出错了',//版本号
        appName:"",//软件名称
        language:'',//语言包
        configFileData:'',//配置信息
       }
     },
     methods:{
       
      //  关闭弹窗
       colseAlters(){
        this.isAlter = false;
        this.alterName = '';
       },
      //  打开导入弹窗
      openImprotAlter(alterName){
        this.alterName = alterName;
        this.isAlter=true;
      },
      // 打开选择模式
      openModuleAlter(alterName){
        this.alterName = alterName;
        this.isAlter=true;
      },
      //打开设置页面
      openSetAlter(alterName){
        this.alterName = alterName;
        this.isAlter=true;
      },
      getAppVersion(){
          //获取版本号
          let getVersion =window.electronAPI.getFile();
          getVersion.then(data =>{
            console.log("返回：",data);
            this.version =data[0] ;
            this.appName = data[1]
            this.check_for_updates();
          }); 
      },
      readConfigData(){
        const filePath = './configData.json'; // 指定本地JSON文件路径
        // console.log("文件地址",filePath)
        axios.get(filePath)
            .then((response) => {
              let configData = response.data;
              console.log("配置信息",configData);
              if(configData.language == '中文'){
                this.readLanguage('Chinese');
              }else{
                this.readLanguage('English');
              }
              this.configFileData=configData;
            })
            .catch((error) => {
              console.log('Error reading local JSON file', error);
            });
      },
     
      readLanguage(language){
        const filePath = './language/'+language+'.json'; // 指定本地JSON文件路径
        // console.log("文件地址",filePath)
        axios.get(filePath)
            .then((response) => {
              let languageData = response.data;
              // console.log("语言信息：",languageData);
              this.language =languageData;
            })
            .catch((error) => {
              console.log('Error reading local JSON file', error);
            });
      },
      check_for_updates(){
        if (navigator.onLine) {
          
          // service.post('http://119.3.123.115:8080/appVersionManage/getAppState',{appName:"'测试软件'",AppVersion:"'1.0.0'"}) // 发起GET请求到"/api/users"路由
             //无互联网连接
          window.ipcRenderer.send('internetLink',{version:this.version,isOpen:false});
        } else {
          //无互联网连接
          window.ipcRenderer.send('noInternetLink');
        }
      },
      set_display_mode(){
        // this.configFileData
      },


       
     }
 }
 
 
 </script>
 <style >
 .topContent{
   /* 顶部内容 */
   width: 100%;
   height: 50px;
   /* background-color: rgb(2, 21, 15); */
   position: absolute ;
   top: 0px;
   left: 0px;
   
 }
 .textSize{
  font-size: 13px;
 }
 .mainContent{
   /* 主要内容 */
   width: 100%;
   height: 721px;
   background-color: blue;
   position: fixed;
   top: 50px;
   left: 0px;
 }
 .contentMenu{
   width: 100%;
   height: 45px;
   /* background-color: rgb(2, 21, 15); */
   /* background-color: aqua; */
 }
 .contentData{
   width: 100%;
   height: 676px;
   /* background-color: rgb(249, 249, 42); */
   /* padding: 10px; */
   /* 溢出滚动 */
   overflow: auto;
   position: relative;
   top: 0px;
 }
 
 
 .bottomContent{
   /* 底部内容 */
   width: 100%;
   height: 45px;
   line-height:45px;
   text-align: center;
   background-color: rgb(255, 10, 145);
   position: fixed;
   bottom: 0px;
   left: 0px;
 }
 
 /* 滚动条 */
 

 /* 滑块样式 */
 

 

 

 /* 文字不可选中 */
 .textNotCopy{
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}
/* 弹窗遮罩 */
.alterShade{
  width: 100%;
  height: 94%;
  /* background-color: rgba(255, 255, 255, 0.2); */
  position: absolute;
  top: 45px;
  z-index: 2;
}
.btSuspensionEvent{
  cursor:pointer;
}

/* 样式 */
  /* 字体颜色 */
    /* 酷黑 */
    .textColorStyle1{
      color: rgb(224,230,222);
    }
    /* 清新 */
    .textColorStyle2{
      color: rgb(224,230,222);
    }
    /* 欢快 */
    .textColorStyle3{
      color: rgb(0, 0, 0);
    }
  /* 背景颜色 */
    /* 酷黑 */
    .backgroundColor1{
      background-color: rgb(2, 21, 15);
    }
    /* 清新 */
    .backgroundColor2{
      background-color: rgb(1, 100, 105);
    }
    /* 欢快 */
    .backgroundColor3{
      background-color: rgb(23, 152, 219);
    }
  /* 数据页 */
    /* 酷黑 */
    .dataBackgroundColor1{
      background-color: rgb(15, 30, 26);
      border: 2px rgb(14, 58, 45) solid;
      overflow-y: auto;
    }
    /* 清新 */
    .dataBackgroundColor2{
      background-color: rgb(23, 160, 166);
    }
    /* 欢快 */
    .dataBackgroundColor3{
      background-color: rgb(100, 199, 253);
    }
  /* 圆点背景 */
    .backgroundColorO1{
      background-color: rgb(15, 30, 26);
    }
    .backgroundColorO2{
      background-color: rgb(23, 160, 166);
    }
    .backgroundColorO3{
      background-color: rgb(100, 199, 253);
    }
  /* 子模块名框背景 */
    .subModeBg1{
      background-color: rgb(15, 30, 26);
      border: 2px rgb(0, 110, 77) solid;
    }
    .subModeBg2{
      background-color: rgb(23, 160, 166);
      border: 2px rgb(0, 110, 77) solid;
    }
    .subModeBg3{
      background-color: rgb(100, 199, 253);
      border: 2px rgb(12, 116, 173) solid;
    }
  /* 子模块名框圆点背景 */
    .subModeDctBg1{
      background-color: rgb(0, 255, 195);
    }
    .subModeDctBg2{
      background-color: rgb(0, 255, 195);
    }
    .subModeDctBg3{
      background-color: rgb(0, 143, 219);
    }
  /* 子模块名称框背景 */
    .subModeNameBg1{
      background-color: rgb(15, 30, 26);
      border-left: 2px rgb(0, 110, 77) solid;
    }
    .subModeNameBg2{
      background-color: rgb(23, 160, 166);
      border-left: 2px rgb(0, 110, 77) solid;
    }
    .subModeNameBg3{
      background-color: rgb(100, 199, 253);
      border-left: 2px rgb(12, 116, 173) solid;
    }
  /* 代码背景 */
    .codeBg1{
      color: rgb(250, 250, 250);
      background-color:rgb(20, 197, 144);
    }
    .codeBg2{
      color: black;
      background-color:rgb(255, 255, 255);
    }
    .codeBg3{
      background-color:rgb(173, 226, 255);
    }

    /* 滚动条 */
    /* 代码滚动条 */
      /* 酷黑 */
        /* 代码滚动条 */
        .codeBg1::-webkit-scrollbar {
          width: 0px;
          height: 8px;
          background-color: rgb(2, 21, 15);
        }
        .codeBg1::-webkit-scrollbar-thumb {
          border-radius: 6px; /* 滑块边界圆角 */
          background-color: rgb(20, 197, 144); /* 滑块颜色 */
          border: 1px solid #ffffff; 
          width: 10px;
          background-clip:content-box;
        }
        .codeBg1::-webkit-scrollbar-track-piece { 
          border-radius: 8px; /* 轨道边界圆角 */
          border: 2px solid rgb(20, 197, 144);
        }
        /* 子模块名滚动条 */
        .subModeNameBg1::-webkit-scrollbar {
          width: 0px;
          height: 7px;
          background-color: rgb(2, 21, 15);
        }
        .subModeNameBg1::-webkit-scrollbar-thumb {
          border-radius: 6px; /* 滑块边界圆角 */
          background-color: rgb(20, 197, 144); /* 滑块颜色 */
          border: 1px solid #ffffff; 
          width: 10px;
          background-clip:content-box;
        }
        .subModeNameBg1::-webkit-scrollbar-track-piece { 
          border-radius: 8px; /* 轨道边界圆角 */
          border: 2px solid rgb(20, 197, 144);
        }
      /* 垂直滚动条 */
        .dataBackgroundColor1::-webkit-scrollbar {
          width: 7px;
          height: 0px;
          background-color: rgb(2, 21, 15);
        }
        .dataBackgroundColor1::-webkit-scrollbar-thumb {
          border-radius: 6px; /* 滑块边界圆角 */
          background-color: rgb(20, 197, 144); /* 滑块颜色 */
          border: 1px solid #ffffff; 
          width: 10px;
          background-clip:content-box;
        }
        .dataBackgroundColor1::-webkit-scrollbar-track-piece { 
          border-radius: 8px; /* 轨道边界圆角 */
          border: 2px solid rgb(20, 197, 144);
        }
      /* 清新 */
        /* 代码滚动条 */
        .codeBg2::-webkit-scrollbar {
          width: 0px;
          height: 8px;
          background-color: rgb(2, 21, 15);
        }
        .codeBg2::-webkit-scrollbar-thumb {
          border-radius: 6px; /* 滑块边界圆角 */
          background-color: rgb(20, 197, 144); /* 滑块颜色 */
          border: 1px solid #ffffff; 
          width: 10px;
          background-clip:content-box;
        }
        .codeBg2::-webkit-scrollbar-track-piece { 
          border-radius: 8px; /* 轨道边界圆角 */
          border: 2px solid rgb(20, 197, 144);
        }
        /* 子模块名滚动条 */
        .subModeNameBg2::-webkit-scrollbar {
          width: 0px;
          height: 7px;
          background-color: rgb(2, 21, 15);
        }
        .subModeNameBg2::-webkit-scrollbar-thumb {
          border-radius: 6px; /* 滑块边界圆角 */
          background-color: rgb(20, 197, 144); /* 滑块颜色 */
          border: 1px solid #ffffff; 
          width: 10px;
          background-clip:content-box;
        }
        .subModeNameBg2::-webkit-scrollbar-track-piece { 
          border-radius: 8px; /* 轨道边界圆角 */
          border: 2px solid rgb(20, 197, 144);
        }
      /* 垂直滚动条 */
        .dataBackgroundColor2::-webkit-scrollbar {
          width: 7px;
          height: 0px;
          background-color: rgb(2, 21, 15);
        }
        .dataBackgroundColor2::-webkit-scrollbar-thumb {
          border-radius: 6px; /* 滑块边界圆角 */
          background-color: rgb(20, 197, 144); /* 滑块颜色 */
          border: 1px solid #ffffff; 
          width: 10px;
          background-clip:content-box;
        }
        .dataBackgroundColor2::-webkit-scrollbar-track-piece { 
          border-radius: 8px; /* 轨道边界圆角 */
          border: 2px solid rgb(20, 197, 144);
        }
      /* 欢快 */
        /* 代码滚动条 */
        .codeBg3::-webkit-scrollbar {
          width: 0px;
          height: 8px;
          background-color: rgb(100, 199, 253);
        }
        .codeBg3::-webkit-scrollbar-thumb {
          border-radius: 6px; /* 滑块边界圆角 */
          background-color: rgb(0, 162, 250); /* 滑块颜色 */
          border: 1px solid #ffffff; 
          width: 10px;
          background-clip:content-box;
        }
        .codeBg3::-webkit-scrollbar-track-piece { 
          border-radius: 8px; /* 轨道边界圆角 */
          border: 2px solid rgb(0, 162, 250);
        }
        /* 子模块名滚动条 */
        .subModeNameBg3::-webkit-scrollbar {
          width: 0px;
          height: 7px;
          background-color: rgb(100, 199, 253);
        }
        .subModeNameBg3::-webkit-scrollbar-thumb {
          border-radius: 6px; /* 滑块边界圆角 */
          background-color: rgb(0, 162, 250); /* 滑块颜色 */
          border: 1px solid #ffffff; 
          width: 10px;
          background-clip:content-box;
        }
        .subModeNameBg3::-webkit-scrollbar-track-piece { 
          border-radius: 8px; /* 轨道边界圆角 */
          border: 2px solid rgb(0, 136, 209);
        }
      /* 垂直滚动条 */
        .dataBackgroundColor3::-webkit-scrollbar {
          width: 7px;
          height: 0px;
          background-color: rgb(2, 21, 15);
        }
        .dataBackgroundColor3::-webkit-scrollbar-thumb {
          border-radius: 6px; /* 滑块边界圆角 */
          background-color: rgb(0, 162, 250); /* 滑块颜色 */
          border: 1px solid #ffffff; 
          width: 10px;
          background-clip:content-box;
        }
        .dataBackgroundColor3::-webkit-scrollbar-track-piece { 
          border-radius: 8px; /* 轨道边界圆角 */
          border: 2px solid rgb(0, 162, 250);
        }
  /* 弹窗 */
  /* 弹窗遮罩 */
    .alterShade1{
      background-color: rgba(255, 255, 255, 0.2);
    }
    .alterShade2{
      background-color: rgba(255, 255, 255, 0.2);
    }
    .alterShade3{
      background-color: rgba(255, 255, 255, 0.2);
    }
    /* 按键 */
    .alterBtBg1{
      background-color: rgb(20, 197, 144);;
    }
  
 </style>
 