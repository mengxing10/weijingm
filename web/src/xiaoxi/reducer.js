const initialState = {
  xiaoxis:[],
  mqttClient:{}
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "MQTTCONNET":
        {
            return Object.assign({}, state, {mqttClient: action.data});
        }
        case "MQTTCLOSE":
        {
              return Object.assign({}, state, {mqtt: 'close'});
            }
        case "MQTTERROR":
          {
              return Object.assign({}, state, {mqtt: 'error'});
            }
        case "MQTTMESSAGE":
          {
            if(state.xiaoxis.length>=20){
              state.xiaoxis.pop()
              state.xiaoxis.unshift(action.data)

            }else{
                state.xiaoxis.unshift(action.data)
            }
            if(state.messageNum){state.messageNum++}else {state.messageNum=1}
            return Object.assign(
                {},
                state,
            )
          }
          case 'REQUESTOLDXIAOXI':
          {
            return Object.assign({}, state, {fetcholdxiaoxi: 'start'});
          }
          case 'RECEIVEOLDXIAOXI':
          {
            state.xiaoxis=action.data.map(item=>(JSON.parse(item.messageText)))

            return Object.assign(
                {},
                state,
                 {fetcholdxiaoxi: 'done'}
            )
          }


        default:
            return state
    }
}
