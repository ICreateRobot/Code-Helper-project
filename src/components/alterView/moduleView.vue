
<template>
    <div class="moduleAlter" :class="(configFileData.style == 'style1') ? 'backgroundColor1':(configFileData.style == 'style2'?'backgroundColor2':'backgroundColor3')">
        <div class="closeAlter" @click="closeAlter"></div>
        <div class="alterTitle2" :class="(configFileData.style == 'style1') ? 'textColorStyle1':(configFileData.style == 'style2'?'textColorStyle2':'textColorStyle3')">
          <!-- 标题 -->
          <div class="titleIcon3"></div>
          <div class="titleText">
              <span class="textNotCopy">{{ languageData.ui_text_mode}}</span>
          </div>
        </div>

        <div class="alterContent2" :class="(configFileData.style == 'style1') ? 'dataBackgroundColor1':(configFileData.style == 'style2'?'dataBackgroundColor2':'dataBackgroundColor3')">
          <!-- 内容 -->
          <div class="clipBorder2" :class="(configFileData.style == 'style1') ? 'dataBackgroundColor1':(configFileData.style == 'style2'?'dataBackgroundColor2':'dataBackgroundColor3')"></div>
            <div v-for="(mode,index) in modes" :key="index" :class="(configFileData.style == 'style1') ? 'textColorStyle1':(configFileData.style == 'style2'?'textColorStyle2':'textColorStyle3')">
              <input type="radio" :id=mode :value=mode v-model="atModule">
              <label :for=mode> <span class="textNotCopy">{{ mode }}</span></label>
            </div>
            

        </div>

        <div class="alterBt2 btSuspensionEvent" @click="setMode" :class="(configFileData.style == 'style1') ? 'alterBtBg1':(configFileData.style == 'style2'?'alterBtBg1':'alterBtBg1')">
          <!-- 按键 -->
          <span class="alterBtText textNotCopy" :class="(configFileData.style == 'style1') ? 'textColorStyle1':(configFileData.style == 'style2'?'textColorStyle2':'textColorStyle3')">{{languageData.ui_text_confirm}}</span>
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
         context:"选择模式",
         atModule:"",//当前模式
         modes:'',//所有模式
        }
      },
      methods:{
        closeAlter(){
          this.$emit("closeAlter");
        },
        getConfigData(){
          //获取配置文件夹数据files
          this.atModule=this.configFileData.mode;//设置初始模式
          const filePath = window.electronAPI.getModes();
          filePath.then(data =>{
            console.log("配置文件夹",data)
            this.modes= data;
          });
        },
        setMode(){
          // 设置默认模式
          // console.log("mode:",this.atModule);
          window.ipcRenderer.send('setDefaultModel',this.atModule);
        }
      }
  }
  
</script>
<style >
/* 弹窗统一框 */
.moduleAlter{
  width: 200px;
  height: 200px;
  background-color: rgb(4, 0, 255);
  position: absolute;
  top: 25%;
  left: 25%;
  z-index: 3;
  box-shadow:0px 0px 20px rgb(0, 0, 0);
}
.closeAlter{
  width: 20px;
  height: 20px;
  /* background-color: rgb(0, 0, 0); */
  position: absolute;
  top: 2px;
  right: 3px;
  cursor:pointer;
}
/* 弹窗框架 */
.alterTitle2{
  width:160px;
  height: 30px;
  position: relative;
  left: 2px;
  /* background-color: aqua; */
}
.titleIcon3{
  width: 19px;
  height: 20px;
  /* background-color: aquamarine; */
  background-image: url('../img/mode.svg');
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
.alterContent2{
  width: 180px;
  height: 120px;
  /* background-color: beige; */
  position: relative;
  top: 6px;
  left: 7px;
  overflow: auto;
  white-space:nowrap;
  clip-path: polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%);/**截取多边形 */
}
.clipBorder2{
  width: 30px;
  height: 20px;
  position: absolute;
  top: -14px;
  right: -10px;
  /* background-color: red; */
  transform: rotate(35deg);
}
.alterBt2{
  width: 100px;
  height: 30px;
  /* background-color: aquamarine; */
  position: relative;
  top: 10px;
  left: 50px;
  text-align: center;
}
.alterBtText{
  line-height: 30px;
}

</style>
  