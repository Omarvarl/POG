import StandTube88x58 from "../Profiles/StandTube88x58x3.5"
import RailTube88x58 from '../Profiles/RailTube88x58x3.5'
import Crossbar from "../Profiles/CrossbarTube40x40x3"
import DownFiting from "../Profiles/DownFiting"
// import UpFiting from "../Profiles/UpFiting"
import { IInitCoord } from "../../../Types/Types"
import '../Drawing.css'
import FillingTubesSet from "./FillingTubesSet"
import DimArrow from "../DimArrow"

export default function RegularSection1000({initX, initY, scale=1, upFiting=()=>{}}:IInitCoord) {

  const sectionLength = 1000 / scale

  return (
    <g className="r1000"> 
        <FillingTubesSet initX={initX} initY={initY} sectionLength={sectionLength} scale={scale} />
        <Crossbar initX={initX} initY={initY - 169 / scale} length={sectionLength} scale={scale} />
        <Crossbar initX={initX} initY={initY - (169 + 703) / scale} length={sectionLength} scale={scale} />
        <StandTube88x58 initX={initX} initY={initY} length={1100 / scale} scale={scale} />
        <RailTube88x58 initX={initX} initY={initY - 1100 / scale} length={sectionLength} scale={scale} />
        <DownFiting initX={initX} initY={initY} scale={scale} />
        {/* <UpFiting initX={initX} initY={initY - 1100 / scale} scale={scale} /> */}
        {upFiting(initX, initY - 1100 / scale, scale)}
        <DimArrow
          initX={initX}
          initY={initY - 1100 / scale}
          type={{type: 'hor', dir: 'up'}}
          length={1000 / scale}
          indent={150 / scale}
          id={`Section1000_dim_${initX}`}
          key={`Section1000_dim_${initX}`}
          unchange={true}
        />
    </g>
  )
}
