import Border from "./Border";
import BaseTable from "./BaseTable";
import { IExpansionJoints, IPagedDim, ISection } from "../../Types/Types";
import Ground from "./Ground";
import StartSection1500 from "./Sections/StartSection1500";
import { useAppSelector } from "../../hooks";
import './Drawing.css'
import calc from "../../Logic/calc";
import RegularSection1500 from "./Sections/RegularSection1500";
import EndSection1500 from "./Sections/EndSection1500";
import RegularSection3000 from "./Sections/RegularSection3000";
import RegularSection1000 from "./Sections/RegularSection1000";
import { useMemo } from "react";
import UniqSection from "./Sections/UniqSection";
import UniqStartSection from "./Sections/UniqStartSection";
import UniqEndSection from "./Sections/UniqEndSection";
import ReducedSection from "./Sections/ReducedSection";


export default function Drawing({ width, height }: IPagedDim) {
    const POLengthData = useAppSelector(state => state.POLength)
    const expansionJoints = useAppSelector((state) => state.expansionJoints);
    const expansionsArr:IExpansionJoints[] = structuredClone(expansionJoints)
    expansionsArr.sort((a, b) => a.position - b.position)

    const plateJoints = useAppSelector(state => state.plateJoints)
    const platesArr = plateJoints.sort((a, b) => a.position - b.position)

    let POCollect: JSX.Element[] = []
    const sections: ISection[] = useMemo(() => calc(POLengthData, expansionsArr, platesArr), [POLengthData, expansionsArr, platesArr])

    // const reducedSections: ISection[] = []
    // let count = 1
    // let name = ''
    // let remLength = 0
    // for (let i = 0; i < sections.length; i++) {
    //   if (sections[i].name === name) {
    //     count ++
    //   } else {
    //     name = sections[i].name
    //     count = 1
    //   }

    //   if (count > 1) {
    //     reducedSections.push({
    //       ...sections[i],
    //       name: 'ReducedSection'
    //     })
    //     remLength -= 1000
    //     while (sections[i].name === name && i < sections.length) {
    //       remLength += sections[i].length
    //       i++
    //     }
    //     i--
    //   } else {
    //     reducedSections.push({
    //       ...sections[i],
    //       initX: sections[i].initX - remLength / POLengthData.scale
    //     })
    //   }

    // }
    if (POLengthData.POLength > 0) {
      sections.forEach(section => {
          if (section.name === 'StartSection1500') {
            POCollect.push(<StartSection1500 initX={section.initX} initY={section.initY} key={section.key} />)
          } else if (section.name === 'RegularSection1500') {
            POCollect.push(<RegularSection1500 initX={section.initX} initY={section.initY} key={section.key} />)
          } else if (section.name === 'RegularSection3000') {
            POCollect.push(<RegularSection3000 initX={section.initX} initY={section.initY} key={section.key} />)
          } else if (section.name === 'RegularSection1000') {
            POCollect.push(<RegularSection1000 initX={section.initX} initY={section.initY} key={section.key} />)
          } else if (section.name === 'EndSection1500') {
            POCollect.push(<EndSection1500 initX={section.initX} initY={section.initY} key={section.key} />)
          } else if (section.name === 'UniqSection') {
            POCollect.push(<UniqSection initX={section.initX} initY={section.initY} length={section.length} addedStatePos={section.addedStatePos} key={section.key} />)
          } else if (section.name === 'UniqStartSection') {
            POCollect.push(<UniqStartSection initX={section.initX} initY={section.initY} length={section.length} addedStatePos={section.addedStatePos} key={section.key} />)
          } else if (section.name === 'UniqEndSection') {
            POCollect.push(<UniqEndSection initX={section.initX} initY={section.initY} length={section.length} addedStatePos={section.addedStatePos} key={section.key} />)
          }  else if (section.name === 'ReducedSection') {
            POCollect.push(<ReducedSection initX={section.initX} initY={section.initY} key={section.key} />)
          }

        })
   
        // console.log(POCollect[0])
    }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: "100%", height: "100%" }}
    >
      <Border width={width} height={height} />
      <BaseTable width={width} height={height} />

      <Ground />
      {POCollect}

    </svg>
  );
}
