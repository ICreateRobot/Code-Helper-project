<template>
    <div>
        按钮区
    </div>
</template>
<script>
// import axios from 'axios';
  export default{
    components:{
      //注册
      },  
      mounted() {
        // this.readConfigLanguage();//立即执行
      },  
      data(){
        return{
         context:"头部导航",
         showDate:"Arduion",
         language:"Chinese",
         UiData:{
            ui_bt_import:"import",
            ui_bt_updata:"updata",
            ui_bt_module_arduino:"Arduino Module",
            ui_bt_module_python:"Python Module",
            ui_bt_initConfig:"init config",
            ui_bt_languageChinese:"Chinese",
            ui_bt_languageEnglish:"English" 
         }
        }
      },
      methods:{
         
      }
  }
  
</script>
<style >
  .menu_bt{
    margin-right: 10px;
  }
</style>
  