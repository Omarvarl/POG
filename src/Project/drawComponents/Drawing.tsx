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
import axios from "axios";
// import BorderTest from './Border-TEST'




export default function Drawing() {
    const dispatch = useAppDispatch()
    const {width, height, factor} = useAppSelector(state => state.realPageSize);
    const initX = 700
    const initY = 50

    const POLengthData = useAppSelector(state => state.POLength)
    const currentPlate = useAppSelector(state => state.currentPlate)
    const POLength = POLengthData.POLength
    const expansionJoints = useAppSelector((state) => state.expansionJoints);
    const plateJoints = useAppSelector(state => state.platesJoints)
    const plates = useAppSelector(state => state.plates)
    const expansionsArr:IExpansionJoints[] = structuredClone(expansionJoints);
    const viewBreak = useAppSelector(state => state.viewBreak)

    useEffect(() => {
        dispatch(setSections({POLength, expansionJoints, plateJoints}))
    }, [POLength, expansionJoints, plateJoints, dispatch, viewBreak, currentPlate])

    expansionsArr.sort((a, b) => a.position - b.position)

    useEffect(() => {
       viewBreak
        && dispatch(removeSames())
        // : dispatch(setSections({POLength, expansionJoints, plateJoints}))
        
    }, [viewBreak, dispatch, expansionJoints, plateJoints, currentPlate])

    useEffect(() => {
      console.log(plates)
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
    
    // console.log(viewBreak, POLengthData.reducedScale)
    // console.log(currentPlate)
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

    const SVG = <svg className="svg"
      xmlns="http://www.w3.org/2000/svg"

      viewBox={`0 0 ${width * factor} ${(factor === 1) ? height : height * 2}`}
      style={{ width: "100%", height: "100%"}}
    >
      <Border />
      
      <BaseTable />

      <Ground />
      { drawSections }

    </svg>

    // const [SVG, setSVG] = useState<JSX.Element>(<BorderTest />)

// console.log(scale)
  return (
    <div
      className="drawing"
    >
      { SVG }
      <button onClick={() => {
        axios.post('http://localhost:5000/', {
          // data: JSON.stringify(document.getElementsByClassName('svg')[0].outerHTML)
          // headers: {
          //   'Content-Type': 'application/json;charset=utf-8'
          // },
        }).then((res) => {
          // setSVG(<div dangerouslySetInnerHTML={{__html: res.data}}></div>)
        })

      }}>
        send</button>
    </div>
  );
}


