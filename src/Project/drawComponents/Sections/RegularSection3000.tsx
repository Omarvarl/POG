import { useAppSelector } from "../../../hooks"
import { IInitCoord } from "../../../Types/Types"
import RegularSection1500 from "./RegularSection1500"

export default function RegularSection3000({initX, initY}:IInitCoord) {
  const normalScale =  useAppSelector(state => state.POLength.scale)
  const reducedScale = useAppSelector(state => state.reducedPOLEngth.scale)
  const scale = (reducedScale === 1) ? normalScale : reducedScale

  return (
    <g className="r3000">
        <RegularSection1500 initX={initX} initY={initY} />
        <RegularSection1500 initX={initX + 1500 / scale} initY={initY} />
    </g>
  )
}
