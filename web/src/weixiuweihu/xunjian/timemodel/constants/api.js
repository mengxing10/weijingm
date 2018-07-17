/**
 * @file 统一维护API
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

export const apiServer = `http://39.106.150.90:8080/baogang-inspectionplan/inspection/`;


export const modelAPI ={

    // 成产日报--报表
    modellist:`${apiServer}inspectionplan/getinsepctionplantime`,
    addmodel:`${apiServer}inspectionplan/addinspectionplantime`,
    modifymodel:`${apiServer}inspectionplan/modifyinspectionplan`,

}
