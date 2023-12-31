import { useAppSelector } from "../../../hooks"
import { IProfile } from "../../../Types/Types"
import '../Drawing.css'

export default function StandTube88x58({initX, initY, length}: IProfile) {
  const normalScale =  useAppSelector(state => state.POLength.scale)
  const reducedScale = useAppSelector(state => state.reducedPOLEngth.scale)
  const scale = (reducedScale === 1) ? normalScale : reducedScale
  const profileWidth = 88 / scale
  return (
    <g>
        <path className="base-line-fill"  //  profile body
          d={`M${initX - profileWidth / 2} ${initY}
                L${initX + profileWidth / 2} ${initY}
                L${initX + profileWidth / 2} ${initY - length}
                L${initX - profileWidth / 2} ${initY - length}Z
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
