

<template>
  <div id="menu">
    <Menu />
  </div>
  <div>
    <Showdata/>
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
    }
}

// import TheWelcome from './components/TheWelcome.vue'
</script>
<style >
#menu{
  margin-bottom: 10px;
}
</style>
