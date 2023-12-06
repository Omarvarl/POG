import Border from "./Border";
import BaseTable from "./BaseTable";
import { IExpansionJoints } from "../../Types/Types";
import Ground from "./Ground";
import { useAppSelector } from "../../hooks";
import './Drawing.css'
import DimArrow from "./DimArrow";


export default function Drawing() {
    const {width, height, factor} = useAppSelector(state => state.realPageSize);
    const scale = useAppSelector((state) => state.POLength.scale);
    const initX = 500
    const initY = 1100 * 2 / scale

    const expansionJoints = useAppSelector((state) => state.expansionJoints);
    const expansionsArr:IExpansionJoints[] = structuredClone(expansionJoints)


    expansionsArr.sort((a, b) => a.position - b.position)



  return (
    <div
      className="drawing"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"

        viewBox={`0 0 ${width * factor} ${(factor === 1) ? height : height * 2}`}
        style={{ width: "100%", height: "100%"}}
      >
        <Border />
        <BaseTable />

        <Ground />
        {/* <DimArrow initX={initX} initY={initY} type={{type: 'hor', dir: 'up'}} length={10000 / scale} indent={1200 / scale} />
        <DimArrow initX={initX} initY={initY} type={{type: 'vert', dir: 'left'}} length={1100 / scale} indent={300 / scale} />
        <DimArrow initX={initX + 10000 / scale} initY={initY} type={{type: 'vert', dir: 'right'}} length={1100 / scale} indent={300 / scale} />
        <DimArrow initX={initX} initY={initY} type={{type: 'vert', dir: 'left'}} length={200 / scale} indent={600 / scale} /> */}

      </svg>
    </div>
  );
}

