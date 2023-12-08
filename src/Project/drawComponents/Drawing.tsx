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
import DimArrow from "./DimArrow";
import { useMemo } from "react";


export default function Drawing() {
    const {width, height, factor} = useAppSelector(state => state.realPageSize);
    const scale = useAppSelector(state => state.POLength.scale);
    const initX = 700
    const initY = 50

    const POLengthData = useAppSelector(state => state.POLength)
    const POLength = POLengthData.POLength
    const expansionJoints = useAppSelector((state) => state.expansionJoints);
    const plateJoints = useAppSelector(state => state.platesJoints)
    const plates = useAppSelector(state => state.plates)
    const expansionsArr:IExpansionJoints[] = structuredClone(expansionJoints);
    const sections = useMemo(() => calc(POLength, expansionJoints, plateJoints, plates), [POLength, expansionJoints, plateJoints, plates])


    const jointsDimLeft = useMemo(() => {
      return plates.map(elm => {
      let result = <></>
      sections.forEach(section => {
        result = <DimArrow
        initX={initX + elm.position / scale}
        initY={initY + section.initY}
        type={{type: 'hor', dir: 'down'}}
        length={elm.left / scale}
        indent={260}
        id={`leftDim_${elm.id}`}
        key={`leftDim_${elm.id}`}
      />
      })
      return result
      })
    }, [plates, scale, sections])

    const jointsDimRight = useMemo(() => {
      return plates.map(elm => {
      let result = <></>
      sections.forEach(section => {
        result = <DimArrow
        initX={initX + (elm.position + elm.length - elm.right) / scale}
        initY={initY + section.initY}
        type={{type: 'hor', dir: 'down'}}
        length={elm.right / scale}
        indent={150}
        id={`rightDim_${elm.id}`}
        key={`rightDim_${elm.id}`}
      />
      })
      return result
      })
  }, [plates, scale, sections])


    expansionsArr.sort((a, b) => a.position - b.position)

    const drawSections = sections.map(section => {
      if (section.name === 'StartSection1500') {
        return <StartSection1500 initX={initX + section.initX / scale} initY={initY + section.initY} scale={scale} key={section.key} />
      } else if (section.name === 'EndSection1500') {
        return <EndSection1500 initX={initX + section.initX / scale} initY={initY + section.initY} scale={scale} key={section.key} />
      } else if (section.name === 'RegularSection3000') {
        return <RegularSection3000 initX={initX + section.initX / scale} initY={initY + section.initY} scale={scale} key={section.key} />
      } else if (section.name === 'RegularSection1500') {
        return <RegularSection1500 initX={initX + section.initX / scale} initY={initY + section.initY} scale={scale} key={section.key} />
      } else if (section.name === 'RegularSection1000') {
        return <RegularSection1000 initX={initX + section.initX / scale} initY={initY + section.initY} scale={scale} key={section.key} />
      } else if (section.name === 'UniqSection') {
        return <UniqSection initX={initX + section.initX / scale} initY={initY + section.initY} scale={scale} length={section.length} addedStatePos={section.addedStatePos} key={section.key} />
      } else if (section.name === 'UniqStartSection') {
        return <UniqStartSection initX={initX + section.initX / scale} initY={initY + section.initY} scale={scale} length={section.length} addedStatePos={section.addedStatePos} key={section.key} />
      } else if (section.name === 'UniqEndSection') {
        return <UniqEndSection initX={initX + section.initX / scale} initY={initY + section.initY} scale={scale} length={section.length} addedStatePos={section.addedStatePos} key={section.key} />
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
        { jointsDimLeft }
        { jointsDimRight }


      </svg>
    </div>
  );
}

