import StandTube88x58 from "../Profiles/StandTube88x58x3.5"
import RailTube88x58 from '../Profiles/RailTube88x58x3.5'
import Crossbar from "../Profiles/CrossbarTube40x40x3"
import DownFiting from "../Profiles/DownFiting"
import UpFiting from "../Profiles/UpFiting"
import { IExJoint } from "../../../Types/Types"
import '../Drawing.css'
import FillingTubesSet from "./FillingTubesSet"
import FillingTube from "../Profiles/FillingTubeD32"
import DimArrow from "../DimArrow"


export default function ExJointSection13({
  initX,
  initY,
  scale=1,
  length=1500 / scale,
  baseLength=1500 / scale
}: IExJoint) {

  var firstLength = (baseLength - length) / 2
  
  return (
    <g className="ex-j-13">

      <FillingTubesSet initX={initX + firstLength} initY={initY} sectionLength={length} scale={scale} />
      <FillingTube initX={initX + firstLength - 334 / scale} initY={initY - 220 / scale} length={600 / scale} scale={scale} />
      <FillingTube initX={initX + firstLength - (334 - 180) / scale} initY={initY - 220 / scale} length={600 / scale} scale={scale} />
      <FillingTube initX={initX + firstLength + length + 335 / scale} initY={initY - 220 / scale} length={600 / scale} scale={scale} />
      <FillingTube initX={initX + firstLength + length + (335 - 180) / scale} initY={initY - 220 / scale} length={600 / scale} scale={scale} />

      <Crossbar initX={initX + firstLength - 350 / scale} initY={initY - 240 / scale} length={length + 700 / scale} scale={scale} />
      <Crossbar initX={initX + firstLength - 350 / scale} initY={initY - (169 + 633) / scale} length={length + 700 / scale} scale={scale} />

      <FillingTubesSet initX={initX} initY={initY} sectionLength={firstLength - 270 / scale} scale={scale} />
      <Crossbar initX={initX} initY={initY - 169 / scale} length={firstLength} scale={scale} />
      <Crossbar initX={initX} initY={initY - (169 + 703) / scale} length={firstLength} scale={scale} />
      <StandTube88x58 initX={initX} initY={initY} length={1100 / scale} scale={scale} />
      <RailTube88x58 initX={initX} initY={initY - 1100 / scale} length={firstLength} scale={scale} />
      <DownFiting initX={initX} initY={initY} scale={scale} />
      <UpFiting initX={initX} initY={initY - 1100 / scale} scale={scale} />
      <StandTube88x58 initX={initX + firstLength} initY={initY} length={1100 / scale} scale={scale} />

      <FillingTubesSet initX={initX + firstLength + length + 270 / scale} initY={initY} sectionLength={firstLength - 270 / scale} scale={scale} />
      <Crossbar initX={initX + firstLength + length} initY={initY - 169 / scale} length={firstLength} scale={scale} />
      <Crossbar initX={initX + firstLength + length} initY={initY - (169 + 703) / scale} length={firstLength} scale={scale} />
      <StandTube88x58 initX={initX + firstLength + length} initY={initY} length={1100 / scale} scale={scale} />
      <RailTube88x58 initX={initX + firstLength + length} initY={initY - 1100 / scale} length={firstLength} scale={scale} />

      <RailTube88x58 initX={initX + firstLength} initY={initY - 1100 / scale} length={length / 2 - 75 / scale } scale={scale} />
      <RailTube88x58 initX={initX + firstLength + length / 2 + 75 / scale } initY={initY - 1100 / scale} length={length / 2 - 75 / scale } scale={scale} />
      <Crossbar initX={initX + firstLength + length / 2 - 75 / scale} initY={initY - 1075 / scale} length={150 / scale} scale={scale} />

      <DownFiting initX={initX + firstLength} initY={initY} scale={scale} />
      <UpFiting initX={initX + firstLength} initY={initY - 1100 / scale} scale={scale} />
      <DownFiting initX={initX + firstLength + length} initY={initY} scale={scale} />
      <UpFiting initX={initX + firstLength + length} initY={initY - 1100 / scale} scale={scale} />

        <DimArrow
          initX={initX}
          initY={initY - 1100 / scale}
          type={{type: 'hor', dir: 'up'}}
          length={firstLength}
          indent={150 / scale}
          id={`ExJoint13_dim1_${initX}`}
          key={`ExJoint13_dim1_${initX}`}
          unchange={true}
        />

        <DimArrow
          initX={initX + firstLength}
          initY={initY - 1100 / scale}
          type={{type: 'hor', dir: 'up'}}
          length={length}
          indent={150 / scale}
          id={`ExJoint13_dim2_${initX}`}
          key={`ExJoint13_dim2_${initX}`}
          unchange={true}
        />

        <DimArrow
          initX={initX + firstLength + length}
          initY={initY - 1100 / scale}
          type={{type: 'hor', dir: 'up'}}
          length={firstLength}
          indent={150 / scale}
          id={`ExJoint13_dim3_${initX}`}
          key={`ExJoint13_dim3_${initX}`}
          unchange={true}
        />
    </g>
  )
}
