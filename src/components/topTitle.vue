<!-- 顶部信息 -->
<!-- 标题按钮栏 -->
<template>

    <div class="appTitle" :class="(configFileData.style == 'style1') ? 'textColorStyle1':(configFileData.style == 'style2'?'textColorStyle2':'textColorStyle3')">
        <div class="appImg"  @click="setClickNumber"></div>
        <div class="appName">
            <span class="textNotCopy" :class="(configFileData.style == 'style1') ? 'titleTextColorStyle1':(configFileData.style == 'style2'?'titleTextColorStyle2':'titleTextColorStyle3')">{{ appName }}</span>
        </div>
        <div class="CurrentMode">
            <span class="textNotCopy">
             <b>{{ configFileData.mode }}</b> {{languageData.ui_text_mode}}
            </span>
        </div>
    </div>
    <div class="appExit btSuspensionEvent">
      <div class="but_top" :class="(configFileData.style == 'style1') ? 'but_top1':(configFileData.style == 'style2'?'but_top2':'but_top3')" @click="setWindowsTop('notTop')" v-if="windowsTopState"> </div>
      <div class="but_not_top" :class="(configFileData.style == 'style1') ? 'but_not_top1':(configFileData.style == 'style2'?'but_not_top2':'but_not_top3')" @click="setWindowsTop('top')" v-else> </div>
      <div class="windowsMini" :class="(configFileData.style == 'style1') ? 'windowsMini1':(configFileData.style == 'style2'?'windowsMini2':'windowsMini3')" @click="setWindowsMini">—</div>
      <div class="windowsMax"
       :class="windowsMaxState?
        (configFileData.style == 'style1') ? 'windowsMaxBg1_1':(configFileData.style == 'style2'?'windowsMaxBg1_2':'windowsMaxBg1_3')
        :
        (configFileData.style == 'style1') ? 'windowsMaxBg2_1':(configFileData.style == 'style2'?'windowsMaxBg2_2':'windowsMaxBg2_3')" 
       
       
       @click="setWindowsMax"></div>
      <div class="exitBt" :class="(configFileData.style == 'style1') ? 'exitBt1':(configFileData.style == 'style2'?'exitBt2':'exitBt3')" @click="exitApp"></div>
    </div>
</template>
<script>
  export default{
    props:['appName','languageData','configFileData'],
    components:{
      //注册
      },  
      mounted() {
        
      },  
      data(){
        return{
         context:"头部导航",
         style:"style1",
         clickNumber:0,//点击次数
         windowsMaxState:false,//窗口是否全屏
         windowsTopState:false//窗口是置顶
        }
      },
      methods:{
        exitApp(){
          window.ipcRenderer.send('close');
        },
        setWindowsMini(){
          window.ipcRenderer.send("windowsMini");
        },
        setWindowsMax(){
          this.windowsMaxState = !this.windowsMaxState;
          window.ipcRenderer.send("windowsMax");
        },
        setWindowsTop(topState){
          console.log("状态1",topState);
          if(topState=="top"){
            this.windowsTopState = true;
            window.ipcRenderer.send("setWindowTop");
          }
          if(topState=="notTop"){
            this.windowsTopState = false;
            window.ipcRenderer.send("setWindowNotTop");
          }
        },
        setClickNumber(){
          console.log("点击",this.clickNumber);
          if (this.clickNumber <= 5) {
            if(this.clickNumber == 0){
                // 第一次点击，启动延时清零
                setTimeout(() => {
                  this.clickNumber = 0;
                }, 1000); // 设置延迟时间为3秒（单位为毫秒）
              }
            this.clickNumber++;
            
          }else{
            
            let newReproducibleOrNot = !this.configFileData.reproducibleOrNot;
            console.log("点击后：",newReproducibleOrNot);
            window.ipcRenderer.send('setReproducibility',newReproducibleOrNot);
          }

          
          
        }
      }
  }
  
</script>
<style >
.appTitle{
    width: 300px;
    height: 45px;
    /* background-color: rgb(75, 75, 29); */
    position: absolute;
    top: 5px;
    left: 5px;
    /* color: rgb(224,230,222); */
     /* 拖动窗口 */
     -webkit-app-region: drag;
}
.appExit{
    position: absolute;
    right: 10px;
    top: 5px;
}
.but_top{
  width: 14px;
  height: 20px;
  position: relative;
  top:6px;
  right: 15px;
  float: left;
  background-repeat: no-repeat; /* 防止图片重复 */
  background-position: center; /* 将图片居中对齐 */
  background-size: cover; /* 确保图片完全显示且不会被拉伸或压缩 */
}
.but_top1{
  background-image: url('../img/notTop.svg');
}
.but_top2{
  background-image: url('../img/notTop02.svg');
}
.but_top3{
  background-image: url('../img/notTop03.svg');
}
.but_not_top{
  width: 20px;
  height: 20px;
  position: relative;
  top:6px;
  right: 15px;
  float: left;
  background-repeat: no-repeat; /* 防止图片重复 */
  background-position: center; /* 将图片居中对齐 */
  background-size: cover; /* 确保图片完全显示且不会被拉伸或压缩 */
}
.but_not_top1{
  background-image: url('img/top.svg');
}
.but_not_top2{
  background-image: url('../img/top02.svg');
}
.but_not_top3{
  background-image: url('../img/top03.svg');
}
.appImg{
    width: 30px;
    height: 32px;
    /* background-color: beige; */
    background-image: url('../img/code2.png');
    position: absolute;
    left: 10px;
    top: 5px;
    background-repeat: no-repeat; /* 防止图片重复 */
   background-position: center; /* 将图片居中对齐 */
   background-size: cover; /* 确保图片完全显示且不会被拉伸或压缩 */
    -webkit-app-region: no-drag;
}
.appName{
    width: 120px;
    height: 29px;
    line-height:29px;
    /* background-color: rgb(255, 94, 0); */
    font-size: 18px;
    position: absolute;
    left: 50px;
    top: 8px;
}
.CurrentMode{
  width: 120px;
  height: 24px;
  line-height:24px;
  /* background-color: rgb(106, 106, 106); */
  position: absolute;
  left: 172px;
  top: 12px;
  font-size: 12px;
}
.exitBt{
  width: 20px;
  height: 20px;
  position: relative;
  top:6px;
  float: left;
  /* background-color: brown; */
}


.windowsMini{
  width: 20px;
  height: 20px;
  /* background-color: red; */
  position: relative;
  right: 10px;
  top: 6px;
  float: left;
}
.windowsMini1{
  color: rgb(47, 190, 146);
}
.windowsMini2{
  color: rgb(255, 255, 255);
}
.windowsMini3{
  color: rgb(2, 2, 2);
}
.windowsMax{
  width: 20px;
  height: 20px;
  /* background-color: red; */
  position: relative;
  background-repeat: no-repeat; /* 防止图片重复 */
   background-position: center; /* 将图片居中对齐 */
   background-size: cover; /* 确保图片完全显示且不会被拉伸或压缩 */
  right: 5px;
  top: 6px;
  float: left;
  /* background-color: white; */
}
.windowsMaxBg1_1{
  background-image: url('../img/recoverBt.png');
}
.windowsMaxBg2_1{
  background-image: url('../img/maxBt.png');
}
.windowsMaxBg1_2{
  background-image: url('../img/recoverBt02.svg');
}
.windowsMaxBg2_2{
  width: 15px;
  height: 15px;
  margin-top: 3px;
  background-image: url('../img/maxBt02.svg');
}
.windowsMaxBg1_3{
  width: 18px;
  height: 18px;
  background-image: url('../img/recoverBt03.svg');
}
.windowsMaxBg2_3{
  width: 15px;
  height: 15px;
  margin-top: 3px;
  background-image: url('../img/maxBt03.svg');
}

/**标题颜色 */
.titleTextColorStyle3{
  /**
  生成网站：https://kusurin.icu/tools/StrokeGenerator/
  */
color:#ffffff;
text-shadow: 3px 0px rgb(235, 67, 116), 2.943px 0.585px rgb(235, 67, 116), 2.7720px 1.149px rgb(235, 67, 116), 2.493px 1.6680px rgb(235, 67, 116), 2.121px 2.121px rgb(235, 67, 116), 1.6680px 2.493px rgb(235, 67, 116), 1.149px 2.7720px rgb(235, 67, 116), 0.585px 2.943px rgb(235, 67, 116), 0px 3px rgb(235, 67, 116), -0.585px 2.943px rgb(235, 67, 116), -1.149px 2.7720px rgb(235, 67, 116), -1.6680px 2.493px rgb(235, 67, 116), -2.121px 2.121px rgb(235, 67, 116), -2.493px 1.6680px rgb(235, 67, 116), -2.7720px 1.149px rgb(235, 67, 116), -2.943px 0.585px rgb(235, 67, 116), -3px 0px rgb(235, 67, 116), -2.943px -0.585px rgb(235, 67, 116), -2.7720px -1.149px rgb(235, 67, 116), -2.493px -1.6680px rgb(235, 67, 116), -2.121px -2.121px rgb(235, 67, 116), -1.6680px -2.493px rgb(235, 67, 116), -1.149px -2.7720px rgb(235, 67, 116), -0.585px -2.943px rgb(235, 67, 116), 0px -3px rgb(235, 67, 116), 0.585px -2.943px rgb(235, 67, 116), 1.149px -2.7720px rgb(235, 67, 116), 1.6680px -2.493px rgb(235, 67, 116), 2.121px -2.121px rgb(235, 67, 116), 2.493px -1.6680px rgb(235, 67, 116), 2.7720px -1.149px rgb(235, 67, 116), 2.943px -0.585px rgb(235, 67, 116);
  /* text-shadow: 3px 1px 1px #ffffff; */
}
</style>
  