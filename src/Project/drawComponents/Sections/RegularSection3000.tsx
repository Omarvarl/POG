import { IInitCoord } from "../../../Types/Types"
import RegularSection1500 from "./RegularSection1500"
import DimArrow from "../DimArrow"

export default function RegularSection3000({initX, initY, upFiting, scale=1}:IInitCoord) {

  return (
    <g className="r3000">
        <RegularSection1500 initX={initX} initY={initY} scale={scale} arrow={false} upFiting={upFiting} />
        <RegularSection1500 initX={initX + 1500 / scale} initY={initY} scale={scale} arrow={false} upFiting={upFiting} />
        <DimArrow
          initX={initX}
          initY={initY - 1100 / scale}
          type={{type: 'hor', dir: 'up'}}
          length={3000 / scale}
          indent={150 / scale}
          id={`Section3000_dim_${initX}`}
          key={`Section3000_dim_${initX}`}
          unchange={true}
        />
    </g>
  )
}
