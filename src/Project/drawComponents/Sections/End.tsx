import '../Drawing.css'
import { IProfile } from '../../../Types/Types'
// import { useAppSelector } from '../../../hooks'

export default function Start({initX, initY, scale=1, length}:IProfile) {

    const profileWidth = 58 / scale
    const profileWidth1 = 88 / scale
    const profileTickness = 3.5 / scale
  return (
    <g>
    <path className="base-line-fill"  //  profile 1
      d={`M${initX - profileWidth1 / 2} ${initY + profileWidth / 2}
            L${initX + length} ${initY + profileWidth / 2}
            L${initX + length - profileWidth} ${initY - profileWidth / 2}
            L${initX - profileWidth1 / 2} ${initY - profileWidth / 2}Z
        `}
    />

    <path className="base-line"  //  profile 2
      d={`M${initX + length - profileWidth} ${initY - profileWidth / 2}
            L${initX + length - profileWidth} ${initY - 602 / scale}
            L${initX + length} ${initY - 612 / scale}
            L${initX + length} ${initY + profileWidth / 2}Z
        `}
    />

    <path className="base-line-fill"  //  profile 3
      d={`M${initX} ${initY - (1100 - 169) / scale - profileTickness}
            L${initX + 134 / scale} ${initY - (1100 - 169) / scale - profileTickness}
            L${initX + 93 / scale} ${initY - (1100 - 169) / scale + profileWidth - profileTickness}
            L${initX} ${initY - (1100 - 169) / scale + profileWidth - profileTickness}Z
        `}
    />

    <path className="base-line"  //  profile 4
      d={`M${initX + 134 / scale} ${initY - (1100 - 169) / scale - profileTickness}
            L${initX + length} ${initY - 612 / scale}
            L${initX + length - profileWidth} ${initY - 602 / scale}
            L${initX + 93 / scale} ${initY - (1100 - 169) / scale + profileWidth - profileTickness}Z
        `}
    />
</g>
  )
}
