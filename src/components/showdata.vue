<!-- 信息展示页面 -->
<template>
  <div class="selectModule" :class="(myStyle == 'style1') ? 'dataBackgroundColor1':(myStyle == 'style2'?'dataBackgroundColor2':'dataBackgroundColor3')"  :style="{width: leftDivW+'%'}">
    <!-- 模块 -->
    <div class="moduleDiv">
      <div class="moduleDiv_content" v-for="(moduledata,index) in showDataOB" :key="index">

        <div class="moduleName btSuspensionEvent" :style="setSelectModuleNameBg(moduledata.moduleName)" @click="setShowDataModuleName(moduledata.moduleName)">
          <!-- 模块名 -->
          <span class="textNotCopy spanModuleName" :style="setSelectModuleNameText(moduledata.moduleName)">{{ moduledata.moduleName }}</span>
        </div>

        <div class="moduleAdorn" :class="(myStyle == 'style1') ? 'backgroundColorO1':(myStyle == 'style2'?'backgroundColorO2':'backgroundColorO3')">
          <!-- 装饰 -->
          <div class="dot dot_1" :style="setSelectModuleNameDot2()"></div>
          <div class="dot dot_2" :style="setSelectModuleNameDot2()"></div>
          <div class="dot dot_3" :style="setSelectModuleNameDot(moduledata.moduleName)" @click="setShowDataModuleName(moduledata.moduleName)"></div>
          <div class="dot dot_4" :style="setSelectModuleNameDot2()"></div>
        </div>

      </div>     

    </div>
    
  </div>

  <!-- 移动位置 -->
  <div id="Mouse" :style="{left: centreDistanceLeft+'px'}">
    <div id="mouseTop" @click="setDivWidthAugment"></div>
    <div id="mouseDown" @click="setDivWidthDecrease"></div>
  </div>


  <dev class="selectSubModule" :class="(myStyle == 'style1') ? 'dataBackgroundColor1':(myStyle == 'style2'?'dataBackgroundColor2':'dataBackgroundColor3')" :style="{width: rightDivW+'%',left:codesLeftNumber+'%'}">
   <!-- 子模块 -->
    <div class="moduleDiv_subContent" v-for="(moduledata,index) in showSubData" :key="index">
        <!-- 子模块 -->
        <div class="moduleSubNameTitle" :class="(myStyle == 'style1') ? 'subModeBg1':(myStyle == 'style2'?'subModeBg2':'subModeBg3')">
          <div class="titleDots">
            <div class="titleDot1" :class="(myStyle == 'style1') ? 'subModeDctBg1':(myStyle == 'style2'?'subModeDctBg2':'subModeDctBg3')"></div>
            <div class="titleDot1" :class="(myStyle == 'style1') ? 'subModeDctBg1':(myStyle == 'style2'?'subModeDctBg2':'subModeDctBg3')"></div>
            <div class="titleDot1" :class="(myStyle == 'style1') ? 'subModeDctBg1':(myStyle == 'style2'?'subModeDctBg2':'subModeDctBg3')"></div>
          </div>
          <div class="moduleSubName" :class="(myStyle == 'style1') ? 'subModeNameBg1':(myStyle == 'style2'?'subModeNameBg2':'subModeNameBg3')" :style="{width:subModuleContentW+'%'}" @click="selectSubModuleBt(moduledata.submoduleName )">
            <!-- 模块名 -->
            <span class="subNames textNotCopy" :class="(myStyle == 'style1') ? 'textColorStyle1_2':(myStyle == 'style2'?'textColorStyle2_2':'textColorStyle3_2')">{{ moduledata.submoduleName }}</span>
          </div>
          <div v-if="moduledata.codes[0].code != ''" style="position: relative;top:20%">
            <div class="moduleSubBtContent" @click="selectSubModuleBt(moduledata.submoduleName )">
              <!-- 按钮 -->
              <div :class="atPresentSubMuduleName === moduledata.submoduleName? 'moduleSubBt_off' :'moduleSubBt_on'" :style="setTriangleStyle(moduledata.submoduleName)"></div>
            </div>
          </div>
          
        </div>
        <!-- 代码区域 -->
        <div class="codes" :style="setThisShowCodes(moduledata.submoduleName)" :class="(myStyle == 'style1') ? 'textColorStyle1':(myStyle == 'style2'?'textColorStyle2':'textColorStyle3')">
          <div class="code " :class="(myStyle == 'style1') ? 'codeBg1':(myStyle == 'style2'?'codeBg2':'codeBg3')"  v-for="(code,index) in moduledata.codes" :key="index">
            <div class="textNotCopy" :class="isCopy ? '':'textNotCopy'" @click="copyCodeText(code.code,code.explain)" @mouseenter="handleMouseEnter" @mousemove="mousemoveEv" @mouseleave="handleMouseLeave">
              <span :style="isCopy ? 'cursor:move;':'cursor:default;'" >
                <span class="codeText" :class="isCopy ? '':'textNotCopy'" :style="setTextCode()">{{ code.code }}</span>
                <span :class="isCopy ? '':'textNotCopy'" style=" opacity:0;">{{ code.explain }}</span>
              </span><br>
              <span class="textNotCopy" :class="(myStyle == 'style1') ? 'codeNote1':(myStyle == 'style2'?'codeNote2':'codeNote3')">{{ code.explain }}</span><br>
            </div>
          </div>
         
        </div>

    </div>  

   

  </dev>
</template>
<script>
import axios from 'axios';
// import ipcRenderer from 'electron'
  export default{    
    components:{
      },
    data(){
      return{
       context:"显示内容1",
       pdfUrl:"",
       showDataOB:"",//显示数据
       showZhDataOB:"",//中文数据
       showEnDataOB:"",//英文数据
       showDataType:false,//模式，默认为中文
       isCopy:false,
       showDataTypes:"Arduino",//默认Arduino
       showModule:'基础',//显示模块
       showSubData:'',//显示代码数据
       moduleShowData:"subModule_0",//选中
       leftDivW:20,//左侧div默认宽度
       rightDivW:68,//右侧div默认宽度
       codesLeftNumber:25,
       centreDistanceLeft:0,//中间距离左侧的位置
       subModuleContentW:68,//子模块区域宽度
       atPresentSubMuduleName:'',//当前子模块名称
       mode:'',
       myStyle:"",//样式

      }
    }
    ,
    mounted() {
      this.getConfigFile();
    },
    methods:{
      readData(){
        const filePath = './config/'+this.showDataTypes+'.json'; // 指定本地JSON文件路径
        // console.log("文件地址",filePath)
        axios.get(filePath)
            .then((response) => {
              console.log("文件内容",response.data)
              this.showZhDataOB = response.data["chinese"]
              this.showEnDataOB = response.data["English"]
              console.log("显示模式：",this.showDataType);
              
              if(this.showDataType){
                // 显示英文
                console.log("英文数据",this.showEnDataOB);
                if(this.showEnDataOB.length != 0){
                  this.showDataOB = this.showEnDataOB;
                }else{
                  this.showDataOB = this.showZhDataOB;//默认显示模式
                }
              }else{
                this.showDataOB = this.showZhDataOB;
              }
              console.log("数据：",this.showDataOB)
              if(this.showDataOB != null){
                this.showModule = this.showDataOB[0].moduleName;
                this.showSubData = this.showDataOB[0].submodule;
              }
            })
            .catch((error) => {
              console.log('Error reading local JSON file', error);
            });
      },
      getConfigFile() {
        const filePath = './configData.json'; // 指定本地JSON文件路径
        // console.log("文件地址",filePath)
        axios.get(filePath)
          .then((response) => {
            let configData = response.data;//配置文件数据
            this.showDataTypes = configData.mode;//显示模式
            this.myStyle = configData.style;//样式
            this.isCopy=configData.reproducibleOrNot;//是否可复制
            //显示中英文
            if(configData.language == '中文'){
                this.showDataType = false;
            }else{
                this.showDataType = true;
            }

            this.readData();//读取数据
          })
          .catch((error) => {
            console.log('Error reading local JSON file', error);
          });
      },
      // 设置圆点是否被选中
      setSelectModuleNameDot(moduleSelectName){
        // 酷黑
        if(this.myStyle == 'style1'){
           if(this.showModule == moduleSelectName){
              return 'background-color:  rgb(20, 197, 144);';
            }else{
              return 'background-color: rgb(255, 255, 255);';
            }
        }
        // 清新
        if(this.myStyle == 'style2'){
           if(this.showModule == moduleSelectName){
              return 'background-color:  rgb(43, 179, 221);';
            }else{
              return 'background-color: rgb(203, 203, 203);';
            }
        }
         // 欢快
         if(this.myStyle == 'style3'){
           if(this.showModule == moduleSelectName){
              return 'background-color:  rgb(249, 120, 158);';
            }else{
              return 'background-color: rgb(202, 203, 205);';
            }
        }
       
      },
      
      // 设置圆点是否被选中
      setSelectModuleNameDot2(){
        // 酷黑
        if(this.myStyle == 'style1'){
          return 'background-color: rgb(255, 255, 255);';      
        }
        // 清新
        if(this.myStyle == 'style2'){
          return 'background-color: rgb(203, 203, 203);';
        }
         // 欢快
        if(this.myStyle == 'style3'){
          return 'background-color: rgb(202, 203, 205);';
        }
       
      },
      //选中文字背景
      setSelectModuleNameBg(showNameText){
        // 酷黑
        if(this.myStyle == 'style1'){
          if(this.showModule == showNameText){
            return 'background-color: rgb(20, 197, 144);';
          }else{
            return 'background-color: rgb(15, 30, 26)';
          }
        }
        // 清新
        if(this.myStyle == 'style2'){
          if(this.showModule == showNameText){
            return 'background-color: rgb(42,178,216);';
          }else{
            return 'background-color: rgb(204, 242, 251);';
          }
        }
          // 欢快
        if(this.myStyle == 'style3'){
          if(this.showModule == showNameText){
            return 'background-color: rgb(249, 120, 158);';
          }else{
            return 'background-color: rgb(249,245,246)';
          }
        }
        
      },
      setTextCode(){
        if(this.myStyle == 'style3'){
          return 'color:  rgb(0, 0, 0);';
        }
      },
      //设置三角
      setTriangleStyle(modeName){
        // 酷黑
        if(this.myStyle == 'style1'){
          if(this.atPresentSubMuduleName == modeName){
            return 'border-top: 10px solid rgb(0, 255, 195);  border-bottom: 0px;';
          }else{
            return 'border-bottom: 10px solid rgb(0, 255, 195);  border-top: 0px;';
          }
        }
         // 清新
         if(this.myStyle == 'style2'){
          if(this.atPresentSubMuduleName == modeName){
            return 'border-top: 10px solid rgb(33, 134, 164);  border-bottom: 0px;';
          }else{
            return 'border-bottom: 10px solid rgb(33, 134, 164);  border-top: 0px;';
          }
        }
         // 欢快
         if(this.myStyle == 'style3'){
          if(this.atPresentSubMuduleName == modeName){
            return 'border-top: 10px solid rgb(245, 142, 171);  border-bottom: 0px;';
          }else{
            return 'border-bottom: 10px solid rgb(245, 142, 171);  border-top: 0px;';
          }
        }
      },
      // 设置文字是否被选中
      setSelectModuleNameText(showNameText){
        // 酷黑
        if(this.myStyle == 'style1'){
          if(this.showModule == showNameText){
            return 'color: rgb(250, 250, 250);';
          }else{
            return 'color:  rgb(121, 124, 123);';
          }
        }
         // 欢快
         if(this.myStyle == 'style2'){
          if(this.showModule == showNameText){
            return 'color: rgb(244, 250, 240);';
          }else{
            return 'color:  rgb(35, 62, 79);';
          }
        }
        if(this.myStyle == 'style3'){
          if(this.showModule == showNameText){
            return 'color: rgb(252, 252, 250);';
          }else{
            return 'color:  rgb(34, 61, 80);';
          }
        }
        
      },
      // 设置选中模块
      setShowDataModuleName(showName){
        this.showModule = showName;
        for(let data of this.showDataOB){
          // console.log("遍历数据：",data);
          if(data.moduleName == showName){
            this.showSubData = data.submodule;
          }
        }
        // console.log("当前数据：",this.showSubData);
      },

      // div右移
      setDivWidthAugment(){
        console.log("右移：",this.leftDivW);
        if(this.leftDivW<35){
          this.leftDivW =  this.leftDivW+1;
          this.rightDivW =  this.rightDivW-1;
          this.centreDistanceLeft=  this.centreDistanceLeft+10;
          this.codesLeftNumber = this.codesLeftNumber+1;
          this.subModuleContentW = this.subModuleContentW -1;
        }
      },
      // div左移
      setDivWidthDecrease(){
        if(this.leftDivW>20){
          this.leftDivW =  this.leftDivW-1;
          this.rightDivW =  this.rightDivW+1;
          this.centreDistanceLeft=  this.centreDistanceLeft-10;
          this.codesLeftNumber = this.codesLeftNumber-1;
          this.subModuleContentW = this.subModuleContentW +1;
        }
      },
      // 选择子模块
      selectSubModuleBt(subModuleName){
        // console.log("传入：",subModuleName);
        if(this.atPresentSubMuduleName == subModuleName){
          this.atPresentSubMuduleName = '';
        }else{
          this.atPresentSubMuduleName = subModuleName;
        }
       
      },
      setThisShowCodes(subModuleName){
        if(this.atPresentSubMuduleName == subModuleName){
          return 'height: auto;'
        }else{
          return 'height: 0px'
        }
      },

      //单击选中文本
      handleMouseEnter(event) {
        // 获取到目标元素并修改样式-入
        const targetElement = event.target;
        targetElement.style.setProperty("user-select", "all");        
      },
      copyCodeText(code,text){
        // console.log(this.isCopy);
        if(!this.isCopy){
          return;
        }
        let textData = code+text;      
          try {
            const text = navigator.clipboard.readText();
            text.then((result) =>{
              // console.log("剪切板",result); // 输出剪贴板中的文本内容

              if(result != textData){
                navigator.clipboard.writeText(textData)
                .then(() => {
                  console.log("复制成功"); // 复制成功后更新状态
                })
                .catch((error) => {
                  console.log(`复制失败：${error}`);
                });
              }
            })
            
        } catch (error) {
            console.error('无法从剪贴板中获取内容', error);
        }

      },
      handleMouseLeave(event) {
        // 获取到目标元素并恢复原有样式-出
        const targetElement = event.target;
        targetElement.style.removeProperty("user-select");
      },
      mousemoveEv(event){
        // console.log("进入拖动事件");
        
      }
      
      
  }
    
}
</script>

<style>

/* CSS */
::selection {
    background-color: transparent; /* 这里可以根据需求自行更改背景颜色 */
}
#Mouse{
  width: 3px;
  height: 100%;
  position: absolute;
  /* background-color: black; */
  left: 103px;
  cursor:pointer;
}
#mouseTop{
  width: 6px;
  height: 50%;
  /* background-color: rgb(198, 0, 0); */
  position: fixed;
  z-index: 2;
  right: 3px;
}
#mouseDown{
  width: 6px;
  height: 50%;
  /* background-color: rgb(233, 131, 131); */
  position: fixed;
  z-index: 2;
  left: 2px;
}

.selectModule{
  /* 选择模块 */
  /* background-color: rgb(0, 255, 34); */
  position: absolute;
  width: 91px;
  height: 659px;
  left: 10px;
  top: 6px;
  padding-top: 6px;
  padding-left: 3px;
  border-top-left-radius:8px;
  border-bottom-left-radius:8px;
  

}
.selectSubModule{
  /* 选择子模块 */
  /* background-color: rgb(62, 134, 198); */
  position: absolute;
  /* width: 315px; */
  height: 650px;
  left: 25%;
  top: 6px;
   /* 溢出滚动 */
   overflow: auto;
   padding-top: 15px;
   padding-left: 10px;
   padding-right: 10px;
   border-top-right-radius:8px;
   border-bottom-right-radius:8px;
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
  width: 70%;
  height: 38px;
  /* background-color: rgb(98, 98, 98); */
  position: relative;
  top: 1px;
  float: left;
  margin-left: 3px;
  margin-top: 3px;
  margin-right: 2px;
  text-align: center;
  border-radius:4px;
}
.moduleAdorn{
  width: 20px;
  height: 38px;
  /* background-color: rgb(0, 0, 0); */
  position: relative;
  margin-top: 4px;
  float: left;
 
}
.spanModuleName{
  line-height:38px;
}
/* 圆点 */
.dot{
  width: 2px; /* 或者其他适当的数值 */
  height: 2px; /* 或者其他适当的数值 */
  border-radius: 50%; /* 将边界角度设置为50%，即等于高度/2 */
  position: absolute;
  left: 45%;
}
.dot_1{
  
  top: 10%;
}
.dot_2{
  top: 30%;
}
/* 大圆 */
.dot_3{
  width: 10px;
  height: 10px;
  left: 23%;
  top: 45%;
  cursor:pointer;
}
.dot_4{
  top: 80%;
}
/* 子模块 */
.moduleDiv_subContent{
  width: 100%;
  height: auto;
  /* 圆角 */
  /* border-radius: 3px; */
  /* background-color: rgb(0, 0, 0); */
  position: relative;
}
.moduleSubNameTitle{
  width: 100%;
  height: 40px;
  /* 圆角 */
  border-radius: 6px;
  /* background-color: aliceblue; */
  float: left;
  margin-top: 10px;
  margin-bottom: 5px;
}
.moduleSubName{
  width: 200px;
  height: 40px;
  /* background-color: rgb(134, 198, 255); */
  position: relative;
  line-height: 40px;
  float: left;
  white-space:nowrap;
  overflow: auto;
}
/* 收起三角 */
.moduleSubBt_on{
  width: 0;
  height: 0;
  border-left: 6px solid transparent; /* 左边透明 */
  border-right: 6px solid transparent; /* 右边透明 */
  transform: rotate(90deg);
  /* border-bottom: 10px solid red;  */
}
/* 打开三角 */
.moduleSubBt_off{
  width: 0;
  height: 0;
  border-left: 6px solid transparent; /* 左边透明 */
  border-right: 6px solid transparent; /* 右边透明 */
  /* border-top: 10px solid red;  */
}
.moduleSubBtContent{
  width: 14px;
  height: 15px;
  /* background-color: black; */
  float: left;
  position: relative;
  padding: 6px;
  top: 20%;
  left: 0px;
  cursor:pointer;
}
/* 代码区域 */
.codes{
  width: 90%;
  height: auto;
  /* background-color:aqua; */
  position: relative;
  /* top: 45px; */
  left: 5%;
  /* padding: 2px; */
  overflow: hidden;
}
/* 代码 */
.code{
  width: 100%;
  height: 60px;
  /* background-color:rgb(32, 230, 158); */
  line-height: 26px;
  overflow-y: auto;
  margin-top: 5px;
  border-radius: 5px;
  /* color: white; */
}
.codeText{
  white-space:nowrap;
  /* cursor:move; */
  position: relative;
  left: 6px;
}


.titleDots{
  width: 10px;
  height: 36px;
  /* background-color: brown; */
  margin-left: 8px;
  margin-right: 6px;
  margin-top: 2px;
  padding: 0px;
  float: left;
}
.titleDot1{
  width: 8px;
  height: 8px;
  margin-top: 3px;
  /* background-color: rgb(0, 255, 195); */
  border-radius: 50%; /* 将边界角度设置为50%，即等于高度/2 */
}
.subNames{
  position: relative;
  left: 20px;
}
.moduleDiv_content{
  
}
</style>
