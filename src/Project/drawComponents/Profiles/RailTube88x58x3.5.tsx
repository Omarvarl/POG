import { useAppSelector } from "../../../hooks"
import { IProfile } from "../../../Types/Types"
import '../Drawing.css'

export default function RailTube88x58({initX, initY, length}: IProfile) {
  const scale = useAppSelector(state => state.POLength.scale)
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


    {/* invisible lines */}

        <path className="thin-line"
          d={`M${initX} ${initY + profileWidth - profileTickness - 6 / scale}
            L${initX + length} ${initY + profileWidth - profileTickness - 6 / scale}
            `}
        />

        <path className="thin-line"
          d={`M${initX} ${initY - profileTickness + 6 / scale}
          L${initX + length} ${initY - profileTickness + 6 / scale}
          `}
        />
    </g>
  )
}
