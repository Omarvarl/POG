// import { IProfile } from "../../../Types/Types"
import { useAppSelector } from "../../../hooks"
import StandTube88x58 from "../Profiles/StandTube88x58x3.5"
import RailTube88x58 from '../Profiles/RailTube88x58x3.5'
import Crossbar from "../Profiles/CrossbarTube40x40x3"
import FillingTube from "../Profiles/FillingTubeD32"
import DownFiting from "../Profiles/DownFiting"
import Start from "./Start"

export default function StartSection1500() {  
    const {POLength, scaledPOLength, screenWidth, scale} = useAppSelector(state => state.POLength)
    const initX = screenWidth / 2 - scaledPOLength / 2
    const initY = 50 + 1100 / scale
    const sectionLength = 1500 / scale

    const getFillingTubes = ():JSX.Element[] => {
        let fillingTubes:JSX.Element[] = []
        let center = initX + sectionLength / 2
        let pos = 181 / scale
        fillingTubes.push(<FillingTube initX={center} initY={initY - 169 / scale} length={703 / scale} key={`tubes${pos}`}/>)
    
        while (center + pos - initX + 32 / scale < sectionLength) {
            fillingTubes.push(<FillingTube initX={center - pos} initY={initY - 169 / scale} length={703 / scale} key={`tubes${pos}`}/>)
            fillingTubes.push(<FillingTube initX={center + pos} initY={initY - 169 / scale} length={703 / scale} key={`tubes${pos}`}/>)
            pos += 181 / scale
        }
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
        <Start initX={initX} initY={initY - 169 / scale} length={250 / scale}/>

    </g>
  )
}
