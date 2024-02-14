import { IInitCoord } from "../../../Types/Types"
import '../Drawing.css'
import ExJoint6 from './ExJointSection6'
import End from './End'
import StandTube from '../Profiles/StandTube88x58x3.5'
import UpFiting from '../Profiles/UpFiting'
import DownFiting from '../Profiles/DownFiting'

interface IExSection6 extends IInitCoord {
  length: number,
  arrow?: boolean
}

export default function ExJointSection12({initX, initY, scale=1, arrow=true, length}:IExSection6) {

  return (
    <g className="u12">
        <End
          initX={initX}
          initY={initY - 169 / scale}
          scale={scale}
        />
        <ExJoint6
          initX={initX - length}
          initY={initY}
          scale={scale}
          length={length}
        />
        <StandTube
          initX={initX}
          initY={initY}
          length={1100 / scale}
          scale={scale}
        />
        <UpFiting
          initX={initX}
          initY={initY - 1100 / scale}
          scale={scale}
        />
        <DownFiting
          initX={initX}
          initY={initY}
          scale={scale}
        />
    </g>
  )
}
