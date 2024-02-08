
import React from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { setCurrentPlate } from "../../store/currentPlateSlice"
import { changeVisibility, setInputValue } from "../../store/inputVisibilitySlice"
import { IDimArrow } from "../../Types/Types"

export default function DimArrow({initX, initY, type, length, indent, id, unchange=false}:IDimArrow) {

    const POLengthData = useAppSelector(state => state.POLength)
    const viewBreak = useAppSelector(state => state.viewBreak)

    const plates = useAppSelector(state => state.plates)
    const plateJoints = useAppSelector(state => state.platesJoints)
    const expansionJoints = useAppSelector(state => state.expansionJoints)
    const dispatch = useAppDispatch()
    let indentLineLength = indent
    let result = <></>
    const fontSize = `${70}px`
    const [appointment, num, num1] = id.split('_')
    const joints = [...plateJoints, ...expansionJoints]

    const index = plates.findIndex(elm => elm.id.split('_')[1] === num)

    const scale = (viewBreak) ? POLengthData.reducedScale : POLengthData.scale
    const wholeLength = (viewBreak) ? POLengthData.reducedLength : POLengthData.POLength

    const changeText = (e: React.MouseEvent): boolean => {
        if (unchange) return false
        const target = e.target as HTMLElement
        let draw:HTMLElement | null = target
        let x = draw.getBoundingClientRect().x
        let y = draw.getBoundingClientRect().y

        while (draw && !draw.classList.contains("draw-page")) {
           draw = draw.parentElement
        }
        if (draw) {
            x = draw.getBoundingClientRect().x
            y = draw.getBoundingClientRect().y
           }
        const style = draw?.getAttribute('style')
        let scale = 1
        if (style) {
            scale = Number(style.split('scale')[1].split(')')[0].split('(')[1])
        }
        if (appointment === 'plate' || appointment === 'leftDim' || appointment === 'rightDim') {
            // console.log(appointment)
            const index1 = plates.findIndex(elm => elm.id.split('_')[1] === num1)
            const i = index !== -1 ? index : index1
            dispatch(setCurrentPlate({
                id: id,
                position: plates[i].position,
                length: plates[i].length
            }))
            if (appointment === 'plate') dispatch(setInputValue(plates[i].length))
            if (appointment === 'leftDim') dispatch(setInputValue(plates[i].left))
            if (appointment === 'rightDim') dispatch(setInputValue(plates[i].right))
        } else if (appointment === 'pj' || appointment === 'ej') {
            const i = joints.findIndex(elm => elm.id.split('_')[1] === num)
            dispatch(setCurrentPlate({
                id: id,
                position: plates[index].position + plates[index].length,
                length: joints[i].length
            }))
            dispatch(setInputValue(joints[i].length))

        } else if (appointment === 'POLength') {
            dispatch(setCurrentPlate({
                id: id,
                position: 0,
                length: POLengthData.POLength
            }))

            dispatch(setInputValue(POLengthData.POLength))
        }

        dispatch(changeVisibility({left: (e.pageX - x ) / scale - 50, top: (e.pageY - y) / scale - 15}))
        return true
    }

    if (type.type === 'hor') {
        if (type.dir === 'down') {
            indent += initY
            indentLineLength = indent + 20
        } else if (type.dir === 'up') {
            indent = initY - indent
            indentLineLength = indent - 20
        }

        let horArrows = (
            <>
                <path  //  arrow
                    d={`M${initX} ${indent}
                        L${initX + 50} ${indent - 6.58 }
                        L${initX + 45} ${indent}
                        L${initX + 50} ${indent + 6.58}Z
                    `}
                />
                
                <path  //  arrow
                    d={`M${initX + length} ${indent}
                        L${initX + length - 50} ${indent - 6.58}
                        L${initX + length - 45} ${indent}
                        L${initX + length - 50} ${indent + 6.58}Z
                    `}
                />
            </>
        )

        let text = (
            <text
                onClick={!unchange ? changeText : undefined}
                x={initX + length / 2 - 50}
                y={indent - 10}
                fontSize={fontSize}
            >
                { getLength() }
            </text>
        )

        if (length < 450 / scale) {
            horArrows = (
                <>
                    <path  //  arrow
                        d={`M${initX} ${indent}
                            L${initX - 50} ${indent - 6.58}
                            L${initX - 45} ${indent}
                            L${initX - 50} ${indent + 6.58}Z
                        `}
                    />
                    
                    <path  //  arrow
                        d={`M${initX + length} ${indent}
                            L${initX + length + 50} ${indent - 6.58}
                            L${initX + length + 45} ${indent}
                            L${initX + length + 50} ${indent + 6.58}Z
                        `}
                    />

                    <path  //  tail
                        d={`M${initX - 45} ${indent}
                            L${initX - 220} ${indent}
                        `}
                    />

                    
                    <path  //  tail
                        d={`M${initX + length + 45} ${indent}
                            L${initX + length + 100} ${indent}
                        `}
                    />
                </>
            )

            text = (
                <text
                    onClick={!unchange ? changeText : undefined}
                    x={initX - 200}
                    y={indent - 10}
                    fontSize={fontSize}
                >
                    { getLength() }
                </text>
            )
        }

        result = (
            <g className="dim-arrow">
                <path
                    d={`M${initX} ${initY}
                        L${initX} ${indentLineLength}
                    `}
                />
                <path
                    d={`M${initX + length} ${initY}
                        L${initX + length} ${indentLineLength}
                    `}
                />
                <path
                    d={`M${initX} ${indent}
                        L${initX + length} ${indent}
                    `}
                />
                { horArrows }
                { text }
            </g>
        )
    } else if (type.type === 'vert') {
        if (type.dir === 'left') {
            indent = initX - indent
            indentLineLength = indent - 20
        } else if (type.dir === 'right') {
            indent += initX
            indentLineLength = indent + 20
        }

        let vertArrows = (
            <>
                <path  //  arrow
                    d={`M${indent} ${initY}
                        L${indent - 6.58} ${initY - 50}
                        L${indent} ${initY - 45}
                        L${indent + 6.58} ${initY - 50}Z
                    `}
                />
                
                <path  //  arrow
                    d={`M${indent} ${initY - length}
                        L${indent - 6.58} ${initY - length + 50}
                        L${indent} ${initY - length + 45}
                        L${indent + 6.58} ${initY - length + 50}Z
                    `}
                />
            </>
        )

        let text = (
            <text
                x={indent - 10}
                y={initY - length / 2 + 50}
                fontSize={fontSize}
                transform={`rotate(-90, ${indent - 10}, ${initY - length / 2 + 50})`}
            >
                { length * scale }
            </text>
        )

        if (length < 450 / scale) {
            vertArrows = (
                <>
                    <path  //  arrow
                        d={`M${indent} ${initY}
                            L${indent - 6.58} ${initY + 50}
                            L${indent} ${initY + 45}
                            L${indent + 6.58} ${initY + 50}Z
                        `}
                    />
                    
                    <path  //  arrow
                        d={`M${indent} ${initY - length}
                            L${indent - 6.58} ${initY - length - 50}
                            L${indent} ${initY - length - 45}
                            L${indent + 6.58} ${initY - length - 50}Z
                        `}
                    />

                    <path  //  tail
                        d={`M${indent} ${initY - length}
                            L${indent} ${initY - length - 275}
                        `}
                    />

                    <path  //  tail
                        d={`M${indent} ${initY}
                            L${indent} ${initY + 150}
                        `}
                    />
                </>
            )
            text = (
                <text
                    x={indent - 10}
                    y={initY - length - 100}
                    fontSize={fontSize}
                    transform={`rotate(-90, ${indent - 10}, ${initY - length - 100})`}
                >
                    { length * scale }
                </text>
            )
        }


        result = (
            <g className="dim-arrow">
                <path
                    d={`M${initX} ${initY}
                        L${indentLineLength} ${initY}
                    `}
                />
                <path
                    d={`M${initX} ${initY - length}
                        L${indentLineLength} ${initY - length}
                    `}
                />
                <path
                    d={`M${indent} ${initY}
                        L${indent} ${initY - length}
                    `}
                />
                { vertArrows }
                { text }
            </g>
        )
    }

    function getLength() {
        let result = length * scale
        if (appointment === 'plate') {
            result = plates[index].length
        } else if (appointment === 'pj' || appointment === 'ej') {
            joints.forEach(elm => {
                if (elm.id === id) result = elm.length
            })
        } else if (appointment === 'POLength') {
            result = POLengthData.POLength
        } else if (appointment === 'leftDim' || appointment === 'rightDim') {
            const index1 = plates.findIndex(elm => elm.id.split('_')[1] === num1)
            result = (appointment === 'leftDim') ? plates[index1].left : plates[index1].right
        }
        return result
    }

    return result
}
