
<template>
    <div class="setAlter" :class="(configFileData.style == 'style1') ? 'backgroundColor1':(configFileData.style == 'style2'?'backgroundColor2':'backgroundColor3')">
        <div class="closeAlter" @click="closeAlter" ></div>
        <div class="alterTitle" :class="(configFileData.style == 'style1') ? 'textColorStyle1':(configFileData.style == 'style2'?'textColorStyle2':'textColorStyle3')">
          <!-- 标题 -->
          <div class="titleIcon2"></div>
          <div class="titleText">
              <span class="textNotCopy">{{languageData.ui_text_setting}}</span>
          </div>
        </div>

        <div class="alterContent3" :class="(configFileData.style == 'style1') ? 'dataBackgroundColor1':(configFileData.style == 'style2'?'dataBackgroundColor2':'dataBackgroundColor3')">
          <!-- 内容 -->
          <!-- 语言 -->
          <div class="subSeclet" :class="(configFileData.style == 'style1') ? 'textColorStyle1':(configFileData.style == 'style2'?'textColorStyle2':'textColorStyle3')" >
            <div class="selectBt" :class="languageSettingOf ? 'selectBt_on'+returnOnData(configFileData.style) : 'selectBt_off'+returnOnData(configFileData.style)" @click="setSelectlanguageState()"></div>
            <div class="selectBt languageSetting" @click="setSelectlanguageState()">
              <span class="textNotCopy">{{languageData.ui_text_language}}</span>
            </div>
            <div class="languageContent" :style="getLanguageState()">
              <div class="languageSelect">
                <input type="radio" id="Chinese" value="Chinese" v-model="language">
                <label for="Chinese"> <span class="textNotCopy">{{languageData.ui_text_chinese}}</span></label>
              </div>
              <div class="languageSelect">
                <input type="radio" id="English" value="English" v-model="language">
                <label for="English"> <span class="textNotCopy">{{languageData.ui_text_english}}</span></label>
              </div>
            </div>
          </div>
           <!-- 风格 -->
          <div class="subSeclet" :class="(configFileData.style == 'style1') ? 'textColorStyle1':(configFileData.style == 'style2'?'textColorStyle2':'textColorStyle3')">
            <div class="selectBt" :class="viewStyleSettingOf ? 'selectBt_on'+returnOnData(configFileData.style) : 'selectBt_off'+returnOnData(configFileData.style)" @click="setSelectStyleState()"></div>
            <div class="selectBt languageSetting" @click="setSelectStyleState()">
              <span class="textNotCopy">{{languageData.ui_text_style}}</span>
            </div>
            <div class="styleContent" :style="getStyleState()">
              {{ viewStyle }}
              <div class="styleSelect">
                <!-- 酷黑 -->
                <input type="radio" id="style1" value="style1" v-model="viewStyle" :disabled="!viewDisabled">
                <label for="style1"> <span class="textNotCopy">{{languageData.ui_text_coolBlack}}</span></label>
              </div>
              <div class="styleSelect">
                <!-- 清新 -->
                <input type="radio" id="style2" value="style2" v-model="viewStyle" :disabled="!viewDisabled">
                <label for="style2"> <span class="textNotCopy">{{languageData.ui_text_fresh}}</span></label>
              </div>
              <div class="styleSelect">
                <!-- 欢快 -->
                <input type="radio" id="style3" value="style3" v-model="viewStyle" :disabled="!viewDisabled">
                <label for="style3"> <span class="textNotCopy">{{languageData.ui_text_lively}}</span></label>
              </div>
            </div>
          </div>
           <!-- 版本更新 -->
          <div class="subSeclet" :class="(configFileData.style == 'style1') ? 'textColorStyle1':(configFileData.style == 'style2'?'textColorStyle2':'textColorStyle3')">
            <div class="selectBt" :class="detectionUpdate ? 'selectBt_on'+returnOnData(configFileData.style) : 'selectBt_off'+returnOnData(configFileData.style)" @click="setUpdateState()"></div>
            <div class="selectBt languageSetting" @click="setUpdateState()">
              <span class="textNotCopy">{{languageData.ui_text_versionUpdata}}</span>
            </div>
            <div class="updateContent" :style="getUpdateState()">
              <span>{{languageData.ui_text_currentVersion}}:
                <span v-if="version != '出错了'">{{ version }}</span>
                <span v-else>{{languageData.ui_text_requestNotResponded}}</span>
                <span v-if="version == -1">{{languageData.ui_text_appIsNotCorrectInstallation}}</span>
              </span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span class="updateBt" @click="updateClick()">
                <!-- <a href="">检查更新</a> -->
                <b class="textNotCopy">{{languageData.ui_text_checkForUpdates}}</b>
              </span>
            </div>
          </div>
          <!-- 关于我们 -->
          <div class="subSeclet" :class="(configFileData.style == 'style1') ? 'textColorStyle1':(configFileData.style == 'style2'?'textColorStyle2':'textColorStyle3')">
            <div class="selectBt" :class="AboutUsOf ? 'selectBt_on'+returnOnData(configFileData.style) : 'selectBt_off'+returnOnData(configFileData.style)" @click="setAboutState()"></div>
            <div class="selectBt languageSetting" @click="setAboutState()">
              <span class="textNotCopy">{{languageData.ui_text_aboutUs}}</span>
            </div>
            <div class="aboutContent" :style="getAboutState()">
              <span>{{languageData.ui_text_appName}}：{{ appName }}</span>&nbsp;&nbsp;
              <span @click="openIcrobotWeb()" class="selectBt"><b>{{languageData.ui_text_learnMore}}</b></span>&nbsp;&nbsp;|&nbsp;&nbsp;
              <span @click="saveModuleFile()" class="selectBt"><b>{{languageData.ui_text_downloadTemplate}}</b></span>
            </div>
          </div>
        </div>

        <div class="alterBt btSuspensionEvent" @click="setLanguageAndStyle()" :class="(configFileData.style == 'style1') ? 'alterBtBg1':(configFileData.style == 'style2'?'alterBtBg1':'alterBtBg1')">
          <!-- 按键 -->
          <span class="alterBtText textNotCopy" :class="(configFileData.style == 'style1') ? 'textColorStyle1':(configFileData.style == 'style2'?'textColorStyle2':'textColorStyle3')">{{languageData.ui_text_confirm}}</span>
        </div>
    </div>
   
</template>
<script>
  export default{
    props: ['AppName','appVersion','languageData','configFileData'], // 声明接收的属性名为"data"
    components:{
      //注册
      },  
      mounted() {
        this.getAppVersion();
        this.initData();
      },  
      data(){
        return{
         context:"设置页面",
         languageSettingOf:false,//语言是否打开
         language:"",//当前语言
         viewStyleSettingOf:false,//风格是否打开
         viewStyle:"",//当前风格
         detectionUpdate:false,//检查更新是否打开
         version:'出错了',//版本号
         appName:"",//软件名称
         AboutUsOf:false,//关于我们是否打开
         viewDisabled:true,//风格是否可选
        }
      },
      methods:{
        closeAlter(){
          this.$emit("closeAlter");
        },
        getLanguageState(){
          // 是否打开语言选择
          if(this.languageSettingOf){
            return 'height: auto;'
          }else{
            return 'height: 0px'
          }
        },
        setSelectlanguageState(){
          this.languageSettingOf = !this.languageSettingOf;
        },
        getStyleState(){
           // 是否打开风格选择
           if(this.viewStyleSettingOf){
            return 'height: auto;'
          }else{
            return 'height: 0px'
          }
        },
        setSelectStyleState(){
          this.viewStyleSettingOf = !this.viewStyleSettingOf;
        },
        getUpdateState(){
           // 是否打开检查更新
           if(this.detectionUpdate){
            return 'height: auto;'
          }else{
            return 'height: 0px'
          }
        },
        setUpdateState(){
          this.detectionUpdate = !this.detectionUpdate;
        },
        getAppVersion(){
          this.version = this.appVersion;
          this.appName = this.AppName;
        },
        returnOnData(strStyle){
          // 返回样式最后一位
          return strStyle.charAt(strStyle.length - 1);
        },
        updateClick(){
          this.$emit("check_for_updates");
          // alert("该功能正在开发，敬请期待")
        },
        getAboutState(){
           // 是否打开关于我们
           if(this.AboutUsOf){
            return 'height: auto;'
          }else{
            return 'height: 0px'
          }
        },
        setAboutState(){
          this.AboutUsOf = !this.AboutUsOf;
        },
        openIcrobotWeb(){
          window.ipcRenderer.send('openNewWindows');
        },
        saveModuleFile(){
          window.ipcRenderer.send('saveModuleFile');
        },
        // 页面数据初始化
        initData(){
          //初始化语言
          if(this.configFileData.language == "中文"){
            this.language = 'Chinese'
          }else{
            this.language = 'English'
          }

          //初始化页面风格
          this.viewStyle=this.configFileData.style;
          // console.log("风格：",this.viewStyle)
          

        },
        setLanguageAndStyle(){
          this.configFileData.language = this.language;
          this.configFileData.style = this.viewStyle;
          let LanguageAndStyle = new Array();
          LanguageAndStyle.push(this.language);
          LanguageAndStyle.push(this.viewStyle);
          // console.log("数据1：",this.LanguageAndStyle);
          window.ipcRenderer.send('setLanguageAndStyle',LanguageAndStyle);
        }

      }
  }
  
</script>
<style >
/* 弹窗统一框 */
.setAlter{
  width: 300px;
  height: 300px;
  background-color: rgb(0, 253, 51);
  position: absolute;
  top: 25%;
  left: 18%;
  z-index: 3;
  box-shadow:0px 0px 20px rgb(0, 0, 0);
  overflow: auto;
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
.alterTitle{
  width:260px;
  height: 30px;
  /* background-color: aqua; */
}
.titleIcon2{
  width: 20px;
  height: 20px;
  /* background-color: aquamarine; */
  background-image: url('../../img/setting.svg');
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
.alterContent3{
  width: 280px;
  height: 200px;
  background-color: beige;
  position: relative;
  top: 6px;
  left: 8px;
  overflow: auto;
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
.selectBt{
  cursor:pointer;
}
.selectBt_off1{
  width: 6px;
  height: 6px;
  border-top: 3px solid rgb(20, 197, 144); 
  border-right: 3px solid rgb(20, 197, 144);
  float: left;
  transform: rotate(45deg);
  position: relative;
  left: 6px;
  top: 7px;
}
.selectBt_on1{
  width: 6px;
  height: 6px;
  border-bottom: 3px solid rgb(20, 197, 144); 
  border-right: 3px solid rgb(20, 197, 144);
  float: left;
  transform: rotate(45deg);
  position: relative;
  left: 6px;
  top: 5px;
}

.selectBt_off2{
  width: 6px;
  height: 6px;
  border-top: 3px solid rgb(255, 255, 255); 
  border-right: 3px solid rgb(255, 255, 255);
  float: left;
  transform: rotate(45deg);
  position: relative;
  left: 6px;
  top: 7px;
}
.selectBt_on2{
  width: 6px;
  height: 6px;
  border-bottom: 3px solid rgb(255, 255, 255); 
  border-right: 3px solid rgb(255, 255, 255);
  float: left;
  transform: rotate(45deg);
  position: relative;
  left: 6px;
  top: 5px;
}

.selectBt_off3{
  width: 6px;
  height: 6px;
  border-top: 3px solid black; 
  border-right: 3px solid black;
  float: left;
  transform: rotate(45deg);
  position: relative;
  left: 6px;
  top: 7px;
}
.selectBt_on3{
  width: 6px;
  height: 6px;
  border-bottom: 3px solid black; 
  border-right: 3px solid black;
  float: left;
  transform: rotate(45deg);
  position: relative;
  left: 6px;
  top: 5px;
}

.languageSetting{
  float: left;
  position: relative;
  left: 12px;
}
.languageContent{
  height: auto;
  position: relative;
  top: 22px;
  left: -30px;
  overflow: hidden;
  /* background-color: black; */
}
.languageSelect{
  float: left;
}
.subSeclet{
  position: relative;
  float:none;
  /* padding-top: 2px; */

}
.styleContent{
  margin-top: 22px;
  overflow: hidden;
  position: relative;
  /* background-color: rgb(244, 244, 244); */
  top: 22px;
  left: -30px;

}
.styleSelect{
  float: left;
}
.updateContent{
  margin-top: 22px;
  overflow: hidden;
  position: relative;
  /* background-color: rgb(244, 244, 244); */
  top: 22px;
  left: -55px;
  font-size: 14px;
}
.updateBt{
  cursor:pointer;
}
.aboutContent{
  margin-top: 22px;
  overflow: hidden;
  position: relative;
  /* background-color: rgb(0, 0, 0); */
  top: 22px;
  left: -55px;
  font-size: 14px;
}

</style>
  