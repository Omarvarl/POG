import { IUniqSectionData } from "../../../Types/Types"
import '../Drawing.css'
import ExJointSection13 from "./ExJointSection13"
import End from "./End"
import StandTube from '../Profiles/StandTube88x58x3.5'
import DownFiting from '../Profiles/DownFiting'

interface ISection14 extends IUniqSectionData {
    lengthBefore: number,
    lengthAfter: number
}

export default function ExJointSection15({
    initX,
    initY,
    length,
    scale=1,
    lengthBefore=1500 / scale,
    lengthAfter=1500 / scale,
    upFiting=()=>{}
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
        <StandTube initX={initX + length} initY={initY} length={1100 / scale} scale={scale} />

        <End
            initX={initX + length}
            initY={initY - 169 / scale}
            scale={scale}
        />
        {upFiting(initX, initY - 1100 / scale, scale)}
        <DownFiting initX={initX + length} initY={initY} scale={scale} />
    </g>
  )
}
