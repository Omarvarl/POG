import { IProfile } from "../../../Types/Types"
import '../Drawing.css'

export default function HorizontTubeD32({initX, initY, length, scale=1}: IProfile) {

  const profileDiametr = 32 / scale
  return (
    <g>
        <path className="base-line"  //  profile body
          d={`M${initX} ${initY - profileDiametr / 2}
                L${initX + length} ${initY - profileDiametr / 2}
                L${initX + length} ${initY + profileDiametr / 2}
                L${initX} ${initY + profileDiametr / 2}
            `}
        />
    </g>
  )
}
