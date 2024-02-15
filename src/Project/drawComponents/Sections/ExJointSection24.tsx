
import { IInitCoord } from "../../../Types/Types"
import '../Drawing.css'
import ExJointSection20 from './ExJointSection20'
import End from './End'
import StandTube from '../Profiles/StandTube88x58x3.5'
import UpFiting from '../Profiles/UpFiting'
import DownFiting from '../Profiles/DownFiting'

interface IExSection6 extends IInitCoord {
  length: number,
  end: number | undefined,
  arrow?: boolean
}

export default function ExJointSection24({initX, initY, scale=1, arrow=true, end=0, length}:IExSection6) {

  return (
    <g className="e24">
      <ExJointSection20
        initX={initX - length}
        initY={initY}
        scale={scale}
        end={end}
        length={length}
      />
      <StandTube
        initX={initX}
        initY={initY}
        length={1100 / scale}
        scale={scale}
      />
      <End
        initX={initX}
        initY={initY - 169 / scale}
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
