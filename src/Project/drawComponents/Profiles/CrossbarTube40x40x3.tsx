import { useAppSelector } from "../../../hooks"
import { IProfile } from "../../../Types/Types"
import '../Drawing.css'

export default function Crossbar({initX, initY, length}: IProfile) {
  const normalScale =  useAppSelector(state => state.POLength.scale)
  const reducedScale = useAppSelector(state => state.reducedPOLEngth.scale)
  const scale = (reducedScale === 1) ? normalScale : reducedScale
  const profileWidth = 40 / scale
  // const profileTickness = 3 /scale
  return (
    <g>
        <path className="base-line-fill"  //  profile body
          d={`M${initX} ${initY + profileWidth / 2}
                L${initX} ${initY - profileWidth / 2}
                L${initX + length} ${initY - profileWidth / 2}
                L${initX + length} ${initY + profileWidth / 2}Z
            `}
        />
    </g>
  )
}
