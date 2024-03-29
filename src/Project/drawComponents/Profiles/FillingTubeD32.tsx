import { IProfile } from "../../../Types/Types"
import '../Drawing.css'

export default function FillingTube({initX, initY, length, scale=1}: IProfile) {

  const profileDiametr = 32 / scale
  return (
    <g>
        <path className="base-line"  //  profile body
          d={`M${initX - profileDiametr / 2} ${initY}
                L${initX + profileDiametr / 2} ${initY}
                L${initX + profileDiametr / 2} ${initY - length}
                L${initX - profileDiametr / 2} ${initY - length}Z
            `}
        />

        <path className="dashed-line"  //  axis
          d={`M${initX} ${initY + 5 / scale}
                L${initX} ${initY - length - 5 / scale}
            `}
        />
    </g>
  )
}
