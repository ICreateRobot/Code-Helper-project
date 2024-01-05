<template>
  <dev>
    <!-- {{context}} -->
    <!-- <button @click="readXML">获取pdf</button> -->
    <!-- <button @click="updataConfigFile">通信</button> -->
      <!-- 点击按钮触发选择文件 -->
      <!-- <button @click="updataConfigFile">选择文件</button> -->
      <!-- <p v-if="selectedFileName !== ''" class="selected-filename">选择文件名{ selectedFileName }}</p> -->

    <div v-if="showDataType">
      <!-- arduino -->
      <div class="module_main" v-for="(moduledata,index) in showDataOB" :key="index">
        <!-- 模块 -->
        <p class="textNotCopy">模块:{{ moduledata.moduleName }}</p>
        <div class="module_sub" v-for="(subModuledata,index_sub) in moduledata.submodule" :key="index_sub" >
          <!-- 子模块 -->
            <p class="textNotCopy">子模块:{{ subModuledata.submoduleName }}</p>
            <div class="module_code"  v-for="(subModulecode,index_code) in subModuledata.codes" :key="index_code" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
              <!-- 代码 -->
              <span :class="{ 'textNotCopy': isCopy }" v-if="subModulecode.explain != ''">
                //{{ subModulecode.explain }}<br>
                {{ subModulecode.code }}<br>
              </span>
            </div>
        </div>     
      </div>
    </div>
    <div v-else>
      <!-- python -->
      <div class="module_main" v-for="(moduledata,index) in showPythonDataOB" :key="index">
        <!-- 模块 -->
        <p class="textNotCopy">模块:{{ moduledata.moduleName }}</p>
        <div class="module_sub" v-for="(subModuledata,index_sub) in moduledata.submodule" :key="index_sub" >
          <!-- 子模块 -->
            <p class="textNotCopy">子模块:{{ subModuledata.submoduleName }}</p>
            <div class="module_code"  v-for="(subModulecode,index_code) in subModuledata.codes" :key="index_code" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
              <!-- 代码 -->
              <span :class="{ 'textNotCopy': isCopy }" v-if="subModulecode.explain != ''">
                //{{ subModulecode.explain }}<br>
                {{ subModulecode.code }}<br>
              </span>
            </div>
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
       showDataOB:"",//arduino
       showPythonDataOB:"",//python
       showDataType:true,//模式，默认为arduino
       selectedFileName: 'asdfg', // 存储已选择的文件名称，
       isCopy:false
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
        
        let arduinoData = null;//读取arduino配置信息;
        let pythonData = null;//读取python配置信息
        try {
          let worksheets =JSON.parse(jsonData)['Workbook']['Worksheet'];
          if(worksheets.length<=2){
            console.log("length",worksheets)
          }
          for(let index in worksheets){
            if(worksheets[index]['_attributes']['ss:Name'] == "Arduino"){
              arduinoData = worksheets[index]['Table']['Row']//读取配置
            }else if(worksheets[index]['_attributes']['ss:Name'] == "Python"){
              pythonData = worksheets[index]['Table']['Row']//读取配置
            }
          }
        } catch (error) {
          // alert(error)
          window.ipcRenderer.send('deployFileErr');
        }
        // console.log("数据",arduinoData)

        //处理数据
        const showdata = new Array();
        for (let index in arduinoData) {
          if(arduinoData[index]['Cell'].length != 4 && arduinoData[index]['Cell'].length != 2){
            continue;
          }

          if (index >= 1) {
            if (showdata.length > 0) {//判断数组是否为空
              
              let moduleId = this.getModuleName(index, arduinoData);
              let submoduleId = this.getSubmoduleName(index, arduinoData);
              let addModule = true;//是否新增模块标志位
              for (let Ob in showdata) {
                if (showdata[Ob].moduleName == moduleId) {//模块相同
                  let addSubmodule = true;//是否新增子模块标志位

                  for (let submodule_id in showdata[Ob].submodule) {
                    if (showdata[Ob].submodule[submodule_id].submoduleName == submoduleId) {//子模块相同
                      showdata[Ob].submodule[submodule_id].codes.push({
                        code: this.getCode(index,arduinoData),//代码
                        explain: this.getExplain(index, arduinoData)//注释
                      });
                      addSubmodule = false;//已有子模块
                    }
                  }
                  
                  if (addSubmodule) {//是否新增子模块
                    showdata[Ob].submodule.push({
                      submoduleName: this.getSubmoduleName(index, arduinoData),
                      codes: [{
                        code: this.getCode(index, arduinoData),//代码
                        explain: this.getExplain(index, arduinoData)//注释
                      }]
                    });
                  }
                  addModule = false;//已有模块
                }
              }
              if (addModule) {//是否新增模块
                showdata.push(this.getStructure(index, arduinoData));
              }
            } else {
              showdata.push(this.getStructure(index, arduinoData));
            }
          }
        }
        this.showDataOB = showdata;

        //处理python数据
        const showdata_python = new Array();
        // console.log("python数据",pythonData);
        for (let index in pythonData) {
          if(pythonData[index]['Cell'].length != 4 && pythonData[index]['Cell'].length != 2){
            continue;
          }
          
          if (index >= 1) {
            if (showdata_python.length > 0) {//判断数组是否为空
              // console.log("index：",index);
              let moduleId = this.getModuleName(index, pythonData);
              let submoduleId = this.getSubmoduleName(index, pythonData);
              let addModule = true;//是否新增模块标志位
              for (let Ob in showdata_python) {
                if (showdata_python[Ob].moduleName == moduleId) {//模块相同
                  let addSubmodule = true;//是否新增子模块标志位

                  for (let submodule_id in showdata_python[Ob].submodule) {
                    if (showdata_python[Ob].submodule[submodule_id].submoduleName == submoduleId) {//子模块相同
                      showdata_python[Ob].submodule[submodule_id].codes.push({
                        code: this.getCode(index,pythonData),//代码
                        explain: this.getExplain(index, pythonData)//注释
                      });
                      addSubmodule = false;//已有子模块
                    }
                  }
                  
                  if (addSubmodule) {//是否新增子模块
                    showdata_python[Ob].submodule.push({
                      submoduleName: this.getSubmoduleName(index, pythonData),
                      codes: [{
                        code: this.getCode(index, pythonData),//代码
                        explain: this.getExplain(index, pythonData)//注释
                      }]
                    });
                  }
                  addModule = false;//已有模块
                }
              }
              if (addModule) {//是否新增模块
                showdata_python.push(this.getStructure(index, pythonData));
              }
            } else {
              showdata_python.push(this.getStructure(index, pythonData));
            }
          }
        }
        this.showPythonDataOB = showdata_python;
      },
      getStructure(index, arduinoData) {
        // console.log("子模块",arduinoData);
        let codeModule = {
          moduleName: this.getModuleName(index, arduinoData),//模块
          submodule: [{
            submoduleName: this.getSubmoduleName(index, arduinoData),//子模块
            codes: [{
              code: this.getCode(index, arduinoData),//代码
              explain: this.getExplain(index, arduinoData)//注释
            }]
          }]
        }
        return codeModule;
      },

      //获取名称
      getModuleName(index, arduinoData){
        let name = "";
        try {
          name=arduinoData[index]['Cell'][0]["Data"]['_text']//模块名称
        } catch (error) {
          name="";
        }
        return name;
      },
      //获取子名称
      getSubmoduleName(index, arduinoData){
        let name = "";
        try {
          name=arduinoData[index]['Cell'][1]["Data"]['_text']//子模块
        } catch (error) {
          name="";
        }
        return name;
      },
      //获取代码
      getCode(index, arduinoData){
        
        let name = "";
        try {
          name=arduinoData[index]['Cell'][2]["Data"]['_text']//子模块
        } catch (error) {
          name="";
        }
        // console.log("data",name)
        // console.log("Data["+index+"]",name)
        return name;
      },
      //获取注释
      getExplain(index, arduinoData){
        let name = "";
        try {
          name=arduinoData[index]['Cell'][3]["Data"]['_text']//注释
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

      setShowDataType(){
        // 设置显示数据的类型
        this.showDataType = !this.showDataType ;
      },
      setCopyDataState(){
        console.log("不可q用");
        this.isCopy = !this.isCopy;
        console.log(this.isCopy);
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
.selected-filename {
  color: green;
}
.textNotCopy{
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}
</style>
