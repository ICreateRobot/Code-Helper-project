
<template>
    <div class="moduleAlter">
        <div class="closeAlter" @click="closeAlter"></div>
        <div class="alterTitle2">
          <!-- 标题 -->
          <div class="titleIcon"></div>
          <div class="titleText">
              <span class="textNotCopy">模式</span>
          </div>
        </div>

        <div class="alterContent2">
          <!-- 内容 -->
            <div >
              <input type="radio" id="module1" value="module1" v-model="atModule">
              <label for="module1"> <span class="textNotCopy">arduinoqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq</span></label>
            </div>
            <div >
              <input type="radio" id="module2" value="module2" v-model="atModule">
              <label for="module2"> <span class="textNotCopy">arduino</span></label>
            </div>
            <div >
              <input type="radio" id="module3" value="module3" v-model="atModule">
              <label for="module3"> <span class="textNotCopy">arduino</span></label>
            </div>
            <div >
              <input type="radio" id="module4" value="module4" v-model="atModule">
              <label for="module4"> <span class="textNotCopy">arduino</span></label>
            </div>
            <div >
              <input type="radio" id="module5" value="module5" v-model="atModule">
              <label for="module5"> <span class="textNotCopy">arduino</span></label>
            </div>

        </div>

        <div class="alterBt2">
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
         context:"选择模式",
         atModule:"",//当前模式
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
.moduleAlter{
  width: 200px;
  height: 200px;
  background-color: rgb(4, 0, 255);
  position: absolute;
  top: 25%;
  left: 25%;
  z-index: 3;
  box-shadow:0px 0px 20px rgb(255, 255, 255);
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
.alterTitle2{
  width:160px;
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
.alterContent2{
  width: 180px;
  height: 120px;
  background-color: beige;
  position: relative;
  top: 6px;
  left: 5px;
  overflow: auto;
  white-space:nowrap;
}
.alterBt2{
  width: 100px;
  height: 30px;
  background-color: aquamarine;
  position: relative;
  top: 10px;
  left: 50px;
  text-align: center;
}
.alterBtText{
  line-height: 30px;
}

</style>
  