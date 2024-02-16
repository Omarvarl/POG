import { IUniqSectionData } from "../../../Types/Types"
import '../Drawing.css'
import Start from "./Start"
import ExJointSection5 from "./ExJointSection5"

export default function ExJointSection11({initX, initY, length, addedStatePos=0, scale=1, upFiting=()=>{}}:IUniqSectionData) {

  return (
    <g className="s5">
        <Start initX={initX} initY={initY - 169 / scale} scale={scale} />
        
        <ExJointSection5
            initX={initX}
            initY={initY}
            length={length}
            addedStatePos={addedStatePos}
            scale={scale}
        />
        {upFiting(initX, initY - 1100 / scale, scale)}
        {upFiting(initX + addedStatePos / scale, initY - 1100 / scale, scale)}
    </g>
  )
}
