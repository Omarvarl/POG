import StandTube88x58 from "../Profiles/StandTube88x58x3.5"
import RailTube88x58 from '../Profiles/RailTube88x58x3.5'
import Crossbar from "../Profiles/CrossbarTube40x40x3"
import DownFiting from "../Profiles/DownFiting"
import { IInitCoord } from "../../../Types/Types"
import '../Drawing.css'
import FillingTubesSet from "./FillingTubesSet"
import DimArrow from "../DimArrow"

interface IReducedSection extends IInitCoord {
  countOfReducedSections: number
}

export default function ReducedSection({initX, initY, scale=1, countOfReducedSections, upFiting=()=>{}}:IReducedSection) {
  const sectionLength = 1000 / scale

  return (
    <g className="reduced"> 
        <FillingTubesSet initX={initX} initY={initY} sectionLength={sectionLength} scale={scale} />
        <Crossbar initX={initX} initY={initY - 169 / scale} length={sectionLength} scale={scale}/>
        <Crossbar initX={initX} initY={initY - (169 + 703) / scale} length={sectionLength} scale={scale}/>
        <StandTube88x58 initX={initX} initY={initY} length={1100 / scale} scale={scale} />
        <RailTube88x58 initX={initX} initY={initY - 1100 / scale} length={sectionLength} scale={scale} />
        <DownFiting initX={initX} initY={initY} scale={scale} />
        {upFiting(initX, initY - 1100 / scale, scale)}

        <path className="base-line-fill"
          d={`M${initX + 350 / scale} ${initY + 150 /scale}
                Q${initX + 410 / scale} ${1200 / scale / 4 * 3 + (initY - 1150 / scale)},
                ${initX + 350 / scale} ${1200 / scale / 2 + (initY - 1150 / scale)}
                Q${initX + 290 / scale} ${1200 / scale / 4 + (initY - 1150 / scale)}
                ${initX + 350 / scale} ${initY - 1150 / scale}
                L${initX + 550 / scale} ${initY - 1150 / scale}

                Q${initX + 490 / scale} ${1200 / scale / 4 + (initY - 1150 / scale)},
                ${initX + 550 / scale} ${1200 / scale / 2 + (initY - 1150 / scale)}

                Q${initX + 610 / scale} ${1200 / scale / 4 * 3 + (initY - 1150 / scale)}
                ${initX + 550 / scale} ${initY + 150 / scale}
                L${initX + 550 / scale} ${initY + 150 / scale}Z
            `}
            stroke='white'
            strokeWidth='1'
        />

        <path className="thin-line"
          d={`M${initX + 350 / scale} ${initY + 150 /scale}
                Q${initX + 410 / scale} ${1200 / scale / 4 * 3 + (initY - 1150 / scale)},
                ${initX + 350 / scale} ${1200 / scale / 2 + (initY - 1150 / scale)}
                Q${initX + 290 / scale} ${1200 / scale / 4 + (initY - 1150 / scale)}
                ${initX + 350 / scale} ${initY - 1150 / scale}
            `}
        />
        <path className="thin-line"
          d={`M${initX + 550 / scale} ${initY - 1150 / scale}
                Q${initX + 490 / scale} ${1200 / scale / 4 + (initY - 1150 / scale)},
                ${initX + 550 / scale} ${1200 / scale / 2 + (initY - 1150 / scale)}
                Q${initX + 610 / scale} ${1200 / scale / 4 * 3 + (initY - 1150 / scale)}
                ${initX + 550 / scale} ${initY + 150 / scale}
                L${initX + 550 / scale} ${initY + 150 / scale}
            `}
        />

        <DimArrow
          initX={initX - 3000 / scale}
          initY={initY - 1100 / scale}
          type={{type: 'hor', dir: 'up'}}
          length={4000 / scale}
          indent={500 / scale}
          id={`ReducedSection_dim_${initX}`}
          key={`ReducedSection_dim_${initX}`}
          unchange={true}
          text={`3000x${countOfReducedSections}=${3000 * countOfReducedSections}`}
        />

    </g>
  )
}
