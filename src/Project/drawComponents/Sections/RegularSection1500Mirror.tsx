import StandTube88x58 from "../Profiles/StandTube88x58x3.5"
import RailTube88x58 from '../Profiles/RailTube88x58x3.5'
import Crossbar from "../Profiles/CrossbarTube40x40x3"
import DownFiting from "../Profiles/DownFiting"
// import UpFiting from "../Profiles/UpFiting"
import { IInitCoord } from "../../../Types/Types"
import FillingTubesSet from "./FillingTubesSet"
import DimArrow from "../DimArrow"

export default function RegularSection1500_mirror({initX, initY, scale=1, upFiting=()=>{}}:IInitCoord) {  

  const sectionLength = 1500 / scale

  return (
    <g> 
        <FillingTubesSet initX={initX - 1500 /scale} initY={initY} sectionLength={sectionLength} scale={scale} />
        <Crossbar initX={initX - sectionLength} initY={initY - 169 / scale} length={sectionLength} scale={scale}/>
        <Crossbar initX={initX - sectionLength} initY={initY - (169 + 703) / scale} length={sectionLength} scale={scale}/>
        <StandTube88x58 initX={initX} initY={initY} length={1100 / scale} scale={scale} />
        <RailTube88x58 initX={initX - sectionLength} initY={initY - 1100 / scale} length={sectionLength} scale={scale} />
        <DownFiting initX={initX} initY={initY} scale={scale} />
        {upFiting(initX, initY - 1100 / scale, scale)}
        {/* <UpFiting initX={initX} initY={initY - 1100 / scale} scale={scale} /> */}
        <DimArrow
          initX={initX - 1500 / scale}
          initY={initY - 1100 / scale}
          type={{type: 'hor', dir: 'up'}}
          length={1500 / scale}
          indent={150 / scale}
          id={`Section1500_dim_${initX}`}
          key={`Section1500_dim_${initX}`}
          unchange={true}
        />
    </g>
  )
}
