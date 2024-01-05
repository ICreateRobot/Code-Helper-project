

<template>
  <div id="menu">
    <Menu @customEvent="setDataType" />
    <div id="conceal" @click="concealClick"></div>
  </div>
  
  <div id="showDataPage_div">
    <Showdata ref="showDataPage"/>
  </div>
 
  
</template>
<script>
import Showdata from './components/showdata.vue'
import Menu from './components/menu.vue'
export default{
  
  components:{
    Menu,//导航
    Showdata//数据
  },    
    data(){
      return{
       context:"显示内容",
       isClickCount:0,
       isDelay:false,
      }
    },
    methods:{
      setDataType(data){
        if (data == "Python") {
          //转换为python模式
          this.$refs.showDataPage.setShowDataType();    
        }else if(data == "Arduion"){
          //准换为arduino模式
          this.$refs.showDataPage.setShowDataType(); 
        }
      },
      concealClick(){
        //隐藏功能点击事件
        this.isClickCount++;
        console.log(this.isClickCount);
        if(this.isClickCount == 1){
          this.initIsClickCount();//开启定时任务
        }
        if(this.isClickCount == 5){
          this.$refs.showDataPage.setCopyDataState(); 
        }
      },
      initIsClickCount(){
        // 隐藏事件延时初始化
        if(!this.isDelay){//未开启延时任务
          this.isDelay = !this.isDelay;//开启延时任务
          setTimeout(() => {
            this.isClickCount =0 ;//隐藏任务初始化点击次数
            this.isDelay = !this.isDelay;//延时任务完成
          }, 3000); 
        }
      },

    }
}

// import TheWelcome from './components/TheWelcome.vue'
</script>
<style >
#menu{
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  position: fixed;
  top: 0%;
  background-color: rgb(255, 255, 255);
  z-index: 1;
}
#showDataPage_div{
  position: relative;
  top: 30px;
}
#conceal{
  width: 20px;
  height: 20px;
  position: fixed;
  /* background-color: rgb(247, 88, 88); */
  z-index: 1;
  top: 0px;
  right: 15px;
}

</style>
