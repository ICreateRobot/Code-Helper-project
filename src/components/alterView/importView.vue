
<template>
    <div class="importAlter">
      
        <div class="closeAlter" @click="closeAlter">
          <!-- 关闭 -->
        </div>

        <div class="alterTitle">
          <!-- 标题 -->
          <div class="titleIcon"></div>
          <div class="titleText">
              <span class="textNotCopy">{{languageData.ui_text_import}} {{ replaceModule }}</span>
          </div>
        </div>

        <div class="alterContent">
          <!-- 内容 -->
          <div class="selectContent">
            <div >
              <!-- 导入 -->
              <input class="btSuspensionEvent" type="radio" id="option1" value="option1" v-model="importType" :disabled="importNumber>=5">
              <label for="option1" class="btSuspensionEvent"> <span class="textNotCopy">{{languageData.ui_text_import}}</span></label>
              <span class="importNumberText textNotCopy"> ({{languageData.ui_text_importNumber}} {{importNumber}}/5)</span>
            </div>
            <div>
              <!-- 替换 -->
              <input class="btSuspensionEvent" type="radio" id="option2" value="option2" v-model="importType">
              <label for="option2" class="btSuspensionEvent"><span class="textNotCopy">{{languageData.ui_text_replace}}</span></label>
            </div>
            

            <div class="replaceOptions"  >
             
              <div v-for="(mode,index) in modes" :key="index">
                <input class="btSuspensionEvent" type="radio" :id=mode :value=mode v-model="replaceModule" :disabled="importType != 'option2'">
                <label :for=mode class="btSuspensionEvent"> <span class="textNotCopy">{{mode}}</span></label>
              </div>
            </div>
          </div>
          

        </div>

        <div class="alterBt btSuspensionEvent" @click="importConfigFile">
          <!-- 按键 -->
          <span class="alterBtText textNotCopy">{{languageData.ui_text_confirm}}</span>
        </div>
    </div>
   
</template>
<script>
  export default{
    props:['languageData','configFileData'],
    components:{
      //注册
      },  
      mounted() {
        this.getConfigData();

      },  
      data(){
        return{
         context:"导入页面",
         importType:'option1',//默认导入
         replaceModule:'',//默认替换名称
         importNumber:5,//已导入数量
         modes:'',//已有模式
        }
      },
      methods:{
        closeAlter(){
          this.$emit("closeAlter");
        },
        getConfigData(){
          //获取配置文件夹数据files
          this.replaceModule=this.configFileData.mode;//设置初始模式
          const filePath = window.electronAPI.getModes();
          filePath.then(data =>{
            // console.log("配置文件模式：",data.length);
            this.importNumber = data.length;
            this.modes= data;
            if(this.importNumber == 5){
              this.importType='option2';
            }
          });
        },
        //导入配置文件
        importConfigFile(){
          if(this.importType == 'option1'){
            //导入文件
            // console.log("导入文件");
            if(this.importNumber <5){
              window.ipcRenderer.send('importDeployFile');
            }
            
          }else if(this.importType == 'option2'){
            //替换文件
            // console.log("替换文件",this.replaceModule)
            window.ipcRenderer.send('replaceModeConfigFile',this.replaceModule);
          }
        }
      }
  }
  
</script>
<style >
/* 弹窗统一框 */
.importAlter{
  width: 300px;
  height: 280px;
  background-color: red;
  position: absolute;
  top: 25%;
  left: 18%;
  z-index: 3;
  box-shadow:0px 0px 20px rgb(0, 0, 0);
}
.closeAlter{
  width: 20px;
  height: 20px;
  background-color: rgb(0, 0, 0);
  position: absolute;
  top: 0px;
  right: 0px;
  cursor:pointer;
}
.selectContent{
  position: relative;
  top: 20px;
  left: 10px;
}
.replaceOptions{
    width: 220px;
    height: 120px;
    position: relative;
    top: 5px;
    left: 20px;
    background-color: rgb(143, 255, 152);
}
.importNumberText{
  color: rgb(154, 154, 154);
  font-size: 12px;
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
  