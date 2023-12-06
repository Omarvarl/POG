import { useAppSelector } from "../../../hooks"
import { IInitCoord } from "../../../Types/Types"

export default function DownFiting({initX, initY }: IInitCoord) {
  const normalScale =  useAppSelector(state => state.POLength.scale)
  const reducedScale = useAppSelector(state => state.reducedPOLEngth.scale)
  const scale = (reducedScale === 1) ? normalScale : reducedScale
  return (
    <g>
        <path className="base-line-fill"  //  fiting contour
          d={`M${initX - 153 / 2 / scale} ${initY}
                L${initX + 153 / 2 / scale} ${initY}
                L${initX + 153 / 2 / scale} ${initY - 45 / scale}
                L${initX + (153 - 25) / 2 / scale} ${initY - 137 / scale}
                L${initX - (153 - 25) / 2 / scale} ${initY - 137 / scale}
                L${initX - (153) / 2 / scale} ${initY - 45 / scale}Z
            `}
        />

        <path className="base-line"  //  down flange
          d={`M${initX - 153 / 2 / scale} ${initY - 10 / scale}
                L${initX + 153 / 2 / scale} ${initY - 10 / scale}
 
            `}
        />

        <path className="base-line"  //  rib left
          d={`M${initX - (153 / 2 - 35) / scale} ${initY - 10 /scale}
                L${initX - (153 / 2 - 35) / scale} ${initY - 137 / scale}
 
            `}
        />

        <path className="base-line"  //  rib left
          d={`M${initX - (153 / 2 - 45) / scale} ${initY - 10 /scale}
                L${initX - (153 / 2 - 45) / scale} ${initY - 137 / scale}
 
            `}
        />

        

        <path className="base-line"  //  rib right
          d={`M${initX + (153 / 2 - 35) / scale} ${initY - 10 /scale}
                L${initX + (153 / 2 - 35) / scale} ${initY - 137 / scale}
 
            `}
        />

        <path className="base-line"  //  rib right
          d={`M${initX + (153 / 2 - 45) / scale} ${initY - 10 /scale}
                L${initX + (153 / 2 - 45) / scale} ${initY - 137 / scale}
 
            `}
        />

        <path className="dashed-line"  //  axis
          d={`M${initX} ${initY + 5 / scale}
                L${initX} ${initY - (137 - 5) / scale}
            `}
        />
    </g>
  )
}
