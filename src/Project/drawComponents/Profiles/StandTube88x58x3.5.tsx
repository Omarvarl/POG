import { IProfile } from "../../../Types/Types"
import '../Drawing.css'

export default function StandTube88x58({initX, initY, length, scale=1}: IProfile) {

  const profileWidth = 88 / scale
  return (
    <g>
        <path className="base-line-fill"  //  profile body
          d={`M${initX - profileWidth / 2} ${initY}
                L${initX + profileWidth / 2} ${initY}
                L${initX + profileWidth / 2} ${initY - length + 58 / scale}
                L${initX - profileWidth / 2} ${initY - length + 58 / scale}Z
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
