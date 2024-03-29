import End from "./End"
import UpFiting from "../Profiles/UpFiting"
import { IInitCoord } from "../../../Types/Types"
import RegularSection1500Mirror from "./RegularSection1500Mirror"
import StandTube88x58 from "../Profiles/StandTube88x58x3.5"
import DownFiting from "../Profiles/DownFiting"

export default function EndSection1500({initX, initY, upFiting=()=>{}, scale=1}:IInitCoord) {

  return (
    <g className="e1500">
        <RegularSection1500Mirror initX={initX} initY={initY} scale={scale} />
        <End initX={initX} initY={initY - 169 / scale} scale={scale} />
        <StandTube88x58 initX={initX - 1500 / scale} initY={initY} length={1100 / scale} scale={scale}/>
        {upFiting(initX, initY - 1100 / scale, scale)}
        {upFiting(initX - 1500 / scale, initY - 1100 / scale, scale)}
        <DownFiting initX={initX - 1500 / scale} initY={initY} scale={scale}/>
    </g>
  )
}
