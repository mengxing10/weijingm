getMoreGuanOption(){
  var myRate1 = 1000;
  var  option = {
         title: [{
             x: "12%",
             bottom: 10,
             text: '累计办结',
             textStyle: {
                 fontWeight: 'normal',
                 fontSize: 12,
                 color: "#fff"
             },
         }, {
             x: "42%",
             bottom: 10,
             text: '累计受理数',
             textStyle: {
                 fontWeight: 'normal',
                 fontSize: 12,
                 color: "#fff"
             },
         }, {
             x: "75%",
             bottom: 10,
             text: '未处理',
             textStyle: {
                 fontWeight: 'normal',
                 fontSize: 12,
                 color: "#fff"
             },
         }],
         tooltip: {
             show: true,


         },
         series: [{
             type: 'gauge',//累计受理外圈
             center: ['50%', '55%'], // 默认全局居中
             radius: '70%',
             splitNumber: 10, //刻度数量
             min: 0,
             max: 1000,
             startAngle: 200,
             endAngle: -20,
             clockwise: true,
             axisLine: {
                 show: true,
                 lineStyle: {
                     width: 2,
                     shadowBlur: 0,
                     color: [
                         [1, '#03B7C9']
                     ]
                 }
             },
             axisTick: {
                 show: false,
                 lineStyle: {
                     color: '#03B7C9',
                     width: 1
                 },
                 length: -15,
                 splitNumber: 10
             },
             splitLine: {
                 show: true,
                 length: -6,
                 lineStyle: {
                     color: '#03B7C9',
                 }
             },
             axisLabel: {
                 distance: -20,
                 formatter: function(v) {
                     if ( v %200== 0) return v;
                     //else if(v==alertVal) return ''
                 },
                 textStyle: {
                     color: "#03B7C9",
                     fontSize: "12",
                 }
             },
             pointer: { //仪表盘指针
                 show: 0
             },
             detail: {
                 show: false
             },
             data: [{
                 name: "",
                 value: myRate1
             }]
         },
         {
             startAngle: 200,//累计受理白圈
             endAngle: -20,
             type: 'gauge',
             center: ['50%', '55%'], // 默认全局居中
             radius: '65%',
             min: 0,
             max: 1000,
             splitNumber: 0,
             axisLine: { // 坐标轴线
                 lineStyle: {
                     color: [
                         [0.66, '#dddddd'],
                         [1, '#dddddd']
                     ], // 属性lineStyle控制线条样式
                     width: 1
                 }
             },


             axisLabel: { // 坐标轴小标记
                 textStyle: { // 属性lineStyle控制线条样式
                     fontWeight: 'normal',
                     fontSize: 12,
                     color: 'rgba(30,144,255,0)',
                 }
             },
             splitLine: { // 分隔线
                 length: 10, // 属性length控制线长
                 lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                     width: 0,
                     color: '#444'
                 }
             },
             pointer: { // 分隔线 指针
                 color: '#666666',
                 width: 0,
                 length: 230
             },
             detail: {
                 show: false
             },

         }, {
             name: '累计受理',//累计受理内圈
             type: 'gauge',
             startAngle: 200,
             endAngle: -20,
             radius: '55%',
             center: ['50%', '55%'], // 默认全局居中

             min: 0,
             max: 1000,

             axisLine: {
                 show: false,
                 lineStyle: {
                     width: 4,
                     shadowBlur: 0,
                     color: [
                       [0.2, '#00FAFC'],
                       [0.4, '#3BD542'],
                       [0.6, '#E3F424'],
                       [0.8, '#7E48DA'],
                       [1, '#E531A8']
                     ]
                 }
             },
             axisTick: {
                 show: false,

             },
             splitLine: {
                 show: false,
                 length: 20,

             },

             axisLabel: {
                 show: false
             },
             pointer: {
                 show: true,
                 width:2
             },
             detail: {
                 show: true,
                 offsetCenter: [0, '40%'],
                 textStyle: {
                     fontSize: 16
                 }
             },
             itemStyle: {
                 normal: {
                     color: "#03B7C9",

                 }
             },
             data: [{
                 value: 436
             }]
         }, {
             type: 'gauge',//累计办结外圈
             center: ['20%', '55%'], // 默认全局居中
             radius: '50%',
             splitNumber: 10, //刻度数量
             min: 0,
             max: 1000,
             endAngle: 45,
             clockwise: true,
             axisLine: {
                 show: true,
                 lineStyle: {
                     width: 2,
                     shadowBlur: 0,
                     color: [
                         [1, '#03B7C9']
                     ]
                 }
             },
             axisTick: {
                 show: false,
                 lineStyle: {
                     color: '#03B7C9',
                     width: 1
                 },
                 length: -15,
                 splitNumber: 10
             },
             splitLine: {
                 show: true,
                 length: -6,
                 lineStyle: {
                     color: '#03B7C9',
                 }
             },
             axisLabel: {
                 distance: -20,
                 formatter: function(v) {
                     if ( v %200== 0) return v;
                     //else if(v==alertVal) return ''
                 },
                 textStyle: {
                     color: "#03B7C9",
                     fontSize: "12",
                     fontWeight: "normal"
                 }
             },
             pointer: { //仪表盘指针
                 show: 0
             },
             detail: {
                 show: false
             },
             data: [{
                 name: "",
                 value: myRate1
             }]
         }, {
             type: 'gauge',//累计办结白圈
             center: ['20%', '55%'], // 默认全局居中
             radius: '45%',
             min: 0,
             max: 1000,
             endAngle: 45,
             splitNumber: 0,
             axisLine: { // 坐标轴线
                 lineStyle: {
                     color: [
                         [0.66, '#dddddd'],
                         [1, '#dddddd']
                     ], // 属性lineStyle控制线条样式
                     width: 4
                 }
             },


             axisLabel: { // 坐标轴小标记
                 textStyle: { // 属性lineStyle控制线条样式
                     fontWeight: 'normal',
                     fontSize: 12,
                     color: 'rgba(30,144,255,0)',
                 }
             },
             splitLine: { // 分隔线
                 length: 4, // 属性length控制线长
                 lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                     width: 0,
                     color: '#444'
                 }
             },
             pointer: { // 分隔线 指针
                 color: '#666666',
                 width: 0,
                 length: 230
             },
             detail: {
                 show: false
             },

         }, {
             name: '累计办结',//累计办结内圈
             type: 'gauge',
             endAngle: 45,
             radius: '40%',
             center: ['20%', '55%'], // 默认全局居中

             min: 0,
             max: 1000,

             axisLine: {
                 show: false,
                 lineStyle: {
                     width: 2,
                     shadowBlur: 0,
                     color: [
                       [0.2, '#00FAFC'],
                       [0.4, '#3BD542'],
                       [0.6, '#E3F424'],
                       [0.8, '#7E48DA'],
                       [1, '#E531A8']
                     ]
                 }
             },
             axisTick: {
                 show: false,

             },
             splitLine: {
                 show: false,
                 length: 20,

             },

             axisLabel: {
                 show: false
             },
             pointer: {
                 show: true,
                 width:2
             },
             detail: {
                 show: true,
                 offsetCenter: [0, '40%'],
                 textStyle: {
                     fontSize: 16
                 }
             },
             itemStyle: {
                 normal: {
                     color: "#03B7C9",

                 }
             },
             data: [{
                 value: 245
             }]
         }, {
             type: 'gauge',//外圈
             center: ['80%', '55%'], // 默认全局居中
             radius: '50%',
             splitNumber: 10, //刻度数量
             min: 0,
             max: 1000,
             startAngle: 140,
             endAngle: -45,
             clockwise: true,
             axisLine: {
                 show: true,
                 lineStyle: {
                     width: 2,
                     shadowBlur: 0,
                     color: [
                         [1, '#03B7C9']
                     ]
                 }
             },
             axisTick: {
                 show: false,
                 lineStyle: {
                     color: '#03B7C9',
                     width: 1
                 },
                 length: -4,
                 splitNumber: 10
             },
             splitLine: {
                 show: true,
                 length: -6,
                 lineStyle: {
                     color: '#03B7C9',
                 }
             },
             axisLabel: {
                 distance: -20,
                 formatter: function(v) {
                     if ( v %200== 0) return v;
                     //else if(v==alertVal) return ''
                 },
                 textStyle: {
                     color: "#03B7C9",
                     fontSize: "12",
                     fontWeight: "normal"
                 }
             },
             pointer: { //仪表盘指针
                 show: 0
             },
             detail: {
                 show: false
             },
             data: [{
                 name: "",
                 value: myRate1
             }]
         }, {
             type: 'gauge',//未处理白圈
             center: ['80%', '55%'], // 默认全局居中
             radius: '45%',
             min: 0,
             max: 1000,
             startAngle: 140,
             endAngle: -45,
             splitNumber: 0,
             axisLine: { // 坐标轴线
                 lineStyle: {
                     color: [
                         [0.66, '#dddddd'],
                         [1, '#dddddd']
                     ], // 属性lineStyle控制线条样式
                     width: 4
                 }
             },


             axisLabel: { // 坐标轴小标记
                 textStyle: { // 属性lineStyle控制线条样式
                     fontWeight: 'bolder',
                     fontSize: 16,
                     color: 'rgba(30,144,255,0)',
                 }
             },
             splitLine: { // 分隔线
                 length: 10, // 属性length控制线长
                 lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                     width: 0,
                     color: '#444'
                 }
             },
             pointer: { // 分隔线 指针
                 color: '#666666',
                 width: 0,
                 length: 230
             },
             detail: {
                 show: false
             },

         }, {
             name: '未处理',//未处理内圈
             type: 'gauge',
             startAngle: 140,
             endAngle: -45,
             radius: '40%',
             center: ['80%', '55%'], // 默认全局居中

             min: 0,
             max: 1000,

             axisLine: {
                 show: false,
                 lineStyle: {
                     width: 2,
                     shadowBlur: 0,
                     color: [
                       [0.2, '#00FAFC'],
                       [0.4, '#3BD542'],
                       [0.6, '#E3F424'],
                       [0.8, '#7E48DA'],
                       [1, '#E531A8']
                     ]
                 }
             },
             axisTick: {
                 show: false,

             },
             splitLine: {
                 show: false,
                 length: 20,

             },

             axisLabel: {
                 show: false
             },
             pointer: {
                 show: true,
                 width:2
             },
             detail: {
                 show: true,
                 offsetCenter: [0, '40%'],
                 textStyle: {
                     fontSize: 16
                 }
             },
             itemStyle: {
                 normal: {
                     color: "#03B7C9",

                 }
             },
             data: [{
                 value: 135
             }]
         }]
     };
  return option
}
