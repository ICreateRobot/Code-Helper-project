//数据处理

const convert =  require('xml-js');

//解析数据
function dataAnalysis(data) {
    const jsonData = convert.xml2json(data, { compact: true, spaces: 4 });
    let returnState= true;

    let ChineseData = null;//读取arduino配置信息;
    let EnglishData = null;//读取python配置信息
    try {
      let worksheets =JSON.parse(jsonData)['Workbook']['Worksheet'];
      if(worksheets.length<=2){
      }
      for(let index in worksheets){
        if(worksheets[index]['_attributes']['ss:Name'] == "中文"){
          ChineseData = worksheets[index]['Table']['Row']//读取配置
        }else if(worksheets[index]['_attributes']['ss:Name'] == "English"){
          EnglishData = worksheets[index]['Table']['Row']//读取配置
        }
      }
    } catch (error) {
        returnState = false;
    }

    //处理数据
    const showdata = new Array();
    for (let index in ChineseData) {
      if(ChineseData[index]['Cell'].length != 4 && ChineseData[index]['Cell'].length != 2){
        continue;
      }

      if (index >= 1) {
        if (showdata.length > 0) {//判断数组是否为空
          
          let moduleId = getModuleName(index, ChineseData);
          let submoduleId = getSubmoduleName(index, ChineseData);
          let addModule = true;//是否新增模块标志位
          for (let Ob in showdata) {
            if (showdata[Ob].moduleName == moduleId) {//模块相同
              let addSubmodule = true;//是否新增子模块标志位

              for (let submodule_id in showdata[Ob].submodule) {
                if (showdata[Ob].submodule[submodule_id].submoduleName == submoduleId) {//子模块相同
                  showdata[Ob].submodule[submodule_id].codes.push({
                    code: getCode(index,ChineseData),//代码
                    explain: getExplain(index, ChineseData)//注释
                  });
                  addSubmodule = false;//已有子模块
                }
              }
              
              if (addSubmodule) {//是否新增子模块
                showdata[Ob].submodule.push({
                  submoduleName: getSubmoduleName(index, ChineseData),
                  codes: [{
                    code: getCode(index, ChineseData),//代码
                    explain: getExplain(index, ChineseData)//注释
                  }]
                });
              }
              addModule = false;//已有模块
            }
          }
          if (addModule) {//是否新增模块
            showdata.push(getStructure(index, ChineseData));
          }
        } else {
          showdata.push(getStructure(index, ChineseData));
        }
      }
    }

    //处理英文数据
    const showdata_python = new Array();
    for (let index in EnglishData) {
      if(EnglishData[index]['Cell'].length != 4 && EnglishData[index]['Cell'].length != 2){
        continue;
      }
      
      if (index >= 1) {
        if (showdata_python.length > 0) {//判断数组是否为空
          let moduleId = getModuleName(index, EnglishData);
          let submoduleId = getSubmoduleName(index, EnglishData);
          let addModule = true;//是否新增模块标志位
          for (let Ob in showdata_python) {
            if (showdata_python[Ob].moduleName == moduleId) {//模块相同
              let addSubmodule = true;//是否新增子模块标志位

              for (let submodule_id in showdata_python[Ob].submodule) {
                if (showdata_python[Ob].submodule[submodule_id].submoduleName == submoduleId) {//子模块相同
                  showdata_python[Ob].submodule[submodule_id].codes.push({
                    code: getCode(index,EnglishData),//代码
                    explain: getExplain(index, EnglishData)//注释
                  });
                  addSubmodule = false;//已有子模块
                }
              }
              
              if (addSubmodule) {//是否新增子模块
                showdata_python[Ob].submodule.push({
                  submoduleName: getSubmoduleName(index, EnglishData),
                  codes: [{
                    code: getCode(index, EnglishData),//代码
                    explain: getExplain(index, EnglishData)//注释
                  }]
                });
              }
              addModule = false;//已有模块
            }
          }
          if (addModule) {//是否新增模块
            showdata_python.push(getStructure(index, EnglishData));
          }
        } else {
          showdata_python.push(getStructure(index, EnglishData));
        }
      }
    }
    if(returnState){
        return JSON.stringify({chinese:showdata,English:showdata_python});
    }else{
        return returnState;
    }
   
}
















function getStructure(index, arduinoData) {
    let codeModule = {
      moduleName: getModuleName(index, arduinoData),//模块
      submodule: [{
        submoduleName: getSubmoduleName(index, arduinoData),//子模块
        codes: [{
          code: getCode(index, arduinoData),//代码
          explain: getExplain(index, arduinoData)//注释
        }]
      }]
    }
    return codeModule;
  }
  function getModuleName(index, arduinoData){
    let name = "";
    try {
      name=arduinoData[index]['Cell'][0]["Data"]['_text']//模块名称
    } catch (error) {
      name="";
    }
    return name;
  }
  
  //获取子名称
  function getSubmoduleName(index, arduinoData){
    let name = "";
    try {
      name=arduinoData[index]['Cell'][1]["Data"]['_text']//子模块
    } catch (error) {
      name="";
    }
    return name;
  }
  //获取代码
  function getCode(index, arduinoData){
        
    let name = "";
    try {
      name=arduinoData[index]['Cell'][2]["Data"]['_text']//子模块
    } catch (error) {
      name="";
    }
    return name;
  }
  //获取注释
  function getExplain(index, arduinoData){
    let name = "";
    try {
      name=arduinoData[index]['Cell'][3]["Data"]['_text']//注释
    } catch (error) {
      name="";
    }
    return name;
  }
module.exports = {
    dataAnalysis: dataAnalysis
};