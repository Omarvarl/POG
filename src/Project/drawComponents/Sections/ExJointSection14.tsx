import { IUniqSectionData } from "../../../Types/Types"
import '../Drawing.css'
import ExJointSection13 from "./ExJointSection13"
import Start from "./Start"
import UpFiting from '../Profiles/UpFiting'

interface ISection14 extends IUniqSectionData {
    lengthBefore: number,
    lengthAfter: number
}

export default function ExJointSection14({
    initX,
    initY,
    length,
    scale=1,
    lengthBefore=1500 / scale,
    lengthAfter=1500 / scale
}: ISection14) {

  return (
    <g className="s14"> 
        <ExJointSection13
            initX={initX}
            initY={initY}
            length={length}
            scale={scale}
            lengthBefore={lengthBefore}
            lengthAfter={lengthAfter}
        />
        <Start
            initX={initX}
            initY={initY - 169 / scale}
            scale={scale}
        />
        <UpFiting
            initX={initX}
            initY={initY - 1100 / scale}
            scale={scale}
        />
    </g>
  )
}
