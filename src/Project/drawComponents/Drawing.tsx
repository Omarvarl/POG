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
import { setSections, removeSames } from "../../store/platesSlice";
import { setReducedLength } from "../../store/POLengthSlice";
import calc from "../../Logic/calc";
import ExJointSection13 from "./Sections/ExJointSection13";



export default function Drawing() {
    const dispatch = useAppDispatch()
    const {width, height, factor} = useAppSelector(state => state.realPageSize);
    const initX = 700


    const POLengthData = useAppSelector(state => state.POLength)
    const currentPlate = useAppSelector(state => state.currentPlate)
    const POLength = POLengthData.POLength
    const expansionJoints = useAppSelector((state) => state.expansionJoints);
    const plateJoints = useAppSelector(state => state.platesJoints)
    const plates = useAppSelector(state => state.plates)
    const expansionsArr:IExpansionJoints[] = structuredClone(expansionJoints);
    const viewBreak = useAppSelector(state => state.viewBreak)
    const realPageSize = useAppSelector(state => state.realPageSize)
    const pageSize = useAppSelector(state => state.pageSize)
    var {start, end} = useAppSelector(state => state.overnahgs)

    const pageParams = useAppSelector(state => state.realPageSize)

    useEffect(() => {
        dispatch(setSections({POLength, expansionJoints, plateJoints}))

    }, [
      // POLength,
      expansionJoints,
      plateJoints,
      dispatch,
      viewBreak,
      currentPlate,
      realPageSize,
      pageSize
    ])

    expansionsArr.sort((a, b) => a.position - b.position)

    useEffect(() => {
       viewBreak && dispatch(removeSames())
        
    }, [viewBreak, dispatch, expansionJoints, plateJoints, currentPlate, realPageSize])

    useEffect(() => {
      // console.log(plates)
      if (viewBreak) {
        const reducedLength = plates[0].reducedPosition
          + plates.reduce(
            (acc, plate) => acc += plate.sections
              .reduce(
              (acc2, section) => acc2 += section.length
            , 0)
          , 500)
        dispatch(setReducedLength(reducedLength))
      }
    }, [plates, dispatch, viewBreak, currentPlate])

    const scale = (viewBreak) ? POLengthData.reducedScale : POLengthData.scale

    const initY = realPageSize.height / 2 * (realPageSize.factor > 1 ? 2 : 1)

    const drawSections = plates.map(plate => {
      if (plate.sections && plate.sections.length > 0) {
        return plate.sections.map(section => {
          if (section.name === 'StartSection1500') {
            return <StartSection1500 initX={initX + section.initX / scale} initY={initY} scale={scale} key={section.key} />
          } else if (section.name === 'EndSection1500') {
            return <EndSection1500 initX={initX + section.initX / scale} initY={initY} scale={scale} key={section.key} />
          } else if (section.name === 'RegularSection3000') {
            return <RegularSection3000 initX={initX + section.initX / scale} initY={initY} scale={scale} key={section.key} />
          } else if (section.name === 'RegularSection1500') {
            return <RegularSection1500 initX={initX + section.initX / scale} initY={initY} scale={scale} key={section.key} />
          } else if (section.name === 'RegularSection1000') {
            return <RegularSection1000 initX={initX + section.initX / scale} initY={initY} scale={scale} key={section.key} />
          } else if (section.name === 'UniqSection') {
            return <UniqSection initX={initX + section.initX / scale} initY={initY} scale={scale} length={section.length} addedStatePos={section.addedStatePos} key={section.key} />
          } else if (section.name === 'UniqStartSection') {
            return <UniqStartSection initX={initX + section.initX / scale} initY={initY} scale={scale} length={section.length} addedStatePos={section.addedStatePos} key={section.key} />
          } else if (section.name === 'UniqEndSection') {
            return <UniqEndSection initX={initX + section.initX / scale} initY={initY} scale={scale} length={section.length} addedStatePos={section.addedStatePos} key={section.key} />
          } else if (section.name === 'ReducedSection') {
            return <ReducedSection initX={initX + section.initX / scale} initY={initY} scale={scale} key={section.key} />
          } else if (section.name === 'ExJoint13') {
            return <ExJointSection13
              initX={initX + section.initX / scale}
              initY={initY}
              scale={scale}
              length={section.addedStatePos ? section.addedStatePos / scale : 1500 / scale}
              baseLength={section.length / scale}
              key={section.key} 
            />
          } else return <></>
        })
      } else {
        return []
      }
    })
    // console.log(expansionJoints, plates, plateJoints)

    const SVG = <svg className="svg"
      xmlns="http://www.w3.org/2000/svg"

      viewBox={`0 0 ${width * factor} ${(factor === 1) ? height : height * 2}`}
      style={{ width: "100%", height: "100%"}}
    >
      <Border />
      
      <BaseTable scale={scale}/>

      <Ground />
      { drawSections }
      {/* <ExJointSection13 initX={500} initY={2000} scale={scale} length={4000 / scale} baseLength={1200 / scale} /> */}

    </svg>

    var exJointMark = 0
    var exJointsCount = 0
    var move = 32
    function getDesignation(name: string, position: number, length: number): {number: string, name:string} | undefined {
      var pattern = 'ЦРНС.305112.001.'
      var count = 0
      for (let ej of expansionJoints) {
        const leftPosOfjoint = ej.position - ej.left
        if (exJointMark) {
          exJointMark = 0
          console.log(move)
          if (move <= 32)
            return {number: ((exJointsCount < 10) ? pattern + '06-0' + exJointsCount : pattern + '06-' + exJointsCount), name: 'ПО-6'}
          else if (move > 32 && move <= 55)
            return {number: ((exJointsCount < 10) ? pattern + '20-0' + exJointsCount : pattern + '20-' + exJointsCount), name: 'ПО-20'}
        }
        if (position < leftPosOfjoint && position + length > leftPosOfjoint) {
          exJointMark = 1
          exJointsCount++
          if (ej.move) move = ej.move

          if (ej.move && ej.move <= 32)
            return {number: ((exJointsCount< 10) ? pattern + '05-0' + exJointsCount : pattern + '05-' + exJointsCount), name: 'ПО-5'}
          else if (ej.move && ej.move > 32 && ej.move <= 55)
            return {number: ((exJointsCount< 10) ? pattern + '19-0' + exJointsCount : pattern + '19-' + exJointsCount), name: 'ПО-19'}
          else if (ej.move && ej.move > 55) {
            exJointMark = 0
            return {number: ((exJointsCount< 10) ? pattern + '13-0' + exJointsCount : pattern + '13-' + exJointsCount), name: 'ПО-13'}
          }
        }
      }

      if (name.includes('StartSection')) {
        if (start.type === 'withBevel') {
          if (!start.filling) {
            return {number: pattern + '01', name: 'ПО-1'}
          } else {
            return {number: pattern + '01', name: 'ПО-1 Lout'}
          }
        } else {
          if (!start.filling) {
            return {number: pattern + '07', name: 'ПО-7'}
          } else {
            return {number: pattern + '07', name: 'ПО-7 Lout'}
          }
        }
      } else if (name.includes('RegularSection3000')) return {number: pattern + '04', name: 'ПО-4'}
      else if (name.includes('RegularSection')) return {number: pattern + '03', name: 'ПО-3'}
      else if (name.includes('EndSection')) {
        if (end.type === 'withBevel') {
          if (!end.filling) {
            return {number: pattern + '02', name: 'ПО-2'}
          } else {
            return {number: pattern + '02', name: 'ПО-2 Lout'}
          }
        } else {
          if (!end.filling) {
            return {number: pattern + '08', name: 'ПО-8'}
          } else {
            return {number: pattern + '08', name: 'ПО-8 Lout'}
          }
        }
      }
      else if (name.includes('UniqSection')) {
        count++
        return {number: ((count < 10) ? pattern + '03-0' + count : pattern + '03-' + count), name: 'ПО-3'}
      }
      else return undefined
    }


  function makeJSON() {
    const fullPlatesList = calc(POLength, expansionJoints, plateJoints, plates)
    console.log(fullPlatesList)
    const sections = fullPlatesList.map((section, index) => {
      const {number, name} = getDesignation(section.name, section.initX, section.length) || {number: 'null', name: 'null'}
      return {
        id: index + 1,
        number: number,
        name: name,
        x: section.initX,
        y: section.initY,
        lTotal: section.length,
        lLeft: section.name.includes('StartSection')
          ? start.length
          : section.name.includes('EndSection')
            ? end.length
            : undefined,
        l: section.addedStatePos || section.length
      }
    })
    const result = {
      page: {
        format: pageParams.format,
        factor: pageParams.factor
      },
      shortView: viewBreak,
      stamp: {},
      expansionJoints: expansionJoints,
      plateJoints: plateJoints,
      sections: sections
    }

    return result
  }

  // console.log(plates, expansionJoints)

  return (
    <div
      className="drawing"
    >
      { SVG }
      <button onClick={() => console.log(makeJSON())}>
        send</button>
    </div>
  );
}


