import { IProfile } from "../../../Types/Types"
import '../Drawing.css'

export default function RailTube88x58({initX, initY, length, scale=1}: IProfile) {

  const profileWidth = 58 / scale
  const profileTickness = 3.5 /scale
  return (
    <g>
        <path className="base-line-fill" //  profile body
          d={`M${initX} ${initY + profileWidth - profileTickness}
                L${initX} ${initY - profileTickness}
                L${initX + length} ${initY - profileTickness}
                L${initX + length} ${initY + profileWidth - profileTickness}Z
            `}

        />

    </g>
  )
}
