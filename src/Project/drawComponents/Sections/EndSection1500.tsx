// import { useAppSelector } from "../../../hooks"
import End from "./End"
import UpFiting from "../Profiles/UpFiting"
import { IInitCoord } from "../../../Types/Types"
import RegularSection1500Mirror from "./RegularSection1500Mirror"
import StandTube88x58 from "../Profiles/StandTube88x58x3.5"
import DownFiting from "../Profiles/DownFiting"

export default function EndSection1500({initX, initY, scale}:IInitCoord) {  
  // const normalScale =  useAppSelector(state => state.POLength.scale)
  // const reducedScale = useAppSelector(state => state.reducedPOLEngth.scale)
  // const scale = (reducedScale === 1) ? normalScale : reducedScale
  if (!scale) scale = 1


  return (
    <g className="e1500">
        <RegularSection1500Mirror initX={initX} initY={initY} scale={scale} />
        <End initX={initX} initY={initY - 169 / scale} length={250 / scale} scale={scale} />
        <StandTube88x58 initX={initX - 1500 / scale} initY={initY} length={1100 / scale}/>
        <UpFiting initX={initX} initY={initY - 1100 / scale} />
        <UpFiting initX={initX - 1500 / scale} initY={initY - 1100 / scale} />
        <DownFiting initX={initX - 1500 / scale} initY={initY}/>
    </g>
  )
}
