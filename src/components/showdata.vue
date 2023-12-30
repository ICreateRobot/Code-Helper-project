<template>
  <dev>
    {{context}}
    <button @click="readXML">获取pdf</button>
    <button @click="updataConfigFile">通信</button>
    <div class="module_main" v-for="(moduledata,index) in showDataOB" :key="index">
      <!-- 模块 -->
        <p>模块:{{ moduledata.moduleName }}</p>
        <div class="module_sub" v-for="(subModuledata,index_sub) in moduledata.submodule" :key="index_sub" >
          <!-- 子模块 -->
            <p>子模块:{{ subModuledata.submoduleName }}</p>
            <div class="module_code"  v-for="(subModulecode,index_code) in subModuledata.codes" :key="index_code" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
              <!-- 代码 -->
              <span>
                {{ subModulecode.code }} // {{ subModulecode.explain }}<br>
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
       showDataOB:""
      }
    }
    ,
    methods:{
      readXML() {
        // 创建一个新的xhr对象
        // console.log("进入方法");
        let xhr = null;
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest()
        } else {// IE
          xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }
        xhr.open('GET', "./config_test.xml", false);
        xhr.overrideMimeType('text/html;charset=utf-8');
        xhr.send(null);
        const xmlData = xhr.responseText;
        // console.log("asdcfa", xmlData)
        // 将 XML 转换为 JSON
        const jsonData = convert.xml2json(xmlData, { compact: true, spaces: 4 });
        const newdata = JSON.parse(jsonData)['Workbook']['Worksheet']['Table']['Row']//读取配置
        const showdata = new Array();

        for (let index in newdata) {
          if (index >= 1) {
            if (showdata.length > 0) {//判断数组是否为空
              // console.log("数组q",showdata.length)
              let moduleId = newdata[index]['Cell'][0]["Data"]['_text'];
              let submoduleId = newdata[index]['Cell'][1]["Data"]['_text'];
              let addModule = true;//是否新增模块标志位
              for (let Ob in showdata) {
                if (showdata[Ob].moduleName == moduleId) {//模块相同
                  let addSubmodule = true;//是否新增子模块标志位
                  for (let index in showdata[Ob].submodule) {
                    // console.log("数组11", showdata[Ob].submodule[index].submoduleName)
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
                      submoduleName: newdata[index]['Cell'][1]["Data"]['_text'],
                      codes: [{
                        code: newdata[index]['Cell'][2]["Data"]['_text'],//代码
                        explain: newdata[index]['Cell'][3]["Data"]['_text']//注释
                      }]
                    });
                  }
                  addModule = false;//已有模块

                }
                // console.log("数组", showdata[Ob])
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
        let codeModule = {
          moduleName: newdata[index]['Cell'][0]["Data"]['_text'],//模块
          submodule: [{
            submoduleName: newdata[index]['Cell'][1]["Data"]['_text'],//子模块
            codes: [{
              code: newdata[index]['Cell'][2]["Data"]['_text'],//代码
              explain: newdata[index]['Cell'][3]["Data"]['_text']//注释
            }]
          }]
        }
        return codeModule;
      },
      updataConfigFile(){//更新文件名称    "/config_test.xml"
       
        console.log("前端点击");
        window.ipcRenderer.send('close');

      },
      SelectedText(event){//获取文本内容
        console.log("a:",event.target.innerText)
      },
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
      }


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
</style>
