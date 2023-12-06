import { useAppSelector } from "../../../hooks"
import Start from "./Start"
import UpFiting from "../Profiles/UpFiting"
import { IInitCoord } from "../../../Types/Types"
import RegularSection1500 from "./RegularSection1500"

export default function StartSection1500({initX, initY}:IInitCoord) {  
  const normalScale =  useAppSelector(state => state.POLength.scale)
  const reducedScale = useAppSelector(state => state.reducedPOLEngth.scale)
  const scale = (reducedScale === 1) ? normalScale : reducedScale

  return (
    <g className="s1500">
        <RegularSection1500 initX={initX} initY={initY} />
        <Start initX={initX} initY={initY - 169 / scale} length={250 / scale}/>
        <UpFiting initX={initX} initY={initY - 1100 / scale} />
    </g>
  )
}
