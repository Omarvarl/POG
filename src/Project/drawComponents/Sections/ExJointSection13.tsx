import StandTube88x58 from "../Profiles/StandTube88x58x3.5"
import RailTube88x58 from '../Profiles/RailTube88x58x3.5'
import Crossbar from "../Profiles/CrossbarTube40x40x3"
import DownFiting from "../Profiles/DownFiting"
import { IExJoint } from "../../../Types/Types"
import '../Drawing.css'
import FillingTubesSet from "./FillingTubesSet"
import FillingTube from "../Profiles/FillingTubeD32"
import DimArrow from "../DimArrow"


export default function ExJointSection13({
  initX,
  initY,
  scale=1,
  length=4000 / scale,
  lengthBefore=1500 / scale,
  lengthAfter=1500 / scale,
  upFiting=()=>{}
}: IExJoint) {
  var centralLength = length - lengthBefore - lengthAfter
  return (
    <g className="u13">

      <FillingTubesSet initX={initX + lengthBefore} initY={initY} sectionLength={centralLength} scale={scale} />
      <FillingTube initX={initX + lengthBefore - 334 / scale} initY={initY - 220 / scale} length={600 / scale} scale={scale} />
      <FillingTube initX={initX + lengthBefore - (334 - 180) / scale} initY={initY - 220 / scale} length={600 / scale} scale={scale} />

      <FillingTube initX={initX + length - lengthAfter + 334 / scale} initY={initY - 220 / scale} length={600 / scale} scale={scale} />
      <FillingTube initX={initX + length - lengthAfter + (335 - 180) / scale} initY={initY - 220 / scale} length={600 / scale} scale={scale} />

      <Crossbar initX={initX + lengthBefore - 350 / scale} initY={initY - 240 / scale} length={centralLength + 700 / scale} scale={scale} />
      <Crossbar initX={initX + lengthBefore - 350 / scale} initY={initY - (169 + 633) / scale} length={centralLength + 700 / scale} scale={scale} />

      <FillingTubesSet initX={initX} initY={initY} sectionLength={lengthBefore - 270 / scale} scale={scale} />
      <Crossbar initX={initX} initY={initY - 169 / scale} length={lengthBefore} scale={scale} />
      <Crossbar initX={initX} initY={initY - (169 + 703) / scale} length={lengthBefore} scale={scale} />
      <StandTube88x58 initX={initX} initY={initY} length={1100 / scale} scale={scale} />
      <RailTube88x58 initX={initX} initY={initY - 1100 / scale} length={lengthBefore} scale={scale} />
      <DownFiting initX={initX} initY={initY} scale={scale} />
      {upFiting(initX, initY - 1100 / scale, scale)}
      <StandTube88x58 initX={initX + lengthBefore} initY={initY} length={1100 / scale} scale={scale} />

      <FillingTubesSet initX={initX + length - lengthAfter + 270 / scale} initY={initY} sectionLength={lengthAfter - 270 / scale} scale={scale} />
      <Crossbar initX={initX + length - lengthAfter} initY={initY - 169 / scale} length={lengthAfter} scale={scale} />
      <Crossbar initX={initX + length - lengthAfter} initY={initY - (169 + 703) / scale} length={lengthAfter} scale={scale} />
      <StandTube88x58 initX={initX + length - lengthAfter} initY={initY} length={1100 / scale} scale={scale} />
      <RailTube88x58 initX={initX + length - lengthAfter} initY={initY - 1100 / scale} length={lengthAfter} scale={scale} />

      <RailTube88x58 initX={initX + lengthBefore} initY={initY - 1100 / scale} length={centralLength / 2 - 75 / scale } scale={scale} />
      <RailTube88x58 initX={initX + lengthBefore + centralLength / 2 + 75 / scale } initY={initY - 1100 / scale} length={centralLength / 2 - 75 / scale } scale={scale} />
      <Crossbar initX={initX + lengthBefore + centralLength / 2 - 75 / scale} initY={initY - 1075 / scale} length={150 / scale} scale={scale} />

      <DownFiting initX={initX + lengthBefore} initY={initY} scale={scale} />
      {upFiting(initX + lengthBefore, initY - 1100 / scale, scale)}
      <DownFiting initX={initX + length - lengthAfter} initY={initY} scale={scale} />
      {upFiting(initX + length, initY - 1100 / scale, scale)}

        <DimArrow
          initX={initX}
          initY={initY - 1100 / scale}
          type={{type: 'hor', dir: 'up'}}
          length={lengthBefore}
          indent={150 / scale}
          id={`ExJoint13_dim1_${initX}`}
          key={`ExJoint13_dim1_${initX}`}
          unchange={true}
        />

        <DimArrow
          initX={initX + lengthBefore}
          initY={initY - 1100 / scale}
          type={{type: 'hor', dir: 'up'}}
          length={centralLength}
          indent={150 / scale}
          id={`ExJoint13_dim2_${initX}`}
          key={`ExJoint13_dim2_${initX}`}
          unchange={true}
        />

        <DimArrow
          initX={initX}
          initY={initY - 1100 / scale}
          type={{type: 'hor', dir: 'up'}}
          length={length}
          indent={500 / scale}
          id={`ExJoint13_dim3_${initX}`}
          key={`ExJoint13_dim3_${initX}`}
          unchange={true}
        />
    </g>
  )
}
