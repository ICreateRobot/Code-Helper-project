

<template>
  <div class="topContent">
     <!-- 顶部内容 -->
     <topContent />
  </div>
 
  <div class="mainContent">
     <!-- 主要内容 -->
     <div class="contentMenu">
       <!-- 按键 -->
       <Menu @openImprotAlter="openImprotAlter" @openModuleAlter="openModuleAlter" @openSetAlter='openSetAlter'/>
     </div>

     <!-- 弹窗遮罩 -->
     <div v-if="isAlter" class="alterShade" @click="colseAlters"></div>
     <!-- 弹窗 -->
     <div v-if="isAlter" >
        <div v-if="alterName == 'import'">
          <importView @closeAlter="colseAlters" />
        </div>
        <div v-if="alterName == 'selectModel'">
          <moduleView @closeAlter="colseAlters"/>
        </div>
        <div v-if="alterName == 'setView'">
          <setView @closeAlter="colseAlters"/>
        </div>
     </div>

     <div class="contentData">
       <!-- 数据 -->
       <Showdata />
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
        
       },    
     data(){
       return{
        context:"显示内容",
        isAlter:true,//是否打开弹窗
        alterName:'import',//弹窗名称
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

/* 弹窗框架 */
.alterTitle{
  width:260px;
  height: 30px;
  background-color: aqua;
}
.titleIcon{
  width: 20px;
  height: 20px;
  background-color: aquamarine;
  position: relative;
  top: 5px;
  left: 5px;
  float: left;
}
.titleText{
  height: 20px;
  float: left;
  position: relative;
  margin-left: 10px;
  line-height: 30px;
}
.alterContent{
  width: 290px;
  height: 200px;
  background-color: beige;
  position: relative;
  top: 6px;
  left: 5px;
}
.alterBt{
  width: 100px;
  height: 30px;
  background-color: aquamarine;
  position: relative;
  top: 10px;
  left: 100px;
  text-align: center;
}
.alterBtText{
  line-height: 30px;
}
 </style>
 