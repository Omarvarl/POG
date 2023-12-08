// import { useAppSelector } from "../../../hooks"
import StandTube88x58 from "../Profiles/StandTube88x58x3.5"
import RailTube88x58 from '../Profiles/RailTube88x58x3.5'
import Crossbar from "../Profiles/CrossbarTube40x40x3"
import DownFiting from "../Profiles/DownFiting"
import UpFiting from "../Profiles/UpFiting"
import { IInitCoord } from "../../../Types/Types"
import '../Drawing.css'
import FillingTubesSet from "./FillingTubesSet"

export default function ReducedSection({initX, initY, scale}:IInitCoord) {  
  // const normalScale =  useAppSelector(state => state.POLength.scale)
  // const reducedScale = useAppSelector(state => state.reducedPOLEngth.scale)
  // const scale = (reducedScale === 1) ? normalScale : reducedScale
  if (!scale) scale = 1
  const sectionLength = 1000 / scale

  return (
    <g className="r1000"> 
        <FillingTubesSet initX={initX} initY={initY} sectionLength={sectionLength} scale={scale} />
        <Crossbar initX={initX} initY={initY - 169 / scale} length={sectionLength}/>
        <Crossbar initX={initX} initY={initY - (169 + 703) / scale} length={sectionLength}/>
        <StandTube88x58 initX={initX} initY={initY} length={1100 / scale} />
        <RailTube88x58 initX={initX} initY={initY - 1100 / scale} length={sectionLength} />
        <DownFiting initX={initX} initY={initY} />
        <UpFiting initX={initX} initY={initY - 1100 / scale} />

        <path className="base-line-fill"
          d={`M${initX + 350 / scale} ${initY + 50 /scale}
                Q${initX + 410 / scale} ${1200 / scale / 4 * 3 + (initY - 1150 / scale)},
                ${initX + 350 / scale} ${1200 / scale / 2 + (initY - 1150 / scale)}
                Q${initX + 290 / scale} ${1200 / scale / 4 + (initY - 1150 / scale)}
                ${initX + 350 / scale} ${initY - 1150 / scale}
                L${initX + 650 / scale} ${initY - 1150 / scale}

                Q${initX + 590 / scale} ${1200 / scale / 4 + (initY - 1150 / scale)},
                ${initX + 650 / scale} ${1200 / scale / 2 + (initY - 1150 / scale)}

                Q${initX + 710 / scale} ${1200 / scale / 4 * 3 + (initY - 1150 / scale)}
                ${initX + 650 / scale} ${initY + 50 / scale}
                L${initX + 650 / scale} ${initY + 50 / scale}Z
            `}
            stroke='white'
            strokeWidth='1'
        />

        <path className="thin-line"
          d={`M${initX + 350 / scale} ${initY + 50 /scale}
                Q${initX + 410 / scale} ${1200 / scale / 4 * 3 + (initY - 1150 / scale)},
                ${initX + 350 / scale} ${1200 / scale / 2 + (initY - 1150 / scale)}
                Q${initX + 290 / scale} ${1200 / scale / 4 + (initY - 1150 / scale)}
                ${initX + 350 / scale} ${initY - 1150 / scale}
            `}
        />
        <path className="thin-line"
          d={`M${initX + 650 / scale} ${initY - 1150 / scale}
                Q${initX + 590 / scale} ${1200 / scale / 4 + (initY - 1150 / scale)},
                ${initX + 650 / scale} ${1200 / scale / 2 + (initY - 1150 / scale)}
                Q${initX + 710 / scale} ${1200 / scale / 4 * 3 + (initY - 1150 / scale)}
                ${initX + 650 / scale} ${initY + 50 / scale}
                L${initX + 650 / scale} ${initY + 50 / scale}
            `}
        />

        
        {/* <circle
          cx={initX + 250 / scale} cy={initY + 50 /scale} r="5"
          fill="none" stroke="red"
        />

        <circle
          cx={initX + 310 / scale} cy={1200 / scale / 4 * 3 + (initY - 1150 / scale)} r="5"
          fill="none" stroke="red"
        />

        <circle
          cx={initX + 250 / scale} cy={1200 / scale / 2 + (initY - 1150 / scale)} r="5"
          fill="none" stroke="red"
        />
        <circle
          cx={initX + 190 / scale} cy={1200 / scale / 4 + (initY - 1150 / scale)} r="5"
          fill="none" stroke="red"
        />
        <circle
          cx={initX + 250 / scale} cy={initY - 1150 / scale} r="5"
          fill="none" stroke="red"
        /> */}
    </g>
  )
}
