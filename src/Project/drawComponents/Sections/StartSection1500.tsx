import Start from "./Start"
import UpFiting from "../Profiles/UpFiting"
import { IInitCoord } from "../../../Types/Types"
import RegularSection1500 from "./RegularSection1500"

export default function StartSection1500({initX, initY, scale=1}:IInitCoord) {

  return (
    <g className="s1500">
        <RegularSection1500 initX={initX} initY={initY} scale={scale} />
        <Start initX={initX} initY={initY - 169 / scale} scale={scale} />
        <UpFiting initX={initX} initY={initY - 1100 / scale} scale={scale} />
    </g>
  )
}
