

<template>
  <div class="topContent">
     <!-- 顶部内容 -->
     <topContent :appName="appName" :languageData="language" :configFileData="configFileData"/>
  </div>
 
  <div class="mainContent">
     <!-- 主要内容 -->
     <div class="contentMenu">
       <!-- 按键 -->
       <Menu @openImprotAlter="openImprotAlter" @openModuleAlter="openModuleAlter" @openSetAlter='openSetAlter' :languageData="language"/>
     </div>

     <!-- 弹窗遮罩 -->
     <div v-if="isAlter" class="alterShade" @click="colseAlters"></div>
     <!-- 弹窗 -->
     <div v-if="isAlter" >
        <div v-if="alterName == 'import'">
          <importView @closeAlter="colseAlters" :languageData="language" :configFileData="configFileData"/>
        </div>
        <div v-if="alterName == 'selectModel'">
          <moduleView @closeAlter="colseAlters" :languageData="language" :configFileData="configFileData"/>
        </div>
        <div v-if="alterName == 'setView'">
          <setView @closeAlter="colseAlters" :AppName="appName" :appVersion="version" :languageData="language" :configFileData="configFileData"/>
        </div>
     </div>

     <div class="contentData">
       <!-- 数据 -->
       <Showdata :thisMode="configFileData.mode"/>
     </div>
  </div>
  <div class="bottomContent">
   <!-- 版权 -->
   <span>山东艾克瑞特教育科技有限公司</span>
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
    this.getAppVersion();
    this.readConfigData();
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
          }); 
      },
      readConfigData(){
        const filePath = './configData.json'; // 指定本地JSON文件路径
        // console.log("文件地址",filePath)
        axios.get(filePath)
            .then((response) => {
              let configData = response.data;
              
              console.log("配置信息：",configData.language);
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
              console.log("语言信息：",languageData);
              this.language =languageData;
            })
            .catch((error) => {
              console.log('Error reading local JSON file', error);
            });
      },

       
     }
 }
 
 
 </script>
 <style >
 .topContent{
   /* 顶部内容 */
   width: 100%;
   height: 50px;
   background-color: red;
   position: absolute ;
   top: 0px;
   left: 0px;
   
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
   background-color: aqua;
 }
 .contentData{
   width: 100%;
   height: 676px;
   background-color: rgb(249, 249, 42);
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
 
 ::-webkit-scrollbar {
     border-radius: 8px; /* 轨道边界圆角 */
     width: 16px; /* 滚动条宽度 */
     background-color: #ffffff;
     /* background-color: #dde5ff; 滚动条背景色 */
 }
 /* 滑块样式 */
 ::-webkit-scrollbar-thumb {
     border-radius: 6px; /* 滑块边界圆角 */
     background-color: #dde5ff; /* 滑块颜色 */
 }

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
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 45px;
  z-index: 2;
}
.btSuspensionEvent{
  cursor:pointer;
}


 </style>
 