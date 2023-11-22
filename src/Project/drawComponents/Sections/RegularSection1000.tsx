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

export default function RegularSection1000({initX, initY}:IInitCoord) {  
    const scale = useAppSelector(state => state.POLength.scale)
    const sectionLength = 1000 / scale

    const getFillingTubes = ():JSX.Element[] => {
        let fillingTubes:JSX.Element[] = []
        let center = initX + sectionLength / 2
        let pos = 181 / scale
        fillingTubes.push(<FillingTube initX={center} initY={initY - 169 / scale} length={703 / scale} key={`tubes${pos}`}/>)
    
        while (center + pos - initX + 32 / scale < sectionLength) {
            fillingTubes.push(<FillingTube initX={center - pos} initY={initY - 169 / scale} length={703 / scale} key={`tubes-${pos}`}/>)
            fillingTubes.push(<FillingTube initX={center + pos} initY={initY - 169 / scale} length={703 / scale} key={`tubes+${pos}`}/>)
            pos += 181 / scale
        }
        return fillingTubes
    }


  return (
    <g className="r1500"> 
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
