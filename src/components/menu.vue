<template>
    <div class="btContent">
      <!-- 导入按钮 -->
        <div class="menuBt importBt" :class="(configFileData.style == 'style1') ? 'menuBt1':(configFileData.style == 'style2'?'menuBt2':'menuBt3')" @click="openImportAlter">
          <div class="btIcon importBtIcon" :class="(configFileData.style == 'style1') ? 'importBtIcon1':(configFileData.style == 'style2'?'importBtIcon2':'importBtIcon3')"></div>
          <div class="importBtText">
            <span class="textNotCopy" :class="(configFileData.style == 'style1') ? 'testColor1':(configFileData.style == 'style2'?'testColor2':'testColor3')">{{languageData.ui_text_import}}</span>
          </div>
        </div>
      <!-- 模式按钮 -->
        <div class="menuBt ModuleBt" :class="(configFileData.style == 'style1') ? 'menuBt1':(configFileData.style == 'style2'?'menuBt2':'menuBt3')" @click="openSelectModelAlter">
          <div class="btIcon moduleBtIcon" :class="(configFileData.style == 'style1') ? 'moduleBtIcon1':(configFileData.style == 'style2'?'moduleBtIcon2':'moduleBtIcon3')"></div>
          <div class="importBtText">
            <span class="textNotCopy" :class="(configFileData.style == 'style1') ? 'testColor1':(configFileData.style == 'style2'?'testColor2':'testColor3')">{{languageData.ui_text_mode}}</span>
          </div>
        </div>
      <!-- 设置按钮 -->
        <div class="menuBt setBt" :class="(configFileData.style == 'style1') ? 'menuBt1':(configFileData.style == 'style2'?'menuBt2':'menuBt3')" @click="openSetAlter">
          <div class="btIcon setBtIcon" :class="(configFileData.style == 'style1') ? 'setBtIcon1':(configFileData.style == 'style2'?'setBtIcon2':'setBtIcon3')"></div>
          <div class="importBtText">
            <span class="textNotCopy" :class="(configFileData.style == 'style1') ? 'testColor1':(configFileData.style == 'style2'?'testColor2':'testColor3')">{{languageData.ui_text_setting}}</span>
          </div>
        </div>

    </div>
</template>
<script>
// import axios from 'axios';
  export default{
    props:['languageData','configFileData'],
    components:{
      },  
      mounted() {
        // this.readConfigLanguage();//立即执行
      },  
      data(){
        return{
        
        }
      },
      methods:{
        // 打开导入模板
         openImportAlter(){
          this.$emit("openImprotAlter","import")
         },
        //  打开选择模式
         openSelectModelAlter(){
          //selectModel 
          this.$emit("openModuleAlter","selectModel")
         },
         //打开设置
         openSetAlter(){
          this.$emit("openSetAlter","setView")
         }
      }
  }
  
</script>
<style >
  .menu_bt{
    margin-right: 10px;
  }
  .btContent{
    width: 80%;
    height: 34px;
    /* background-color: aliceblue; */
    position: relative;
    color: rgb(224,230,222);
    top: 6px;
  }
  .menuBt{
    width: auto;
    height: 26px;
    position: relative;
    float: left;
    margin-left: 15px;
    cursor:pointer;
    top: 2px;
  }
  /**按键描边 */
  .menuBt1{
    box-shadow:0px 0px 5px rgb(78, 165, 139);
    border-radius: 5px;
    border:2px rgb(74, 117, 104) solid;
  }
  .menuBt2{
    box-shadow:0px 0px 5px rgb(223, 223, 223);
    border-radius: 5px;
    border:2px rgb(249, 249, 249) solid;
  }
  .menuBt3{
    padding: 2px;
    border-radius: 5px;
    background-color: rgb(207, 154, 170);
  }
  /**按键文字 */
  .testColor1{
   color: rgb(255, 255, 255);
  }
  .testColor2{
    color: rgb(255, 255, 255);
  }
  .testColor3{
    color: rgb(0, 0, 0);
  }

  
  .menuBt1:hover{
    box-shadow:3px 3px 5px rgb(54, 84, 75);
  }
  .menuBt2:hover{
    box-shadow:3px 3px 5px rgb(54, 84, 75);
  }
  .menuBt3:hover{
     box-shadow:3px 3px 5px rgb(54, 84, 75);
    background-color: rgb(255, 255, 255);
  }
  .btIcon{
    width: 20px;
    height: 18px;
    /* background-color: black; */
    float: left;
    position: relative;
    top: 5px;
    left: 3px;
  }
  .importBtText{
    width: auto;
    height: 20px;
    /* background-color: aliceblue; */
    float: left;
    text-align: center;
    position: relative;
    top: 3px;
    padding-right: 6px;
    margin-left: 6px;
  }
  .importBtIcon{
    width: 19px;
  }
 
  .moduleBtIcon{
    width: 19.5px;
    height: 20px;
    top:3px;
  }
 
  .setBtIcon{
    width: 20px;
    height: 20px;
    top:3px;
    /* background-color: aliceblue; */
  }
  
  
</style>
  