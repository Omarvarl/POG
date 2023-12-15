import Border from "./Border";
import BaseTable from "./BaseTable";
import {IExpansionJoints } from "../../Types/Types";
import Ground from "./Ground";
import { useAppDispatch, useAppSelector } from "../../hooks";
import './Drawing.css'
import StartSection1500 from "./Sections/StartSection1500";
import EndSection1500 from "./Sections/EndSection1500";
import RegularSection3000 from "./Sections/RegularSection3000";
import RegularSection1500 from "./Sections/RegularSection1500";
import RegularSection1000 from "./Sections/RegularSection1000";
import UniqSection from "./Sections/UniqSection";
import UniqStartSection from "./Sections/UniqStartSection";
import UniqEndSection from "./Sections/UniqEndSection";
import { useEffect } from "react";
import ReducedSection from "./Sections/ReducedSection";
// import { setReducedPOLength } from "../../store/reducedPOLengthSlice";
import { setSections, removeSames } from "../../store/platesSlice";


export default function Drawing() {
    const dispatch = useAppDispatch()
    const {width, height, factor} = useAppSelector(state => state.realPageSize);
    const initX = 700
    const initY = 50

    const POLengthData = useAppSelector(state => state.POLength)
    const POLength = POLengthData.POLength
    let scale = POLengthData.scale
    const reducedScale = useAppSelector(state => state.reducedPOLEngth.scale)
    const expansionJoints = useAppSelector((state) => state.expansionJoints);
    const plateJoints = useAppSelector(state => state.platesJoints)
    const plates = useAppSelector(state => state.plates)
    const expansionsArr:IExpansionJoints[] = structuredClone(expansionJoints);
    const viewBreak = useAppSelector(state => state.viewBreak)

    useEffect(() => {
      dispatch(setSections({POLength, expansionJoints, plateJoints}))
    }, [POLength, expansionJoints, plateJoints, dispatch])

    expansionsArr.sort((a, b) => a.position - b.position)

    useEffect(() => {
      if (viewBreak) {
          dispatch(removeSames())
        }
    }, [viewBreak, dispatch])


    if (reducedScale > 1) scale = reducedScale

    // console.log(drawPlates)

    const drawSections = plates.map(plate => {
      if (plate.sections && plate.sections.length > 0) {
        return plate.sections.map(section => {
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
          } else if (section.name === 'ReducedSection') {
            return <ReducedSection initX={initX + section.initX / scale} initY={initY + section.initY} scale={scale} key={section.key} />
          } else return <></>
        })
      } else {
        return []
      }
    })
    // console.log(drawPlates)

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

