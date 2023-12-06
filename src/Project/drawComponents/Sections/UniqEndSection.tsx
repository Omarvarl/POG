// import { IProfile } from "../../../Types/Types"
import { useAppSelector } from "../../../hooks"
import UpFiting from "../Profiles/UpFiting"
import { IUniqSectionData } from "../../../Types/Types"
import '../Drawing.css'
import End from "./End"
import UniqSectionMirror from "./UniqSectionMirror"

export default function UniqEndSection({initX, initY, length, addedStatePos}:IUniqSectionData) {
  const normalScale =  useAppSelector(state => state.POLength.scale)
  const reducedScale = useAppSelector(state => state.reducedPOLEngth.scale)
  const scale = (reducedScale === 1) ? normalScale : reducedScale


  return (
    <g className="ue"> 
        <UniqSectionMirror initX={initX} initY={initY} length={length} addedStatePos={addedStatePos} />
        <End initX={initX} initY={initY - 169 / scale} length={250 / scale}/>
        <UpFiting initX={initX} initY={initY - 1100 / scale} />
    </g>
  )
}
