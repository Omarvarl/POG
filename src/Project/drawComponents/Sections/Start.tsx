import '../Drawing.css'
import { IProfile } from '../../../Types/Types'
import { useAppSelector } from '../../../hooks'

export default function Start({initX, initY, length}:IProfile) {
    const scale = useAppSelector(state => state.POLength.scale)
    const profileWidth = 58 / scale
    const profileWidth1 = 88 / scale
  return (
    <g>
    <path className="base-line-fill"  //  profile 1
      d={`M${initX + profileWidth1 / 2} ${initY + profileWidth / 2}
            L${initX - length} ${initY + profileWidth / 2}
            L${initX - length + profileWidth} ${initY - profileWidth / 2}
            L${initX + profileWidth1 / 2} ${initY - profileWidth / 2}Z
        `}
    />

    <path className="base-line-fill"  //  profile 2
      d={`M${initX - length + profileWidth} ${initY - profileWidth / 2}
            L${initX - length + profileWidth} ${initY - 750 / scale}
            L${initX - length} ${initY - 750 / scale}
            L${initX - length} ${initY + profileWidth / 2}Z
        `}
    />


{/* invisible lines */}

<path className="thin-line"
      d={`M${initX + profileWidth1 / 2} ${initY - profileWidth / 2 + 6 / scale}
        L${initX - length + profileWidth} ${initY - profileWidth / 2 + 6 / scale}
        `}
    />

    <path className="thin-line"
      d={`M${initX + profileWidth1 / 2} ${initY + profileWidth / 2 - 6 / scale}
        L${initX - length} ${initY + profileWidth / 2 - 6 / scale}
        `}
    />
</g>
  )
}
