
<template>
    <div class="setAlter">
        <div class="closeAlter" @click="closeAlter"></div>
        <div class="alterTitle">
          <!-- 标题 -->
          <div class="titleIcon"></div>
          <div class="titleText">
              <span class="textNotCopy">设置</span>
          </div>
        </div>

        <div class="alterContent">
          <!-- 内容 -->
          <div >
            <div class="selectBt_off"></div>
            <div class="languageSetting">
              <span class="textNotCopy">语言</span>
            </div>
           
          </div>
        </div>

        <div class="alterBt">
          <!-- 按键 -->
          <span class="alterBtText textNotCopy">确定</span>
        </div>
    </div>
   
</template>
<script>
  export default{
    components:{
      //注册
      },  
      mounted() {
        
      },  
      data(){
        return{
         context:"设置页面",
         
        }
      },
      methods:{
        closeAlter(){
          this.$emit("closeAlter");
        },
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
.selectBt_off{
  width: 6px;
  height: 6px;
  /* background-color: black; */
  border-top: 3px solid black; 
  border-right: 3px solid black;
  float: left;
  transform: rotate(45deg);
  position: relative;
  left: 6px;
  top: 7px;
}
.selectBt_on{
  width: 6px;
  height: 6px;
  /* background-color: black; */
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

</style>
  