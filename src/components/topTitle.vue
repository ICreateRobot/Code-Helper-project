<!-- 顶部信息 -->
<!-- 标题按钮栏 -->
<template>

    <div class="appTitle">
        <div class="appImg"></div>
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
       <button @click="exitApp"><span class="textNotCopy">退出</span></button>
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
         
        }
      },
      methods:{
        exitApp(){
        console.log("带年纪");
          window.ipcRenderer.send('close');
        },
      }
  }
  
</script>
<style >
.appTitle{
    width: 300px;
    height: 45px;
    background-color: rgb(75, 75, 29);
    position: absolute;
    top: 5px;
    left: 5px;
}
.appExit{
    position: absolute;
    right: 20px;
    top: 10px;
}
.appImg{
    width: 23px;
    height: 25px;
    /* background-color: beige; */
    background-image: url('./img/icon.svg');

    position: absolute;
    left: 10px;
    top: 5px;
     /* 拖动窗口 */
     -webkit-app-region: drag
}
.appName{
    width: 120px;
    height: 29px;
    line-height:29px;
    background-color: rgb(255, 94, 0);
    position: absolute;
    left: 50px;
    top: 8px;
}
.CurrentMode{
  width: 120px;
  height: 29px;
  line-height:29px;
  background-color: rgb(106, 106, 106);
  position: absolute;
  left: 172px;
  top: 8px;
  font-size: 12px;
}

</style>
  