// import { useAppSelector } from "../../../hooks"
import UpFiting from "../Profiles/UpFiting"
import { IUniqSectionData } from "../../../Types/Types"
import '../Drawing.css'
import Start from "./Start"
import UniqSection from "./UniqSection"

export default function UniqStartSection({initX, initY, length, addedStatePos, scale}:IUniqSectionData) {
  // const normalScale =  useAppSelector(state => state.POLength.scale)
  // const reducedScale = useAppSelector(state => state.reducedPOLEngth.scale)
  // const scale = (reducedScale === 1) ? normalScale : reducedScale
  if (!scale) scale = 1

  return (
    <g className="us"> 
        <UniqSection initX={initX} initY={initY} length={length} addedStatePos={addedStatePos} scale={scale} />
        <Start initX={initX} initY={initY - 169 / scale} length={250 / scale} scale={scale} />
        <UpFiting initX={initX} initY={initY - 1100 / scale} />
    </g>
  )
}
