<template>
  <dev>
    <!-- {{context}} -->
    <!-- <button @click="readXML">获取pdf</button> -->
    <!-- <button @click="updataConfigFile">通信</button> -->
      <!-- 点击按钮触发选择文件 -->
      <!-- <button @click="updataConfigFile">选择文件</button> -->
      <!-- <p v-if="selectedFileName !== ''" class="selected-filename">选择文件名{ selectedFileName }}</p> -->

    <div class="module_main" v-for="(moduledata,index) in showDataOB" :key="index">
      <!-- 模块 -->
        <p>模块:{{ moduledata.moduleName }}</p>
        <div class="module_sub" v-for="(subModuledata,index_sub) in moduledata.submodule" :key="index_sub" >
          <!-- 子模块 -->
            <p>子模块:{{ subModuledata.submoduleName }}</p>
            <div class="module_code"  v-for="(subModulecode,index_code) in subModuledata.codes" :key="index_code" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
              <!-- 代码 -->
              <span>
                //{{ subModulecode.explain }}<br>
                {{ subModulecode.code }}<br>
              </span>
            </div>
        </div>
        
     
    </div>
  </dev>
</template>
<script>
import * as convert from 'xml-js';
// import ipcRenderer from 'electron'
  export default{    
    data(){
      return{
       context:"显示内容1",
       pdfUrl:"",
       showDataOB:"",
       selectedFileName: 'asdfg', // 存储已选择的文件名称
      }
    }
    ,
    mounted() {
      this.readXML();
    },
    methods:{
      readXML() {//获取数据
        // 创建一个新的xhr对象
        let xhr = null;
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest()
        } else {// IE
          xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }
        xhr.open('GET', "./config_test.xml", false);//请求配置文件
        xhr.overrideMimeType('text/html;charset=utf-8');
        xhr.send(null);
        const xmlData = xhr.responseText;//接收配置文件

        // 将 XML 转换为 JSON
        const jsonData = convert.xml2json(xmlData, { compact: true, spaces: 4 });
        
        let newdata = null;//读取配置;

        try {
          newdata = JSON.parse(jsonData)['Workbook']['Worksheet']['Table']['Row']//读取配置
        } catch (error) {
          // alert(error)
          window.ipcRenderer.send('deployFileErr');
        }
        console.log("数据",newdata)

        //处理数据
        const showdata = new Array();

        for (let index in newdata) {
          if (index >= 1) {
            if (showdata.length > 0) {//判断数组是否为空
              
              let moduleId = this.getModuleName(index, newdata);
              let submoduleId = this.getSubmoduleName(index, newdata);
              let addModule = true;//是否新增模块标志位
              for (let Ob in showdata) {
                if (showdata[Ob].moduleName == moduleId) {//模块相同
                  let addSubmodule = true;//是否新增子模块标志位

                  for (let index in showdata[Ob].submodule) {
                    if (showdata[Ob].submodule[index].submoduleName == submoduleId) {//子模块相同
                      showdata[Ob].submodule[index].codes.push({
                        code: newdata[index]['Cell'][2]["Data"]['_text'],//代码
                        explain: newdata[index]['Cell'][3]["Data"]['_text']//注释
                      });
                      addSubmodule = false;//已有子模块
                    }
                  }
                  
                  if (addSubmodule) {//是否新增子模块
                    showdata[Ob].submodule.push({
                      submoduleName: this.getSubmoduleName(index, newdata),
                      codes: [{
                        code: newdata[index]['Cell'][2]["Data"]['_text'],//代码
                        explain: newdata[index]['Cell'][3]["Data"]['_text']//注释
                      }]
                    });
                  }
                  addModule = false;//已有模块

                }
                
              }
              
              if (addModule) {//是否新增模块
                showdata.push(this.getStructure(index, newdata));
              }
            } else {
              showdata.push(this.getStructure(index, newdata));
            }

          }
        }
        // console.log("A", showdata)//注释
        // console.log("数据",newdata)
        this.showDataOB = showdata;
      },
      getStructure(index, newdata) {
        console.log("子模块",newdata);
        let codeModule = {
          moduleName: this.getModuleName(index, newdata),//模块
          submodule: [{
            submoduleName: this.getSubmoduleName(index, newdata),//子模块
            codes: [{
              code: this.getCode(index, newdata),//代码
              explain: this.getExplain(index, newdata)//注释
            }]
          }]
        }
        return codeModule;
      },

      //获取名称
      getModuleName(index, newdata){
        let name = "";
        try {
          name=newdata[index]['Cell'][0]["Data"]['_text']//模块名称
        } catch (error) {
          name="";
        }
        return name;
      },
      //获取子名称
      getSubmoduleName(index, newdata){
        let name = "";
        try {
          name=newdata[index]['Cell'][1]["Data"]['_text']//子模块
        } catch (error) {
          name="";
        }
        return name;
      },
      //获取代码
      getCode(index, newdata){
        let name = "";
        try {
          name=newdata[index]['Cell'][2]["Data"]['_text']//子模块
        } catch (error) {
          name="";
        }
        return name;
      },
      //获取注释
      getExplain(index, newdata){
        let name = "";
        try {
          name=newdata[index]['Cell'][3]["Data"]['_text']//注释
        } catch (error) {
          name="";
        }
        return name;
      },









      //选中文本
      handleMouseEnter(event) {
        // 获取到目标元素并修改样式-入
        const targetElement = event.target;
        targetElement.style.setProperty("user-select", "all");
        
        // 可以在这里添加其他自定义样式或效果
      },
      handleMouseLeave(event) {
        // 获取到目标元素并恢复原有样式-出
        const targetElement = event.target;
        targetElement.style.removeProperty("user-select");
        
        // 可以在这里清除之前添加的自定义样式或效果
      },

    }
}
</script>

<style>
.module_main{
  background-color: aqua;
  padding: 5px;
}
.module_sub{
  background-color: aquamarine;
  margin: 5px;
  padding: 5px;
}
.module_code{
  background-color: antiquewhite;
  margin: 5px;
}
.selected-filename {
  color: green;
}
</style>
