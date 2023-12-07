import Border from "./Border";
import BaseTable from "./BaseTable";
import { IExpansionJoints } from "../../Types/Types";
import Ground from "./Ground";
import { useAppSelector } from "../../hooks";
import './Drawing.css'
import calc from "../../Logic/calc";
import StartSection1500 from "./Sections/StartSection1500";
import EndSection1500 from "./Sections/EndSection1500";
import RegularSection3000 from "./Sections/RegularSection3000";
import RegularSection1500 from "./Sections/RegularSection1500";
import RegularSection1000 from "./Sections/RegularSection1000";
import UniqSection from "./Sections/UniqSection";
import UniqStartSection from "./Sections/UniqStartSection";
import UniqEndSection from "./Sections/UniqEndSection";


export default function Drawing() {
    const {width, height, factor} = useAppSelector(state => state.realPageSize);
    const scale = useAppSelector((state) => state.POLength.scale);
    const initX = 200 + 1500 / scale
    // const initY = 1200 * 2 / scale

    const POLengthData = useAppSelector(state => state.POLength)
    const expansionJoints = useAppSelector((state) => state.expansionJoints);
    const plateJoints = useAppSelector(state => state.platesJoints)
    const plates = useAppSelector(state => state.plates)
    const expansionsArr:IExpansionJoints[] = structuredClone(expansionJoints);
    const sections = calc(POLengthData, expansionJoints, plateJoints, plates)


    expansionsArr.sort((a, b) => a.position - b.position)

    const drawSections = sections.map(section => {
      if (section.name === 'StartSection1500') {
        return <StartSection1500 initX={initX + section.initX / scale} initY={section.initY} />
      } else if (section.name === 'EndSection1500') {
        return <EndSection1500 initX={initX + section.initX / scale} initY={section.initY} />
      } else if (section.name === 'RegularSection3000') {
        return <RegularSection3000 initX={initX + section.initX / scale} initY={section.initY} />
      } else if (section.name === 'RegularSection1500') {
        return <RegularSection1500 initX={initX + section.initX / scale} initY={section.initY} />
      } else if (section.name === 'RegularSection1000') {
        return <RegularSection1000 initX={initX + section.initX / scale} initY={section.initY} />
      } else if (section.name === 'UniqSection') {
        return <UniqSection initX={initX + section.initX / scale} initY={section.initY} length={section.length} addedStatePos={section.addedStatePos} />
      } else if (section.name === 'UniqStartSection') {
        return <UniqStartSection initX={initX + section.initX / scale} initY={section.initY} length={section.length} addedStatePos={section.addedStatePos} />
      } else if (section.name === 'UniqEndSection') {
        return <UniqEndSection initX={initX + section.initX / scale} initY={section.initY} length={section.length} addedStatePos={section.addedStatePos} />
      }
    })



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
        { drawSections }


      </svg>
    </div>
  );
}

