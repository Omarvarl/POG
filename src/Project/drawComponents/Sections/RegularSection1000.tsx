// import { useAppSelector } from "../../../hooks"
import StandTube88x58 from "../Profiles/StandTube88x58x3.5"
import RailTube88x58 from '../Profiles/RailTube88x58x3.5'
import Crossbar from "../Profiles/CrossbarTube40x40x3"
import DownFiting from "../Profiles/DownFiting"
import UpFiting from "../Profiles/UpFiting"
import { IInitCoord } from "../../../Types/Types"
import '../Drawing.css'
import FillingTubesSet from "./FillingTubesSet"

export default function RegularSection1000({initX, initY, scale}:IInitCoord) {
  // const normalScale =  useAppSelector(state => state.POLength.scale)
  // const reducedScale = useAppSelector(state => state.reducedPOLEngth.scale)
  // const scale = (reducedScale === 1) ? normalScale : reducedScale
  if (!scale) scale = 1
  const sectionLength = 1000 / scale

    // const getFillingTubes = ():JSX.Element[] => {
    //   const tubesInterval = 181 / scale
    //   const positions: number[] = []
    //   let fillingTubes:JSX.Element[] = []
    //   let tubesQuantity = Math.floor((sectionLength - 88 / scale) / tubesInterval) - 1

    //   const firstPosition = (sectionLength - tubesQuantity * filingInterval) / 2
      
    //   positions.push(firstPosition)
    //   for (let i = 0; i < tubesQuantity; i++) {
    //       positions.push(positions[i] + tubesInterval)
    //   }

    //   positions.forEach(pos => {
    //       fillingTubes.push(<FillingTube initX={initX + pos} initY={initY - 169 / scale} length={703 / scale} key={`tubes-${pos}`}/>)
    //   })
    //   return fillingTubes
  // }


  return (
    <g className="r1500"> 
        <FillingTubesSet initX={initX} initY={initY} sectionLength={sectionLength} scale={scale} />
        <Crossbar initX={initX} initY={initY - 169 / scale} length={sectionLength}/>
        <Crossbar initX={initX} initY={initY - (169 + 703) / scale} length={sectionLength}/>
        <StandTube88x58 initX={initX} initY={initY} length={1100 / scale} />
        <RailTube88x58 initX={initX} initY={initY - 1100 / scale} length={sectionLength} />
        <DownFiting initX={initX} initY={initY} />
        <UpFiting initX={initX} initY={initY - 1100 / scale} />

    </g>
  )
}
