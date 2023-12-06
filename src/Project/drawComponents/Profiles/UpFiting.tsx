import { useAppSelector } from "../../../hooks"
import { IInitCoord } from "../../../Types/Types"

export default function UpFiting({initX, initY }: IInitCoord) {
  const normalScale =  useAppSelector(state => state.POLength.scale)
  const reducedScale = useAppSelector(state => state.reducedPOLEngth.scale)
  const scale = (reducedScale === 1) ? normalScale : reducedScale
  const fitingLength = 138 / scale
  return (
    <g>
        <path className="base-line-fill"  //  fiting contour
          d={`M${initX - fitingLength / 2} ${initY - 5 / scale}
                L${initX + fitingLength / 2} ${initY - 5 / scale}
                L${initX + fitingLength / 2} ${initY - 5 / scale + 68 / scale}
                L${initX + fitingLength / 2 - 19 /scale} ${initY - 5 / scale + 68 / scale}
                L${initX + fitingLength / 2 - 19 /scale} ${initY - 5 / scale + 80 / scale}
                L${initX - fitingLength / 2 + 19 /scale} ${initY - 5 / scale + 80 / scale}
                L${initX - fitingLength / 2 + 19 /scale} ${initY - 5 / scale + 68 / scale}
                L${initX - fitingLength / 2} ${initY - 5 / scale + 68 / scale}
                Z
            `}
        />
        <path className="dashed-line"  //  axis
          d={`M${initX} ${initY - 10 / scale}
                L${initX} ${initY + 78 / scale}
            `}
        />
    </g>
  )
}
