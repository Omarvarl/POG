import { useAppSelector } from "../../../hooks"
import End from "./End"
import UpFiting from "../Profiles/UpFiting"
import { IInitCoord } from "../../../Types/Types"
import RegularSection1500_mirror from "./RegularSection1500_mirror"
import StandTube88x58 from "../Profiles/StandTube88x58x3.5"
import DownFiting from "../Profiles/DownFiting"

export default function EndSection1500({initX, initY}:IInitCoord) {  
    const scale = useAppSelector(state => state.POLength.scale)

  return (
    <g className="e1500">
        <RegularSection1500_mirror initX={initX} initY={initY} />
        <End initX={initX} initY={initY - 169 / scale} length={250 / scale}/>
        <StandTube88x58 initX={initX - 1500 / scale} initY={initY} length={1100 / scale}/>
        <UpFiting initX={initX} initY={initY - 1100 / scale} />
        <UpFiting initX={initX - 1500 / scale} initY={initY - 1100 / scale} />
        <DownFiting initX={initX - 1500 / scale} initY={initY}/>
    </g>
  )
}
