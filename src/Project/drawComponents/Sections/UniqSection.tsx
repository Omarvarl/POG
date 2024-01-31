import StandTube88x58 from "../Profiles/StandTube88x58x3.5"
import RailTube88x58 from '../Profiles/RailTube88x58x3.5'
import Crossbar from "../Profiles/CrossbarTube40x40x3"
import FillingTube from "../Profiles/FillingTubeD32"
import DownFiting from "../Profiles/DownFiting"
import UpFiting from "../Profiles/UpFiting"
import { IUniqSectionData } from "../../../Types/Types"
import '../Drawing.css'
import { useAppSelector } from "../../../hooks"
import DimArrow from "../DimArrow"

export default function UniqSection({initX, initY, length, addedStatePos, scale=1}:IUniqSectionData) {

    const sectionLength = length / scale
    const expansionJoints = useAppSelector(state => state.expansionJoints)
    const startX = 700

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
                fillingTubes.push(<FillingTube initX={initX + pos + addedStand} initY={initY - 169 / scale} length={703 / scale} key={`tubes-${pos + addedStand}`} scale={scale} />)
            })
        }

        return fillingTubes
    }

    // console.log(initX * scale, addedStatePos, length)

    function checkAddedPos(pos:number) {
        let result = pos
        // console.log(expansionJoints)

        expansionJoints.forEach(elm => {
            if (!scale) scale = 1
            // console.log(elm.position, pos + (initX - startX) * scale, elm.position - elm.left, elm.position - elm.left - (initX - startX) * scale )
            if (pos + (initX - startX) * scale > elm.position - elm.left && pos + (initX - startX) * scale < elm.position) {
                result = elm.position - elm.left - (initX - startX) * scale
            } else if (pos + (initX - startX) * scale < elm.position + elm.length + elm.right && pos + (initX - startX) * scale > elm.position) {
                result = elm.position + elm.length + elm.right - (initX - startX) * scale
            }
        })
        return result
    }

    if (addedStatePos && (addedStatePos > 1500)) {
        let pos = checkAddedPos(1500)
        addedStand = <StandTube88x58 initX={initX + pos / scale} initY={initY} length={1100 / scale} scale={scale} />
        addedDownFiting = <DownFiting initX={initX + pos / scale} initY={initY} scale={scale} />
        addedUpFiting = <UpFiting initX={initX + pos / scale} initY={initY - 1100 / scale} scale={scale} />
        fillingTubes = getFillingTubes(pos / scale)
    } else if (addedStatePos && length - addedStatePos >= 500) {
        let pos = checkAddedPos(addedStatePos)
        addedStand = <StandTube88x58 initX={initX + pos / scale} initY={initY} length={1100 / scale} scale={scale} />
        addedDownFiting = <DownFiting initX={initX + pos / scale} initY={initY} scale={scale} />
        addedUpFiting = <UpFiting initX={initX + pos / scale} initY={initY - 1100 / scale} scale={scale} />
        fillingTubes = getFillingTubes(pos / scale)
    } else if (length <= 2000 && length > 1500) {
        let pos = checkAddedPos(1000)
        addedStand = <StandTube88x58 initX={initX + pos / scale} initY={initY} length={1100 / scale} scale={scale} />
        addedDownFiting = <DownFiting initX={initX + pos / scale} initY={initY} scale={scale} />
        addedUpFiting = <UpFiting initX={initX + pos / scale} initY={initY - 1100 / scale} scale={scale} />
        fillingTubes = getFillingTubes(pos / scale)
    } else {
        fillingTubes = getFillingTubes()
    }


  return (
    <g className="u"> 
        { fillingTubes }
        <Crossbar initX={initX} initY={initY - 169 / scale} length={sectionLength} scale={scale}/>
        <Crossbar initX={initX} initY={initY - (169 + 703) / scale} length={sectionLength} scale={scale} />
        <StandTube88x58 initX={initX} initY={initY} length={1100 / scale} scale={scale} />
        { addedStand }
        <RailTube88x58 initX={initX} initY={initY - 1100 / scale} length={sectionLength} scale={scale} />
        <DownFiting initX={initX} initY={initY} scale={scale} />
        <UpFiting initX={initX} initY={initY - 1100 / scale} scale={scale} />
        {addedDownFiting}
        {addedUpFiting}
        <DimArrow
            initX={initX}
            initY={initY - 1100 / scale}
            type={{type: 'hor', dir: 'up'}}
            length={length / scale}
            indent={150 / scale}
            id={`UniqSection_dim_${initX}`}
            key={`UniqSection_dim_${initX}`}
        />
    </g>
  )
}
