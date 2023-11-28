// import { IProfile } from "../../../Types/Types"
import { useAppSelector } from "../../../hooks"
import StandTube88x58 from "../Profiles/StandTube88x58x3.5"
import RailTube88x58 from '../Profiles/RailTube88x58x3.5'
import Crossbar from "../Profiles/CrossbarTube40x40x3"
import FillingTube from "../Profiles/FillingTubeD32"
import DownFiting from "../Profiles/DownFiting"
import UpFiting from "../Profiles/UpFiting"
import { IInitCoord } from "../../../Types/Types"
import '../Drawing.css'

export default function RegularSection1500({initX, initY}:IInitCoord) {  
    const scale = useAppSelector(state => state.POLength.scale)
    const sectionLength = 1500 / scale

    const getFillingTubes = ():JSX.Element[] => {
      const tubesInterval = 182 / scale
      const positions: number[] = []
      let fillingTubes:JSX.Element[] = []
      let tubesQuantity = Math.floor((sectionLength - 88 / scale) / tubesInterval) - 1

      const firstPosition = (sectionLength - tubesQuantity * tubesInterval) / 2

      positions.push(firstPosition)
      for (let i = 0; i < tubesQuantity; i++) {
          positions.push(positions[i] + tubesInterval)
      }

      positions.forEach(pos => {
          fillingTubes.push(<FillingTube initX={initX + pos} initY={initY - 169 / scale} length={703 / scale} key={`tubes-${pos}`}/>)
      })
      return fillingTubes
  }


  return (
    <g> 
        { getFillingTubes() }
        <Crossbar initX={initX} initY={initY - 169 / scale} length={sectionLength}/>
        <Crossbar initX={initX} initY={initY - (169 + 703) / scale} length={sectionLength}/>
        <StandTube88x58 initX={initX} initY={initY} length={1100 / scale} />
        <RailTube88x58 initX={initX} initY={initY - 1100 / scale} length={sectionLength} />
        <DownFiting initX={initX} initY={initY} />
        <UpFiting initX={initX} initY={initY - 1100 / scale} />

    </g>
  )
}
