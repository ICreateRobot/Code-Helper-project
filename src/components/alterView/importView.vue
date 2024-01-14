
<template>
    <div class="importAlter">
      
        <div class="closeAlter" @click="closeAlter">
          <!-- 关闭 -->
        </div>

        <div class="alterTitle">
          <!-- 标题 -->
          <div class="titleIcon"></div>
          <div class="titleText">
              <span class="textNotCopy">导入</span>
          </div>
        </div>

        <div class="alterContent">
          <!-- 内容 -->
          <div class="selectContent">
            <div>
              <input type="radio" id="option1" value="option1" v-model="importType" :disabled="importNumber>=5">
              <label for="option1"> <span class="textNotCopy">导入</span></label>
              <span class="importNumberText textNotCopy">(可导入数量{{importNumber}}/5)</span>
            </div>
            <div>
              <input type="radio" id="option2" value="option2" v-model="importType">
              <label for="option2"><span class="textNotCopy">替换</span></label>
            </div>
            

            <div class="replaceOptions"  >
              <div >
                <input type="radio" id="module1" value="module1" v-model="replaceModule" :disabled="importType != 'option2'">
                <label for="module1"> <span class="textNotCopy">arduino</span></label>
              </div>
              <div >
                <input type="radio" id="module2" value="module2" v-model="replaceModule" :disabled="importType != 'option2'">
                <label for="module3"><span class="textNotCopy">pythen</span></label>
              </div>
              <div >
                <input type="radio" id="module2" value="module2" v-model="replaceModule" :disabled="importType != 'option2'">
                <label for="module3"><span class="textNotCopy">pythen</span></label>
              </div>
              <div >
                <input type="radio" id="module2" value="module2" v-model="replaceModule" :disabled="importType != 'option2'">
                <label for="module3"><span class="textNotCopy">pythen</span></label>
              </div>
              <div >
                <input type="radio" id="module2" value="module2" v-model="replaceModule" :disabled="importType != 'option2'">
                <label for="module3"><span class="textNotCopy">pythen</span></label>
              </div>


              
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
         context:"导入页面",
         importType:'option1',//默认导入
         replaceModule:'module1',//默认替换名称
         importNumber:5,//已导入数量
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
.importAlter{
  width: 300px;
  height: 280px;
  background-color: red;
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
.selectContent{
  position: relative;
  top: 20px;
  left: 10px;
}
.replaceOptions{
    width: 220px;
    height: 120px;
    position: relative;
    top: 5px;
    left: 20px;
    background-color: rgb(143, 255, 152);
}
.importNumberText{
  color: rgb(154, 154, 154);
  font-size: 12px;
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
</style>
  