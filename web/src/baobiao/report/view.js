/**
 * @file monlist
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as actions from './actions.js'
import './styles/index.styl'
import classNames from 'classnames'
import CsvFetch from '../../common/components/CsvFetch'
import MyTable from '../../common/components/MyTable'
import { DateField,DatePicker } from 'react-date-picker'
import { Dropdown,Input } from 'semantic-ui-react'
import moment from 'moment'
import Menus from '../../common/components/Menus'
class Report extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)

        this.state = {


            startDate: moment("2018-01-01"),
            endDate: moment().add(1, 'd'),
            page:1,
            deviceFilter:"",

        }
        //handleChange = (e, { value }) => this.setState({ value })
    }

    // 不同的item 调不同的components 展示完成后[销毁]
    // 公共的弹层组件 内容不同
    render() {
        var startDate= moment("2018-01-01");
        var   endDate= moment().add(1, 'd');

      let title='节能报表'

      let project ="shebei";
      let leibie ="shebei";


      const meuncont=[
                        {name:'project',text:'项目',mutilselect:false,pagechange:true,
                         value:[       {name:'all',text:'全部',address:'/bgp/pc/report',selected:true},
                                       {name:'reshui',text:'生活热水',address:'/bgp/pc/report',selected:false},
                                       {name:'yongchi',text:'泡池泳池',address:'/bgp/pc/report',selected:false},
                                       {name:'guolu',text:'锅炉房',address:'/bgp/pc/report',selected:false}
                                   ]
                        },
                        {name:'leibie',text:'类别',mutilselect:false,pagechange:true,
                         value:[       {name:'nengyuan',text:'能源统计',address:'/bgp/pc/report',selected:true},
                                       {name:'shebei',text:'设备运行',address:'/bgp/pc/report',selected:false},

                                   ]
                        }
                    ];

        // const thead={
        //             "shebei":[{width:"20%",value:"泵组"},{width:"10%",value:"状态"},{width:"10%",value:"入口温度"}
        //                         ,{width:"10%",value:"出口温度"},{width:"10%",value:"出口压力"},{width:"10%",value:"入口压力"}
        //                         ,{width:"10%",value:"有功功率"},{width:"20%",value:"总有功电量"}],

        //           }

        // const tbody={
        //             shebei:[["301#","开","49.4 ℃","53.1 ℃","0.8 Mpa","0.7 Mpa","145 kW",""],
        //             ["302#","开","49.6 ℃","53.4 ℃","0.8 Mpa","0.7 Mpa","145 kW",""],
        //             ["303#","开","49.2 ℃","53.4 ℃","0.8 Mpa","0.7 Mpa","143 kW",""],
        //             ["304#","开","48.8 ℃","52.9 ℃","0.8 Mpa","0.7 Mpa","144 kW",""],
        //             ["401#","开","49.1 ℃","53.1 ℃","0.8 Mpa","0.7 Mpa","147 kW",""],
        //             ["402#","开","49.0 ℃","52.8 ℃","0.8 Mpa","0.7 Mpa","146 kW",""],
        //           ]}


           //名称 电表期初读数 电表期末读数 本期用电量 本期运行时间 本期平均功率 技改前功率 总节能量 总节能收益
//名称 本期用电量(KWh) 本期运行时间(h) 本期平均功率(KW) 技改前功率(KW) 理论节电量(KWh) 实际节电量(KWh) 偏差率(%) 计划完成率(%)  总节能收益(元)
        // const thead={
        //             "shebei":[{width:"20%",value:"名称"},{width:"10%",value:"电表期初读数(KWh)"},{width:"10%",value:"电表期末读数"}
        //                         ,{width:"10%",value:"本期用电量"},{width:"10%",value:"本期运行时间"},{width:"10%",value:"本期平均功率"}
        //                         ,{width:"10%",value:"技改前功率"},{width:"10%",value:"总节能量"},{width:"10%",value:"总节能收益"}]
        //           }


        const thead={
                    "shebei":[{width:"10%",value:"名称"},{width:"10%",value:"本期用电量(KWh)"},{width:"10%",value:"本期运行时间(h)"}
                                ,{width:"10%",value:"本期平均功率(KW)"},{width:"10%",value:"技改前功率(KW)"},{width:"10%",value:"理论节电量(KWh)"}
                                ,{width:"10%",value:"实际节电量(KWh)"},{width:"10%",value:"偏差率(%)"},{width:"10%",value:"计划完成率(%)"},{width:"10%",value:"总节能收益(元)"}]
                  }


        const tbody={
                    shebei:[["301#","1143","1429","322","233","232","257","2","98","2186"],
                    ["302#","1143","1429","322","233","232","257","2","98","2186"],
                    ["303#","1143","1429","322","233","232","257","2","98","2186"],
                    ["304#","1143","1429","322","233","232","257","2","98","2186"],
                    ["401#","1143","1429","322","233","232","257","2","98","2186"],
                    ["402#","1143","1429","322","233","232","257","2","98","2186"],
                   
                  ]}



        const options ={
            shebei:[
              { key: 1, text: '全部', value: 1 },
              { key: 2, text: '28/38泵组', value: 2 },
              { key: 3, text: '3/4泵组', value: 3 },
              { key: 4, text: '综合泵站', value: 4 },
             ],
            }
        const renderLabel = label => ({
            color: 'blue',
            content: `${label.text}`,
          })


        return (

          <div className="report theBody">
            <h3 className="weixiu-title labStyle">{title}</h3>
            <div className="query-condition">
                <span className="query-name labStyle">泵组选择</span>
                {/* <Input type="text" className="query-value" ref="device" name="" value={this.state.deviceFilter} onChange={this.handleChangeInput.bind(this)}/> */}
                <div className="query-value">
                  <Dropdown
                    className="query-value"
                    defaultValue={options[leibie][0].value}
                     selection
                     openOnFocus
                     options={options[leibie]}
                     renderLabel={renderLabel}
                   />
                </div>

                <label className="labStyle">&nbsp;&nbsp;开始时间</label>
                    <DateField
                        dateFormat="YYYY-MM-DD HH:mm:ss"
                        locale="zh-cn"
                        forceValidDate={true}
                        updateOnDateClick={true}
                        defaultValue={startDate}
                        //value={this.state.startDate}
                        //onChange={::this.handleChangeStart}
                        >
                        <DatePicker
                            navigation={true}
                            locale="zh-cn"
                            forceValidDate={true}
                            highlightWeekends={true}
                            highlightToday={true}
                            weekNumbers={true}
                            weekStartDay={0}
                            footer={true}
                            />
                    </DateField>
                <label className="labStyle">&nbsp;&nbsp;结束时间</label>
                    <DateField
                    dateFormat="YYYY-MM-DD HH:mm:ss"
                    locale="zh-cn"
                    forceValidDate={true}
                    updateOnDateClick={true}
                     defaultValue={endDate}
                    //value={this.state.endDate}
                    //onChange={::this.handleChangeEnd}
                    >
                    <DatePicker
                        navigation={true}
                        locale="zh-cn"
                        forceValidDate={true}
                        highlightWeekends={true}
                        highlightToday={true}
                        weekNumbers={true}
                        weekStartDay={0}
                        footer={true}
                        />
                </DateField>
                <span className="commitBtn">查询</span>
                <span className="rightBtn">导出</span>
            </div>
            <div className="weixiu-table">
            <MyTable thead={thead[leibie]} tbody={tbody[leibie]}/>
          </div>

          </div>
        )
    }
    handleChangeInput(ev){
        this.setState({"deviceFilter":ev.target.value})
    }
    handleChangeStart(){

    }
    handleChangeEnd(){

    }


    queryData()
    {
        var endDate =  moment(this.state.endDate).format('YYYY-MM-DD');
        var startDate  =  moment(this.state.startDate).format('YYYY-MM-DD');
        //alert(this.refs.startDt.getInput().value );
        //alert(this.refs.endDt.getInput().value );
        // const {getInstantQuery,instantQuery}  =this.props;
        // instantQuery.data.report_list=[];
        // getInstantQuery({"branchId":this.state.branchId, "startDate":startDate,"endDate":endDate});

    }













   componentWillReceiveProps(nextprops){

        }




    componentDidMount() {

   }



   componentWillUnmount() {
   }


}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.report, mapDispatchToProps)(Report);
