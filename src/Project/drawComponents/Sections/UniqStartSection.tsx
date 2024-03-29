import { IUniqSectionData } from "../../../Types/Types"
import '../Drawing.css'
import Start from "./Start"
import UniqSection from "./UniqSection"

export default function UniqStartSection({initX, initY, length, addedStatePos, scale=1, upFiting=()=>{}}:IUniqSectionData) {

  return (
    <g className="us"> 
        <UniqSection initX={initX} initY={initY} length={length} addedStatePos={addedStatePos} scale={scale} />
        <Start initX={initX} initY={initY - 169 / scale} scale={scale} />
        {upFiting(initX, initY - 1100 / scale, scale)}
    </g>
  )
}
