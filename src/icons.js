import {WiDaySunny,WiDaySunnyOvercast} from "react-icons/wi";
const ComponentWithIcon =  (iconName) => {
    switch(iconName){
       case "WiDaySunny":   
          return (<WiDaySunny />)
        case "WiDaySunnyOverCast":
          return (<WiDaySunnyOvercast /> )
        default:
          return (<WiDaySunnyOvercast /> )        
   }
}
export default ComponentWithIcon