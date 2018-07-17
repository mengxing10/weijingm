/**
 * Created by JEEP on 2017-04-26.
 */
/**
 * Created by JEEP on 2017-04-26.
 */
/**
 * @file Setpasswd component
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component} from 'react'
import {Input,Dropdown} from 'semantic-ui-react'
import * as actions from '../actions.js'
export default class AddDevice extends Component {

    constructor(props) {
        super(props)
        this.device = {"name":"冷却塔","model":"","number":4,"manufacturer": '斯必克冷却技术(苏州)有限公司',"madedate": '2016.06'};
        

        this.state = {
            topicid:2,
            name:'非电空调',
            devictType:'feidiankongtiao'
            // oldphone: 'NC8402QAN4FPK',
            // newphone: '冷却塔'

        }
    }

    render() {

        const {device} = this.props;

        var stateOptions =  [   
                                { key: 'AL', value: 'feidiankongtiao', text: '非电空调' },
                                { key: 'CL', value: 'dianzhilengji', text: '电制冷机' },
                                { key: 'guolu', value: 'guolu', text: '锅炉' },
                                { key: 'fadianji', value: 'fadianji', text: '发电机' },
                                { key: 'lengquefengji', value: 'lengquefengji', text: '冷却风机' },
                                { key: 'lengqueta', value: 'lengqueta', text: '冷却塔' },
                                { key: 'shuibengdianji', value: 'shuibengdianji', text: '水泵电机' },                                
                                { key: 'kongtiaoshuibeng', value: 'kongtiaoshuibeng', text: '空调水泵' }, 
                                { key: 'ruanshuiguang', value: 'ruanshuiguang', text: '软水器' },
                                { key: 'peidiangui', value: 'peidiangui', text: '配电柜' },
                                { key: 'reliangbiao', value: 'reliangbiao', text: '热量表' },
                                { key: 'diandubiao', value: 'diandubiao', text: '电度表' },
                                { key: 'bushuibiao', value: 'bushuibiao', text: '补水表' },
                                { key: 'liuliangji', value: 'liuliangji', text: '流量计' },
                                { key: 'zhenkongbeng', value: 'zhenkongbeng', text: '真空泵' },                                
                                { key: 'banshirejiaohuanqi', value: 'banshirejiaohuanqi', text: '板式热交换器' }, 
                                { key: 'rejiaohuanguan', value: 'rejiaohuanguan', text: '热交换罐' },
                                { key: 'dingyabushuiguan', value: 'dingyabushuiguan', text: '定压补水罐' },
                                { key: 'shuixiang', value: 'shuixiang', text: '水箱' },
                                { key: 'kongtiaojizhu', value: 'kongtiaojizhu', text: '新风机/空调机组' },
                                { key: 'fengjipanguan', value: 'fengjipanguan', text: '室内机/风机盘管' },
                                { key: 'zhujidianlan', value: 'zhujidianlan', text: '主机电缆' },
                                { key: 'bengzhudianlan', value: 'bengzhudianlan', text: '泵组电缆' }
                         
                                       //{ key: '', value: '', text: '' },

        //锅炉 发电机  冷却风机 冷却塔  水泵电机 空调水泵 软水器 配电柜  热量表 电度表 补水表 流量计 真空泵 板式热交换器 热交换罐

         //定压补水罐 水箱 新风机/空调机组 室内机/风机盘管 主机电缆 泵组电缆

         ]

 
const fields=[
{id:'0',key:'topicid',name:'项目id'},
{id:'1',key:'name',name:'设备名称'},
{id:'2',key:'model',name:'型号'},
{id:'3',key:'number',name:'台数'},
{id:'4',key:'madefactory',name:'制造厂商'},
{id:'5',key:'madenumber',name:'出厂编号'},
{id:'6',key:'combustortype',name:'燃烧机型号'},
{id:'7',key:'combustormotortype',name:'燃烧机电机型号'},
{id:'8',key:'unitpower',name:'机组配电量'},
{id:'9',key:'coldwaterflow',name:'冷水额定流量'},
{id:'10',key:'warmwaterflow',name:'温水额定流量'},
{id:'11',key:'p1',name:'冷温/冷却额定压差'},
{id:'12',key:'p2',name:'冷温水/冷却水压限'},
{id:'13',key:'p3',name:'冷水额定出/入口温度℃'},
{id:'14',key:'p4',name:'冷却水额定出/入口温度℃'},
{id:'15',key:'p5',name:'温水额定出/入口温度℃'},
{id:'16',key:'p6',name:'卫热额定出/入口温度℃'},
{id:'17',key:'solutionpumpfrequencyconverterbrand',name:'溶液泵变频器品牌'},
{id:'18',key:'solutionpumpfrequencyconvertertype',name:'溶液泵变频器型号'},
{id:'19',key:'refrigerantpumpinverterbrand',name:'冷剂泵变频器品牌'},
{id:'20',key:'refrigerantpumpinvertertype',name:'冷剂泵变频器型号'},
{id:'21',key:'plcbrand',name:'plc品牌'},
{id:'22',key:'plctype',name:'plc型号'},
{id:'23',key:'plcprogramversion',name:'plc程序版本'},
{id:'24',key:'operatingscreenprogramversion',name:'操作屏程序版本'},
{id:'25',key:'madedate',name:'出厂日期'},
{id:'26',key:'type',name:'类型'},
{id:'27',key:'compressortype',name:'压缩机类型'},
{id:'28',key:'compressornumber',name:'压缩机台数'},
{id:'29',key:'madecold',name:'额定制冷量'},
{id:'30',key:'madeheat',name:'额定制热量'},
{id:'31',key:'lubricatingoilparameter',name:'润滑油参数'},
{id:'32',key:'refrigerantspecification',name:'制冷剂规格'},
{id:'33',key:'refrigerantcharge',name:'制冷剂充注量'},
{id:'34',key:'startupmode',name:'启动方式'},
{id:'35',key:'startingcurrent',name:'启动电流'},
{id:'36',key:'runningcurrent',name:'运行电流'},
{id:'37',key:'ratedvoltage',name:'额定电压'},
{id:'38',key:'motorinputpower',name:'电机输入功率'},
{id:'39',key:'p7',name:'冷却水额定流量/压差  '},
{id:'40',key:'cop',name:'cop'},
{id:'41',key:'fueltype',name:'燃料类型'},
{id:'42',key:'ratedthermalpower',name:'额定热功率'},
{id:'43',key:'ratedwaterpressure',name:'额定出水压力'},
{id:'44',key:'ratedinlettemperature',name:'额定进水温度'},
{id:'45',key:'ratedevaporation',name:'额定蒸发量'},
{id:'46',key:'ratedsteampressure',name:'额定蒸汽压力'},
{id:'47',key:'ratedsteamtemperature',name:'额定蒸汽温度'},
{id:'48',key:'designefficiency',name:'设计效率'},
{id:'49',key:'ratedpower',name:'额定功率'},
{id:'50',key:'outputvoltage',name:'输出电压'},
{id:'51',key:'outputcurrent',name:'输出电流'},
{id:'52',key:'enginemodel',name:'发动机型号'},
{id:'53',key:'cylindernumber',name:'气缸数'},
{id:'54',key:'consumption',name:'耗气/油量'},
{id:'55',key:'exhaustvolume',name:'排气量'},
{id:'56',key:'exhausttemperature',name:'排气温度'},
{id:'57',key:'ratedcurrent',name:'额定电流'},
{id:'58',key:'leafform',name:'叶片形式'},
{id:'59',key:'deceleratormodel',name:'减速器型号'},
{id:'60',key:'fanbeltmodel',name:'风机皮带型号'},
{id:'61',key:'motorspeed',name:'电机转速'},
{id:'62',key:'motorconnection',name:'电机接法'},
{id:'63',key:'weight',name:'重量'},
{id:'64',key:'frequencyconverterbrand',name:'软启/变频器品牌'},
{id:'65',key:'frequencyconvertertype',name:'软启/变频器型号'},
{id:'66',key:'coolingtowerposition',name:'冷却塔位置'},
{id:'67',key:'coolingtowertype',name:'冷却塔类型'},
{id:'68',key:'ratedflowrate',name:'额定流量'},
{id:'69',key:'towerhead',name:'塔体扬程'},
{id:'70',key:'runweight',name:'运行重量'},
{id:'71',key:'driftingrate',name:'漂水率'},
{id:'72',key:'waterinletandoutlettemperature',name:'设计进出水温度'},
{id:'73',key:'dryandwetbulbtemperature',name:'设计干湿球温度'},
{id:'74',key:'ratedspeed',name:'额定转速'},
{id:'75',key:'efficiency',name:'效率'},
{id:'76',key:'lift',name:'扬程'},
{id:'77',key:'axialpower',name:'轴功率'},
{id:'78',key:'cavitationremainder',name:'气蚀余量'},
{id:'79',key:'speed',name:'转速'},
{id:'80',key:'airpumptype',name:'空调水泵类型'},
{id:'81',key:'frequencyconverter',name:'变频器'},
{id:'82',key:'workingpressure',name:'工作压力'},
{id:'83',key:'softeningobject',name:'软化对象'},
{id:'84',key:'singleflowrate',name:'单机流量'},
{id:'85',key:'filtrationspeed',name:'过滤速度'},
{id:'86',key:'barrelmaterial',name:'筒体材质'},
{id:'87',key:'residualhardnessofeffluent',name:'出水残余硬度'},
{id:'88',key:'tankpressure',name:'罐体承压'},
{id:'89',key:'equipmentcombination',name:'设备组合'},
{id:'90',key:'powerdistribution',name:'配电量'},
{id:'91',key:'usedate',name:'使用日期'},
{id:'92',key:'measuringobject',name:'计量对象'},
{id:'93',key:'multiplyingpower',name:'倍率'},
{id:'94',key:'medium',name:'介质'},
{id:'95',key:'limitpumping',name:'极限抽气'},
{id:'96',key:'designpressure',name:'设计压力'},
{id:'97',key:'experimentalpressure',name:'实验压力'},
{id:'98',key:'designtemperature',name:'设计温度'},
{id:'99',key:'heattransfercoefficient',name:'传热系数'},
{id:'100',key:'liquidtreatment',name:'液体处理量'},
{id:'101',key:'importandexportdiameter',name:'进出口直径'},
{id:'102',key:'heatexchangearea',name:'换热面积'},
{id:'103',key:'volume',name:'容积'},
{id:'104',key:'maximumworkingpressure',name:'最高工作压力'},
{id:'105',key:'watertreatment',name:'处理水量'},
{id:'106',key:'influentpressure',name:'进水压力'},
{id:'107',key:'specifications',name:'规格'},
{id:'108',key:'materialquality',name:'材质'},
{id:'109',key:'ratedairflow',name:'额定风量'},
{id:'110',key:'motorpower',name:'电机功率'},
{id:'111',key:'ratedwatertemperature',name:'额定出水温度'},
{id:'112',key:'caliber',name:'口径'},
{id:'113',key:'position',name:'位置'},
{id:'114',key:'airconditioningwaterflow',name:'空调水流量'}

  ]


       // var filedOptions = {
       //                     feidiankongtiao:[{key:'model',name:'型号'},{key:'number',name:'台数'},{key:'manufacturer',name:'制造厂商'},{key:'madeno',name:'出厂编号'}],
       //                     dianzhilengji:[{key:'madedate',name:'出厂日期'},{key:'fadongjixinghao',name:'发动'},{key:'qigangshu',name:'气数'}],
       //                     guolu:[{key:'ranliaoleixing',name:'燃料类型'},{key:'edingregonglv',name:'额定热功率'},{key:'edingchushuiyali',name:'额定出水压力'}],
       //                     fadianji:[{key:'fadongjixinghao',name:'发动机型号'},{key:'qigangshu',name:'气缸数'}]
       //        }; //{key:'',name:''}

 //冷却塔：2 ，3，4,25,5，66,67,68,69,70,71,72,73
 //水泵电机:2 ，3，4,25,5，49，57，37,62,74,75,63,34,64,65
 //空调水泵：2 ，3，4,25,5，68,76,77,78,79, 26,81
 // 软水管 2 ，3，4,25,82,...89
     var filedOptions = {
feidiankongtiao:[ fields[2],fields[3],fields[4],fields[5],fields[6],fields[7],fields[8],fields[9],fields[10],fields[11],fields[12],fields[14],fields[15],fields[16],fields[17],fields[18],fields[19],fields[20],fields[21],fields[22],fields[23],fields[24]],
dianzhilengji:[ fields[2],fields[3],fields[4],fields[25],fields[26],fields[27],fields[28],fields[29],fields[30],fields[31],fields[32],fields[33],fields[34],fields[35],fields[36],fields[37],fields[38],fields[39],fields[40]],
guolu:[ fields[2],fields[3],fields[4],fields[25],fields[26],fields[41],fields[42],fields[43],fields[111],fields[44],fields[45],fields[46],fields[47],fields[48]],
fadianji:[fields[2],fields[3],fields[4],fields[25],fields[26],fields[41],fields[49],fields[50],fields[51],fields[52],fields[53],fields[54],fields[55],fields[56]],
lengquefengji:[fields[2],fields[3],fields[4],fields[25],fields[5],fields[49],fields[57],fields[37],fields[58],fields[59],fields[60],fields[61],fields[62],fields[63],fields[34],fields[64],fields[65]],
lengqueta:[fields[2],fields[3],fields[4],fields[25],fields[5],fields[66],fields[67],fields[68],fields[69],fields[70],fields[71],fields[72],fields[73]],
shuibengdianji:[fields[2],fields[3],fields[4],fields[25],fields[5],fields[49],fields[57],fields[37],fields[62],fields[74],fields[75],fields[63],fields[34],fields[64],fields[65]],
kongtiaoshuibeng:[fields[2],fields[3],fields[4],fields[25],fields[5],fields[68],fields[76],fields[77],fields[78],fields[79],fields[26],fields[81]],


 ruanshuiguang:[fields[2],fields[3],fields[4],fields[25],fields[82],fields[83],fields[84],fields[85],fields[86],fields[87],fields[88],fields[89]],
 peidiangui:[fields[2],fields[3],fields[4],fields[25],fields[5],fields[90]],
 reliangbiao:[fields[2],fields[3],fields[4],fields[25],fields[91],fields[92]],
 diandubiao:[fields[2],fields[3],fields[4],fields[25],fields[91],fields[92],fields[93]],
 bushuibiao:[fields[112],fields[3],fields[4],fields[25],fields[91],fields[92]],
  liuliangji:[fields[2],fields[3],fields[4],fields[25],fields[91],fields[94]],
  zhenkongbeng:[fields[2],fields[3],fields[4],fields[25],fields[95]],
  banshirejiaohuanqi:[fields[2],fields[3],fields[4],fields[25],fields[96],fields[97],fields[98],fields[98],fields[100],fields[101],fields[102],fields[94]],
 rejiaohuanguan:[fields[2],fields[3],fields[4],fields[25],fields[102],fields[103],fields[94],fields[96],fields[97],fields[104],fields[98]],
 dingyabushuiguan:[fields[2],fields[3],fields[4],fields[25],fields[105],fields[106],fields[107]],
  shuixiang:[fields[26],fields[3],fields[113],fields[103],fields[108]], 
  kongtiaojizhu:[fields[2],fields[3],fields[4],fields[25],fields[29],fields[30],fields[109],fields[110],fields[114]],
  fengjipanguan:[fields[2],fields[3],fields[4],fields[25],fields[110],fields[29],fields[30],fields[109]],
  zhujidianlan:[fields[2],fields[4]],
  bengzhudianlan:[fields[2],fields[4]]
 //,fields[],fields[],fields[]
              };



  //{key:'',name:''} ,{key:'',name:''}
  // {key:'model',name:'型号'},{key:'number',name:'台数'},{key:'manufacturer',name:'制造厂商'},{key:'madedate',name:'出厂日期'},{key:'madeno',name:'出厂编号'}
  // 
     //if(this.state.devictType=="guolu")

   //var fadianji= [{key:'fadongjixinghao',name:'发动机型号'},{key:'qigangshu',name:'气缸数'}];


    // var selDeviceType =  filedOptions[this.state.devictType];

        return (
            <div className="device-wrap">
            <h3>添加设备</h3>
                        <div className="device-item">
                        <h4>名称</h4>
                        {/*<Input onChange={this.change.bind(this, 'oldphone')} defaultValue={this.device.name}   /> */}
                         <Dropdown  ref="nameDrop" style={{"width":"570px"}} placeholder='请选择'  defaultValue={this.state.devictType} onChange={::this.changeDevice} selection options={stateOptions} />
                         </div>

   
                         {/*<div className="device-item">
                         <h4>型号</h4>
                         <Input ref='model'/>
                         </div> */}
                     
                    
                       { filedOptions[this.state.devictType].map((entry, index) => (  

                         <div className="device-item">
                         <h4>{entry.name}</h4>
                         <Input ref={entry.key} onChange={this.changeValue.bind(this, entry.key)}/>
                         </div>

                         ) )

                       }


           
            <div onClick={::this.confirm} className="device-btn">
            <span>确认</span>
            </div>
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
