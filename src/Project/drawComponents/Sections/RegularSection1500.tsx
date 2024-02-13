import StandTube88x58 from "../Profiles/StandTube88x58x3.5"
import RailTube88x58 from '../Profiles/RailTube88x58x3.5'
import Crossbar from "../Profiles/CrossbarTube40x40x3"
import DownFiting from "../Profiles/DownFiting"
import UpFiting from "../Profiles/UpFiting"
import { IInitCoord } from "../../../Types/Types"
import '../Drawing.css'
import FillingTubesSet from "./FillingTubesSet"
import DimArrow from "../DimArrow"

interface ISection1500 extends IInitCoord {
  arrow?: boolean
}

export default function RegularSection1500({initX, initY, scale=1, arrow=true}:ISection1500) {

  const sectionLength = 1500 / scale
  const dimArrow = arrow
  ? <DimArrow
    initX={initX}
    initY={initY - 1100 / scale}
    type={{type: 'hor', dir: 'up'}}
    length={1500 / scale}
    indent={150 / scale}
    id={`Section1500_dim_${initX}`}
    key={`Section1500_dim_${initX}`}
    unchange={true}
  />
 : <></>

  return (
    <g className="r1500">
        <FillingTubesSet initX={initX} initY={initY} sectionLength={sectionLength} scale={scale} />
        <Crossbar initX={initX} initY={initY - 169 / scale} length={sectionLength} scale={scale} />
        <Crossbar initX={initX} initY={initY - (169 + 703) / scale} length={sectionLength} scale={scale} />
        <StandTube88x58 initX={initX} initY={initY} length={1100 / scale} scale={scale} />
        <RailTube88x58 initX={initX} initY={initY - 1100 / scale} length={sectionLength} scale={scale} />
        <DownFiting initX={initX} initY={initY} scale={scale} />
        <UpFiting initX={initX} initY={initY - 1100 / scale} scale={scale} />
        { dimArrow }
    </g>
  )
}
