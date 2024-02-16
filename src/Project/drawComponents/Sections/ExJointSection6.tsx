import StandTube88x58 from "../Profiles/StandTube88x58x3.5"
import RailTube88x58 from '../Profiles/RailTube88x58x3.5'
import Crossbar from "../Profiles/CrossbarTube40x40x3"
import DownFiting from "../Profiles/DownFiting"
import { IInitCoord } from "../../../Types/Types"
import '../Drawing.css'
import FillingTubesSet from "./FillingTubesSet"
import DimArrow from "../DimArrow"
import HorizontTubeD32 from '../Profiles/HorizontTubeD32'

interface IExSection6 extends IInitCoord {
  length: number,
  arrow?: boolean
}

export default function ExJointSection6({initX, initY, scale=1, arrow=true, length, upFiting=()=>{}}:IExSection6) {


  const dimArrow = arrow
  ? <DimArrow
    initX={initX}
    initY={initY - 1100 / scale}
    type={{type: 'hor', dir: 'up'}}
    length={length}
    indent={150 / scale}
    id={`ExJoint6_dim_${initX}`}
    key={`ExJoint6_dim_${initX}`}
    unchange={true}
  />
 : <></>

  return (
    <g className="u6">
        <FillingTubesSet initX={initX} initY={initY} sectionLength={length} scale={scale} />
        <Crossbar initX={initX} initY={initY - 169 / scale} length={length} scale={scale} />
        <Crossbar initX={initX} initY={initY - (169 + 703) / scale} length={length} scale={scale} />
        <StandTube88x58 initX={initX} initY={initY} length={1100 / scale} scale={scale} />
        <RailTube88x58 initX={initX} initY={initY - 1100 / scale} length={length} scale={scale} />
        <RailTube88x58 initX={initX - 150 / scale} initY={initY - 1100 / scale} length={150 / scale} scale={scale} />
        <HorizontTubeD32 initX={initX - 70 / scale} initY={initY - 169 / scale} length={26 / scale} scale={scale} />
        <HorizontTubeD32 initX={initX - 70 / scale} initY={initY - (169 + 703) / scale} length={26 / scale} scale={scale} />
        <DownFiting initX={initX} initY={initY} scale={scale} />
        {upFiting(initX, initY - 1100 / scale, scale)}
        { dimArrow }
    </g>
  )
}
