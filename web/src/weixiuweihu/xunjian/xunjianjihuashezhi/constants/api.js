/**
 * @file 统一维护API
 * @author zlc <lichao9182@126.com>
 */
export const apiServer = `http://39.106.150.90:8080/baogang-inspectionplan/`;

export const apiServer2 = `http://39.106.150.90:8080/baogang-device/`;

export const mapAPI ={

  //泵站信息
  getlayout:`${apiServer2}organization/managementlayout/getlayout`,
  //所有时间模板
  modellist:`${apiServer}inspection/inspectionplan/getinsepctionplantime`,

  // 巡检计划时间设置
  getstationmaptime:`${apiServer}inspection/inspectionplan/getstationmaptime`,
  addstationmaptime:`${apiServer}inspection/inspectionplan/addstationmaptime`,
  updatestationmaptime:`${apiServer}inspection/inspectionplan/updatestationmaptime`,
  modifymodel:`${apiServer}inspectionplan/modifyinspectionplan`,

  //根据id获取时间模板详情
  getptbyid:`${apiServer}inspection/inspectionplan/getptbyid`,

}
