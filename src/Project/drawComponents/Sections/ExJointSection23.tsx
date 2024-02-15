import { IUniqSectionData } from "../../../Types/Types"
import '../Drawing.css'
import Start from "./Start"
import ExJointSection19 from "./ExJointSection19"
import UpFiting from '../Profiles/UpFiting'

interface IExJointSection19 extends IUniqSectionData {
  end: number | undefined
}

export default function ExJointSection23({initX, initY, length, addedStatePos, end=0, scale=1}: IExJointSection19) {

  return (
    <g className="s23">
        <ExJointSection19
            initX={initX}
            initY={initY}
            length={length}
            addedStatePos={addedStatePos}
            scale={scale}
            end={end}
        />
        <Start initX={initX} initY={initY - 169 / scale} scale={scale} />
        <UpFiting initX={initX} initY={initY - 1100 / scale} scale={scale} />
    </g>
  )
}
