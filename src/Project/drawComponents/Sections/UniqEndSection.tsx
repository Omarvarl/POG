import { IUniqSectionData } from "../../../Types/Types"
import '../Drawing.css'
import End from "./End"
import UniqSectionMirror from "./UniqSectionMirror"

export default function UniqEndSection({initX, initY, length, addedStatePos, scale=1, upFiting=()=>{}}:IUniqSectionData) {

  return (
    <g className="ue"> 
        <UniqSectionMirror initX={initX} initY={initY} length={length} addedStatePos={addedStatePos} scale={scale} />
        <End initX={initX} initY={initY - 169 / scale} scale={scale} />
        {upFiting(initX, initY - 1100 / scale, scale)}
    </g>
  )
}
