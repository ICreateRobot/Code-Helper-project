<!-- 顶部信息 -->
<!-- 标题按钮栏 -->
<template>

    <div class="appTitle" :class="(configFileData.style == 'style1') ? 'textColorStyle1':(configFileData.style == 'style2'?'textColorStyle2':'textColorStyle3')">
        <div class="appImg"  @click="setClickNumber"></div>
        <div class="appName">
            <span class="textNotCopy">{{ appName }}</span>
        </div>
        <div class="CurrentMode">
            <span class="textNotCopy">
             <b>{{ configFileData.mode }}</b> {{languageData.ui_text_mode}}
            </span>
        </div>
    </div>
    <div class="appExit btSuspensionEvent">
       <div class="exitBt" @click="exitApp"></div>
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
         clickNumber:0//点击次数
        }
      },
      methods:{
        exitApp(){
          window.ipcRenderer.send('close');
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
    right: 20px;
    top: 10px;
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
  background-image: url('../img/close.svg');
  position: relative;
  top:6px
  /* background-color: brown; */
}

</style>
  