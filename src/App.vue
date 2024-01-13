

<template>
  <div class="topContent">
     <!-- 顶部内容 -->
     <topContent />
  </div>
 
  <div class="mainContent">
     <!-- 主要内容 -->
     <div class="contentMenu">
       <!-- 按键 -->
       <Menu />
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
 
 export default{
   
   components:{
     topContent,//顶部内容
     Menu,//菜单
     Showdata,//数据
   },  
   mounted() {
        
       },    
     data(){
       return{
        context:"显示内容",
        data:[1,2,3,3,3,3,3,3,3,3,3,3,3,3,123,3,5,5,45,46,56,45,64,676,35,243,25,2,34,5234,51,235,1,51,345,1,35,1,51,5,1,51,35,13,51,35,13,51]
       }
     },
     methods:{
       setDataType(){
         this.$refs.showDataPage.setShowDataTypeLanguage();
       },
       setShowDataType(){
         this.$refs.showDataPage.setShowDataType()
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
 </style>
 