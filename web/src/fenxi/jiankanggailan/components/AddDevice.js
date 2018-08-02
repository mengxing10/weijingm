/**
 * Created by JEEP on 2017-04-26.
 */
/**
 * Created by JEEP on 2017-04-26.
 */
/**
 * @file Setpasswd component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component} from 'react'
import {Input,Dropdown} from 'semantic-ui-react'
import MyTable from '../../../common/components/MyTable'
import * as actions from '../actions.js'
export default class AddDevice extends Component {

    constructor(props) {
        super(props)
        this.device = {"name":"冷却塔","model":"","number":4,"manufacturer": '斯必克冷却技术(苏州)有限公司',"madedate": '2016.06'};
        

        this.state = {
            topicid:2,
            name:'非电空调',
            devictType:'feidiankongtiao'
            

        }
    }

    render() {

        const {device,currentLegend } = this.props;


        //height: 200px
        const thead=[{width:"20%",value:"时间"},{width:"10%",value:"设备"}
                    ,{width:"10%",value:"程度"},{width:"15%",value:"维修人"}
                    ,{width:"25%",value:"联系方式"},{width:"20%",value:"状态"}]
                   // onClick={this.chgStatus.bind(this, item)}
 
        const tbody=[["2018-02-08","1#电机","普通","李兵","13900002222","已处理" ],
        // [2,"2018-02-08 00:30:00","水泵1#","振动超限","普通","已处理"],
        // [3,"2018-02-08 00:30:00","水泵1#","振动超限","普通","已处理"],
        // [4,"2018-02-08 00:30:00","水泵1#","振动超限","普通","已处理"],
        // [5,"2018-02-08 00:30:00","水泵1#","振动超限","普通","已处理"],
        // [6,"2018-02-08 00:30:00","水泵1#","振动超限","普通","已处理"],
        // [7,"2018-02-08 00:30:00","水泵1#","振动超限","普通","已处理"],
       
        ]


        //height:400px 
        // const thead=[{width:"50%",value:"时间"},{width:"50%",value:"2018-02-08"}];                 
        //            // onClick={this.chgStatus.bind(this, item)}
        // const tbody=[  //["时间","2018-02-08"],
        // ["设备","1#电机"],
        // ["程度","普通"],
        // ["维修人","李兵"],
        // ["联系方式","13900002222"],
        // ["状态","已处理" ]     
        // ]



        return (
            <div className="kailan-wrap">
            <h3 style={{paddingBottom:'20px'}}>{currentLegend.seriesName}详情</h3>
                  {/*                            
                 <div className="device-item">
                     <h4>时间</h4>
                     <label>2018-01-12</label>
                 </div>

                 <div className="device-item">
                     <h4>设备</h4>
                     <label>1#电机</label>
                 </div>

                  <div className="device-item">
                     <h4>程序</h4>
                     <label>一般</label>
                 </div>

                  <div className="device-item">
                     <h4>维修人</h4>
                     <label>李兵</label>
                 </div>


                  <div className="device-item">
                     <h4>联系方式</h4>
                     <label>136788666</label>
                 </div>
                  <div className="device-item">
                     <h4>状态</h4>
                     <label>已处理</label>
                 </div>

                  */}   
              
                  <MyTable thead={thead} tbody={tbody}/>

            <div onClick={::this.exit} className="sp-ext"></div>
            </div>
            )
    }



changeDevice(ev,data)
{
   
    
   var obj = data.value;
   var curName = ev.target.innerText;
   //var curName = this.refs.nameDrop.text;
   this.setState({"devictType":obj,name:curName});
    
}

    changeValue(type, ev) {
         
        this.setState({[type]: ev.target.value});
        console.log()
    }

    change(type, ev) {
        this.setState({[type]: ev.target.value})
        console.log()
    }

    exit() {
        const {exitAdd_device} = this.props;
        console.log(this.props)
        exitAdd_device && exitAdd_device();
    }

    confirm() {

          
         var afs = this;
        // var sf=  this.refs.number.input.value;

        const {executeAdd_device}  =this.props;
        executeAdd_device(this.state );  //{name:'泵组电缆',number:'23',madefactory:'制造厂商1'}

        this.props.exitAdd_device && this.props.exitAdd_device(this.state);
    }
}
