<template>
    <div>
        <button class="menu_bt" @click="importDeployFile">导入</button>
        <button class="menu_bt">更新</button>
        <button class="menu_bt" v-if="showDate=='Arduion'" @click="switchingMode">Arduion模式</button>
        <button class="menu_bt" v-else @click="switchingMode">Python模式</button>
        <button class="menu_bt" @click="initDeployFile">初始化</button>
    </div>
</template>
<script>

  export default{
    components:{
      //注册
      },    
      data(){
        return{
         context:"头部导航",
         showDate:"Arduion"
        }
      },
      methods:{
        //切换模式
        switchingMode(){
          if(this.showDate === 'Arduion'){
            this.showDate ='Python'
          }else if(this.showDate ==='Python'){
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

      
      }
  }
  
</script>
<style >
  .menu_bt{
    margin-right: 10px;
  }
</style>
  