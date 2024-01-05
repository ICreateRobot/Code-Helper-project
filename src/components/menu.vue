<template>
    <div>
        <button class="menu_bt" @click="importDeployFile">{{UiData.ui_bt_import}}</button>
        <button class="menu_bt">{{UiData.ui_bt_updata}}</button>
        <button class="menu_bt" v-if="showDate=='Arduion'" @click="switchingMode">{{UiData.ui_bt_module_arduino}}</button>
        <button class="menu_bt" v-else @click="switchingMode">{{UiData.ui_bt_module_python}}</button>
<!-- 切换中英文 -->
        <button class="menu_bt" v-if="language=='Chinese'" @click="readConfigLanguageEn">{{UiData.ui_bt_languageChinese}}</button>
        <button class="menu_bt" v-else @click="readConfigLanguage">{{UiData.ui_bt_languageEnglish}}</button>

        <button class="menu_bt" @click="initDeployFile">{{UiData.ui_bt_initConfig}}</button>
    </div>
</template>
<script>
import axios from 'axios';
  export default{
    components:{
      //注册
      },  
      mounted() {
        this.readConfigLanguage();//立即执行
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
        //切换模式
        switchingMode(){
          if(this.showDate === 'Arduion'){
            this.$emit("customEvent","Python");
            this.showDate ='Python'
          }else if(this.showDate ==='Python'){
            this.$emit("customEvent","Arduion");
            this.showDate ='Arduion'
          }
        },

        // 初始化配置文件
        initDeployFile(){
          window.ipcRenderer.send('initDeployFile');
        },
        // 导入配置文件
        importDeployFile(){
          window.ipcRenderer.send('importDeployFile');
        },
        readConfigLanguage(){
          // 中文
          this.language = "Chinese";
          const filePath = '/language/Chinese.json'; // 指定本地JSON文件路径
          axios.get(filePath)
            .then((response) => {
              this.UiData = response.data; // 将获取到的JSON数据保存到组件的data属性中
              console.log("读取接送1111",);
            })
            .catch((error) => {
              console.log('Error reading local JSON file', error);
            });         
        },
        readConfigLanguageEn(){
          // 英文
          this.language = "English";
          const filePath = '/language/English.json'; // 指定本地JSON文件路径
          axios.get(filePath)
            .then((response) => {
              this.UiData = response.data; // 将获取到的JSON数据保存到组件的data属性中
              console.log("数据",this.UiData);
            })
            .catch((error) => {
              console.log('Error reading local JSON file', error);
            });         
        }

      
      }
  }
  
</script>
<style >
  .menu_bt{
    margin-right: 10px;
  }
</style>
  