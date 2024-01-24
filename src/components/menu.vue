<template>
    <div class="btContent">
      <!-- 导入按钮 -->
        <div class="menuBt importBt" @click="openImportAlter">
          <div class="btIcon importBtIcon"></div>
          <div class="importBtText">
            <span class="textNotCopy">{{languageData.ui_text_import}}</span>
          </div>
        </div>
      <!-- 模式按钮 -->
        <div class="menuBt ModuleBt" @click="openSelectModelAlter">
          <div class="btIcon moduleBtIcon"></div>
          <div class="importBtText">
            <span class="textNotCopy">{{languageData.ui_text_mode}}</span>
          </div>
        </div>
      <!-- 设置按钮 -->
        <div class="menuBt setBt" @click="openSetAlter">
          <div class="btIcon setBtIcon"></div>
          <div class="importBtText">
            <span class="textNotCopy">{{languageData.ui_text_setting}}</span>
          </div>
        </div>

    </div>
</template>
<script>
// import axios from 'axios';
  export default{
    props:['languageData'],
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
    left: 20px;
  }
  .menuBt{
    width: auto;
    height: 26px;
    position: relative;
    box-shadow:0px 0px 5px rgb(78, 165, 139);
    border-radius: 5px;
    border:2px rgb(74, 117, 104) solid;
    float: left;
    margin-left: 15px;
    cursor:pointer;
    top: 2px;
  }
  .menuBt:hover{
    box-shadow:3px 3px 5px rgb(54, 84, 75);
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
    background-image: url('../img/import.svg');
  }
  .moduleBtIcon{
    width: 19.5px;
    height: 20px;
    top:3px;
    background-image: url('../img/mode.svg');
    /* background-color: aliceblue; */
  }
  .setBtIcon{
    width: 20px;
    height: 20px;
    background-image: url('../img/setting.svg');
    top:3px;
    /* background-color: aliceblue; */
  }
</style>
  