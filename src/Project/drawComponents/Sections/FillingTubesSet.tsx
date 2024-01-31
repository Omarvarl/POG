import { useMemo } from "react"
import { IFillingTubesSet } from "../../../Types/Types"
import FillingTube from "../Profiles/FillingTubeD32"


export default function FillingTubesSet({initX, initY, sectionLength, scale=1}:IFillingTubesSet) {
    const fillingTubes:JSX.Element[] = useMemo(() => {
        const res:JSX.Element[] = []
        const tubesInterval = 182 / scale
        const positions: number[] = []
        let tubesQuantity = Math.floor((sectionLength - 88 / scale) / tubesInterval) - 1
        const firstPosition = (sectionLength - tubesQuantity * tubesInterval) / 2

        positions.push(firstPosition)

        for (let i = 0; i < tubesQuantity; i++) {
            positions.push(positions[i] + tubesInterval)
        }
    
        positions.forEach(pos => {
            // console.log('tubesSet')
            res.push(<FillingTube
                initX={initX + pos}
                initY={initY - 169 / scale}
                length={703 / scale}
                key={`tubes_${pos}`}
                scale={scale}
            />)
        })
        return res
    }, [initX, initY, sectionLength, scale])

    return <g>
        { fillingTubes }
    </g>
}

