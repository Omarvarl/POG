import UpFiting from "../Profiles/UpFiting"
import { IUniqSectionData } from "../../../Types/Types"
import '../Drawing.css'
import End from "./End"
import UniqSectionMirror from "./UniqSectionMirror"

export default function UniqEndSection({initX, initY, length, addedStatePos, scale=1}:IUniqSectionData) {

  return (
    <g className="ue"> 
        <UniqSectionMirror initX={initX} initY={initY} length={length} addedStatePos={addedStatePos} scale={scale} />
        <End initX={initX} initY={initY - 169 / scale} length={250 / scale} scale={scale} />
        <UpFiting initX={initX} initY={initY - 1100 / scale} scale={scale} />
    </g>
  )
}
