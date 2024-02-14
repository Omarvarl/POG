import { IUniqSectionData } from "../../../Types/Types"
import '../Drawing.css'
import Start from "./Start"
import ExJointSection5 from "./ExJointSection5"

export default function ExJointSection11({initX, initY, length, addedStatePos, scale=1}:IUniqSectionData) {

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
    </g>
  )
}
