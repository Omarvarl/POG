import StandTube88x58 from "../Profiles/StandTube88x58x3.5"
import RailTube88x58 from '../Profiles/RailTube88x58x3.5'
import Crossbar from "../Profiles/CrossbarTube40x40x3"
import FillingTube from "../Profiles/FillingTubeD32"
import DownFiting from "../Profiles/DownFiting"
import UpFiting from "../Profiles/UpFiting"
import { IUniqSectionData } from "../../../Types/Types"
import '../Drawing.css'
import DimArrow from "../DimArrow"

export default function UniqSectionMirror({initX, initY, length, addedStatePos, scale=1}:IUniqSectionData) {

    const sectionLength = length / scale

    let addedStand:JSX.Element = <></>
    let addedDownFiting:JSX.Element = <></>
    let addedUpFiting:JSX.Element = <></>

    let fillingTubes:JSX.Element[] = []

    const getFillingTubes = (addedStand?: number):JSX.Element[] => {
        if (!scale) scale = 1
        const tubesInterval = 182 / scale
        let fillingTubes:JSX.Element[] = []
        if (addedStand) {
            const length1 = addedStand - 88 / scale
            const length2 = sectionLength - addedStand - 88 / scale
            let tubesQuantity1 = Math.floor(length1 / tubesInterval) - 1
            let tubesQuantity2 = Math.floor(length2 / tubesInterval) - 1
            getTubesPositions(tubesQuantity1, length1, 0)
            getTubesPositions(tubesQuantity2, length2, addedStand)
        } else {
            const length = sectionLength - 88 / scale
            let tubesQuantity = Math.floor(length / tubesInterval) - 1
            getTubesPositions(tubesQuantity, length, 0)
        }

        function getTubesPositions (tubesQuantity: number, length: number, addedStand:number) {
            if (!scale) scale = 1
            const positions: number[] = []
            const firstPosition = (length - tubesQuantity * tubesInterval) / 2 + 44 / scale
            positions.push(firstPosition)

            for (let i = 0; i < tubesQuantity; i++) {
                positions.push(positions[i] + tubesInterval)
            }
    
            positions.forEach(pos => {
                if (!scale) scale = 1
                fillingTubes.push(<FillingTube initX={initX - pos - addedStand} initY={initY - 169 / scale} length={703 / scale} key={`tubes-${pos + addedStand}`} scale={scale} />)
            })
        }

        return fillingTubes
    }

    

    if (length > 2000) {
        addedStand = <StandTube88x58 initX={initX - 1500 / scale} initY={initY} length={1100 / scale} scale={scale} />
        addedDownFiting = <DownFiting initX={initX - 1500 / scale} initY={initY} scale={scale} />
        addedUpFiting = <UpFiting initX={initX - 1500 / scale} initY={initY - 1100 / scale} scale={scale} />
        fillingTubes = getFillingTubes(1500 / scale)
    } else if (length <= 2000 && length > 1500) {
        addedStand = <StandTube88x58 initX={initX - 1000 / scale} initY={initY} length={1100 / scale} scale={scale} />
        addedDownFiting = <DownFiting initX={initX - 1000 / scale} initY={initY} scale={scale} />
        addedUpFiting = <UpFiting initX={initX - 1000 / scale} initY={initY - 1100 / scale} scale={scale} />
        fillingTubes = getFillingTubes(1000 / scale)
    } else {
        fillingTubes = getFillingTubes()
    }


  return (
    <g className="ur"> 
        { fillingTubes }
        <Crossbar initX={initX - sectionLength} initY={initY - 169 / scale} length={sectionLength} scale={scale} />
        <Crossbar initX={initX - sectionLength} initY={initY - (169 + 703) / scale} length={sectionLength} scale={scale} />
        <StandTube88x58 initX={initX} initY={initY} length={1100 / scale} scale={scale} />
        { addedStand }
        <RailTube88x58 initX={initX - sectionLength} initY={initY - 1100 / scale} length={sectionLength} scale={scale} />
        <DownFiting initX={initX} initY={initY} scale={scale} />
        <UpFiting initX={initX} initY={initY - 1100 / scale} scale={scale} />
        {addedDownFiting}
        {addedUpFiting}
        <StandTube88x58 initX={initX - sectionLength} initY={initY} length={1100 / scale} scale={scale} />
        <UpFiting initX={initX - sectionLength} initY={initY - 1100 / scale} scale={scale} />
        <DownFiting initX={initX - sectionLength} initY={initY} scale={scale} />
        <DimArrow
          initX={initX - length / scale}
          initY={initY - 1100 / scale}
          type={{type: 'hor', dir: 'up'}}
          length={length / scale}
          indent={150 / scale}
          id={`UniqSectionMirror_dim_${initX}`}
          key={`UniqSectionMirror_dim_${initX}`}
          unchange={true}
        />
    </g>
  )
}
