<!-- 信息展示页面 -->
<template>
  <div class="selectModule">
    <!-- 模块 -->
    <div class="moduleDiv">
      <div class="moduleDiv_content" v-for="(moduledata,index) in showDataOB" :key="index">
        <div class="moduleName" @click="setShowDataModuleName(moduledata.moduleName)">
          <span class="textNotCopy spanModuleName" :style="setSelectModuleNameText(moduledata.moduleName)">{{ moduledata.moduleName }}</span>
        </div>
        <div class="moduleAdorn">
          <div class="dot dot_1"></div>
          <div class="dot dot_2"></div>
          <div class="dot dot_3" :style="setSelectModuleNameDot(moduledata.moduleName)"></div>
          <div class="dot dot_4"></div>
        </div>
      </div>
     
      
    </div>
    
    
  </div>
  <dev class="selectSubModule">
   
   <!-- 子模块 -->
    
  </dev>
</template>
<script>
import axios from 'axios';
// import ipcRenderer from 'electron'
  export default{    
    data(){
      return{
       context:"显示内容1",
       pdfUrl:"",
       filePathName:"Arduino",
       showDataOB:"",//显示数据
       showZhDataOB:"",//中文数据
       showEnDataOB:"",//英文数据
       showDataType:false,//模式，默认为中文
       isCopy:false,
       showDataTypes:"Arduino",//默认Arduino
       showModule:'基础内容',//显示模块
       moduleShowData:"subModule_0",//选中
      }
    }
    ,
    mounted() {
      this.readData();
    },
    methods:{
      readData(){
        const filePath = '/config/'+this.filePathName+'.json'; // 指定本地JSON文件路径
        // console.log("文件地址",filePath)
        axios.get(filePath)
            .then((response) => {
              console.log("文件地址",response.data)
              this.showZhDataOB = response.data["chinese"]
              this.showEnDataOB = response.data["English"]
              if(this.showDataType){
                // 显示英文
                this.showDataOB = this.showEnDataOB;
              }else{
                this.showDataOB = this.showZhDataOB;
              }
              console.log("数据：",this.showDataOB)
              if(this.showDataOB != null){
                this.showModule = this.showDataOB[0].moduleName;
              }
            })
            .catch((error) => {
              console.log('Error reading local JSON file', error);
            });
        
        
      },
      // 设置圆点是否被选中
      setSelectModuleNameDot(moduleSelectName){
        if(this.showModule == moduleSelectName){
          return 'background-color: rgb(0, 255, 161);';
        }else{
          return 'background-color: rgb(255, 255, 255);';
        }
      },
      // 设置文字是否被选中
      setSelectModuleNameText(showNameText){
        if(this.showModule == showNameText){
          return 'color: rgb(0, 255, 161);';
        }else{
          return 'color: white;';
        }
      },
      // 设置选中模块
      setShowDataModuleName(showName){
        this.showModule = showName;
      }
    }
}
</script>

<style>

.module_sub{
  background-color: aquamarine;
  margin: 5px;
  padding: 5px;
  overflow:auto;
  max-height: 0;
}
.module_code{
  background-color: antiquewhite;
  margin: 5px;
  overflow:auto;
}
.selected-filename {
  color: rgb(255, 255, 255);
}
.textNotCopy{
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}
.selectModule{
  /* 选择模块 */
  background-color: rgb(0, 255, 34);
  position: absolute;
  width: 30%;
  height: 676px;
  left: 10px;
  padding-top: 6px;
  padding-left: 3px;
}
.selectSubModule{
  /* 选择子模块 */
  background-color: rgb(62, 134, 198);
  position: absolute;
  width: 70%;
  height: 676px;
  right: 10px;
   /* 溢出滚动 */
   overflow: auto;
}
span{
  white-space:nowrap;
}

/* 模块名列表 */
.moduleDiv{
  width: 100%;
  /* height: 90px; */
  background-color:aliceblue;
  position: relative;
  
}
.moduleName{
  width: 62%;
  height: 38px;
  background-color: rgb(98, 98, 98);
  position: relative;
  margin-top: 3px;
  top: 1px;
  float: left;
}
.moduleAdorn{
  width: 20px;
  height: 38px;
  background-color: rgb(0, 0, 0);
  position: relative;
  margin-top: 4px;
  float: left;
}
.spanModuleName{
  line-height:38px;
  color: white;
}
/* 圆点 */
.dot{
  width: 5px; /* 或者其他适当的数值 */
  height: 5px; /* 或者其他适当的数值 */
  border-radius: 50%; /* 将边界角度设置为50%，即等于高度/2 */
  background-color: rgb(255, 255, 255);
  position: absolute;
}
.dot_1{
  left: 40%;
  top: 10%;
}
.dot_2{
  left: 40%;
  top: 30%;
}
/* 大圆 */
.dot_3{
  width: 10px;
  height: 10px;
  left: 29%;
  top: 50%;
}
.dot_4{
  left: 40%;
  top: 80%;
}

</style>
