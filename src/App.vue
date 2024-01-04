

<template>
  <div id="menu">
    <Menu @customEvent="setDataType" />
  </div>
  <div class="overflow_div">
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
       context:"显示内容"
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
    }
}

// import TheWelcome from './components/TheWelcome.vue'
</script>
<style >
#menu{
  margin-bottom: 10px;
}
.overflow_div{
  overflow-y: hidden;
}
</style>
