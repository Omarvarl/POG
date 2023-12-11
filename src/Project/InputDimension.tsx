import { hideInput } from "../store/inputVisibilitySlice";
import { setLength, setPosition, setLeft, setRight } from "../store/platesSlice";
import { setExpansionJointLength, setExpansionJointPosition, setExpansionJointRight, setExpansionJointLeft } from "../store/expansionJointsSlice";
import { setPOLength } from "../store/POLengthSlice";
import { setLengthJoint } from "../store/platesJointsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import React from "react";

export default function InputDimension() {
    const dispatch = useAppDispatch();
    const inputVisibility = useAppSelector(state => state.inputVisibility)
    const currentPlate = useAppSelector(state => state.currentPlate)
    const plates = useAppSelector(state => state.plates)
    const plateJoints = useAppSelector(state => state.platesJoints)
    const expansionJoints = useAppSelector(state => state.expansionJoints)
    const POLengthData = useAppSelector(state => state.POLength)
    const [appointment, num, num1] = currentPlate.id.split('_')

    function changePlateLength(target:HTMLInputElement) {

        const index = plates.findIndex(elm => elm.id.split('_')[1] === num)
        const value = Number(target.value)
        const index1 = plates.findIndex(elm => elm.id.split('_')[1] === num1)

        if (appointment === 'plate') {
      
          if (index !== plates.length - 1) {
            if (value > 0 && value < plates[index + 1].length + plates[index].length) {
              dispatch(setLength({
                id: plates[index + 1].id,
                length: plates[index + 1].length + (plates[index].length - value),
              }))
              dispatch(setPosition({
                id: plates[index + 1].id,
                position: plates[index + 1].position - (plates[index].length - value),
              }))

              let exIndex = expansionJoints.findIndex(elm => elm.id === `ej_${num}`)
              if (exIndex !== -1)
              dispatch(setExpansionJointPosition({
                id: expansionJoints[exIndex].id,
                position: expansionJoints[exIndex].position - (plates[index].length - value)
              }))

              dispatch(setLength({
                id: currentPlate.id,
                length: value
              }))
            }
        
          } else if (index !== 0 && index === plates.length - 1) {
            if (value < plates[index - 1].length + plates[index].length) {
              dispatch(setPosition({
                id: plates[index].id,
                position: plates[index].position + (plates[index].length - value)
              }))
              dispatch(setLength({
                id: plates[index - 1].id,
                length: plates[index - 1].length + (plates[index].length - value)
              }))

              let exIndex = expansionJoints.findIndex(elm => elm.id === `ej_${Number(num) - 1}`)
              if (exIndex !== -1)
              dispatch(setExpansionJointPosition({
                id: expansionJoints[exIndex].id,
                position: expansionJoints[exIndex].position + (plates[index].length - value)
              }))

              dispatch(setLength({
                id: plates[index].id,
                length: value
              }))
            }
          } else if (index === plates.length - 1 && index === 0) {
            dispatch(setLength({
              id: currentPlate.id,
              length: value,
            }))
            // console.log(plates)
          }
        } else if (appointment === 'pj' || appointment === 'ej') {
          const i = plateJoints.findIndex(elm => elm.id.split('_')[1] === plates[index].id.split('_')[1])
          const ej = expansionJoints.findIndex(elm => elm.id.split('_')[1] === plates[index].id.split('_')[1])
          if (value <= 1200) {
            if (value < plates[index].length - 500) {
                const jointLength = plates[index].right + plates[index + 1].left + value
                if (jointLength > 1200) {
                    let delta = jointLength - 1200
                    if (delta > plates[index].right) {
                        delta -= plates[index].right
                        dispatch(setRight({id: plates[index].id, right: 0}))
                        dispatch(setLeft({id: plates[index + 1].id, left: plates[index + 1].left - delta}))
                        if (ej !== -1) {
                            dispatch(setExpansionJointLeft({id: expansionJoints[ej].id, left: 0}))
                            dispatch(setExpansionJointRight({id: expansionJoints[ej].id, right: expansionJoints[ej].right - delta}))
                        }
                    } else {
                        dispatch(setRight({id: plates[index].id, right: plates[index].right - delta}))
                        if (ej !== -1) {
                            dispatch(setExpansionJointLeft({id: expansionJoints[ej].id, left: expansionJoints[ej].left - delta}))
                        }
                    }
                }
                if (i !== -1) dispatch(setLength({
                  id: plates[index].id,
                  length: plates[index].length - (value - plateJoints[i].length),
                }))
                if (appointment === 'pj') {
                    dispatch(setLengthJoint({id: plateJoints[i].id, length: value}))
                } else {
                    const oldPosition = expansionJoints[ej].position
                    const oldLength = expansionJoints[ej].length
                    if (value < plates[index].length - 500) {
                        dispatch(setLength({
                            id: plates[index].id,
                            length: plates[index].length - (value - expansionJoints[ej].length),
                          }))
                    }
                    dispatch(setExpansionJointPosition({id: expansionJoints[ej].id, position: oldPosition + oldLength - value}))
                    dispatch(setExpansionJointLength({id: expansionJoints[ej].id, length: value}))
                }
            } else {
                let delta = value - (plates[index + 1].position - plates[index].position - plates[index].right - plates[index].length)
                dispatch(setPosition({id: plates[index + 1].id, position: plates[index + 1].position + delta}))
                dispatch(setLength({id: plates[index + 1].id, length: plates[index + 1].length - delta}))
                dispatch(setLeft({id: plates[index + 1].id, left: plates[index + 1].left - delta}))
                if (ej !== -1) {
                    dispatch(setExpansionJointRight({id: expansionJoints[ej].id, right: expansionJoints[ej].right - delta}))
                    console.log(delta, ej)
                    dispatch(setExpansionJointLength({id: expansionJoints[ej].id, length: expansionJoints[ej].length + delta}))
                }
                if (value < plates[index + 1].length - 500) {
                    dispatch(setPosition({
                        id: plates[index + 1].id,
                        position: plates[index + 1].position + delta,
                    }))
                }
            }
          }
      
        } else if (appointment === 'POLength') {
          dispatch(setPOLength({
            ...POLengthData,
            POLength: value
          }))
          dispatch(setLength({
            id: plates[plates.length - 1].id,
            length: value - plates[plates.length - 1].position
          }))
        } else if (appointment === 'leftDim') {
            const ejIndex = expansionJoints.findIndex(elm => elm.id.split('_')[1] === plates[index1 - 1].id.split('_')[1])

            if (value <= 1200) {   //  join less than 1200 mm
                if (ejIndex !== -1) {
                    const ejJointLength = expansionJoints[ejIndex].left + expansionJoints[ejIndex].length + value

                    if (ejJointLength > 1200) {
                        let delta = ejJointLength - 1200
                        if (delta > expansionJoints[ejIndex].left) {
                            delta -= expansionJoints[ejIndex].left
                            
                            dispatch(setExpansionJointLeft({id: expansionJoints[ejIndex].id, left: 0}))
                            dispatch(setRight({id:plates[index1 - 1].id, right: 0}))
                            dispatch(setExpansionJointLength({id: expansionJoints[ejIndex].id, length: expansionJoints[ejIndex].length - delta}))
                            dispatch(setExpansionJointPosition({id: expansionJoints[ejIndex].id, position: expansionJoints[ejIndex].position + delta}))
                            dispatch(setLength({id: plates[index1 - 1].id, length: plates[index1 - 1].length + delta}))
                        } else {
                            dispatch(setRight({id:plates[index1 - 1].id, right: plates[index1 - 1].right - delta}))
                            dispatch(setExpansionJointLeft({id: expansionJoints[ejIndex].id, left: expansionJoints[ejIndex].left - delta}))
                        }
                    }
                    dispatch((setExpansionJointRight({id: expansionJoints[ejIndex].id, right: value})))

                } else {
                    if (index1 !== 0) {
                        const middle = plates[index1].position - (plates[index1 - 1].position + plates[index1 - 1].length)
                        const jointLength = value + plates[index1 - 1].right + middle
                        if (jointLength > 1200) {
                            let right = plates[index1 - 1].right - (jointLength - 1200)
                            if (right < 0) {
                                const j = plateJoints.findIndex(elm => elm.id.split('_')[1] === plates[index1 - 1].id.split('_')[1])
                                dispatch(setLength({id: plates[index1 - 1].id, length: plates[index1 - 1].length - right}))
                                dispatch(setLengthJoint({id: plateJoints[j].id, length: plateJoints[j].length + right }))
                                right = 0
                            }  
                            dispatch(setRight({id: plates[index1 - 1].id, right: right}))
                        }
                    }
                }
                if (value < plates[index1].length) {
                    dispatch(setLeft({id: plates[index1].id, left: value}))
                }
            }

        } else if (appointment === 'rightDim') {
            const ejIndex = expansionJoints.findIndex(elm => elm.id.split('_')[1] === plates[index1].id.split('_')[1])

            if (value <= 1200) {
                
                if (ejIndex !== -1) {
                    const ejJointLength = expansionJoints[ejIndex].right + expansionJoints[ejIndex].length + value

                    if (ejJointLength > 1200) {
                        let delta = ejJointLength - 1200
                        if (delta > expansionJoints[ejIndex].right) {
                            delta -= expansionJoints[ejIndex].right
                            
                            dispatch(setExpansionJointRight({id: expansionJoints[ejIndex].id, right: 0}))
                            dispatch(setLeft({id:plates[index1 + 1].id, left: 0}))
                            dispatch(setExpansionJointLength({id: expansionJoints[ejIndex].id, length: expansionJoints[ejIndex].length - delta}))
                            dispatch(setExpansionJointPosition({id: expansionJoints[ejIndex].id, position: expansionJoints[ejIndex].position + delta}))
                            dispatch(setLength({id: plates[index1].id, length: plates[index1].length + delta}))
                        } else {
                            dispatch(setLeft({id:plates[index1 + 1].id, left: plates[index1 + 1].left - delta}))
                            dispatch(setExpansionJointRight({id: expansionJoints[ejIndex].id, right: expansionJoints[ejIndex].right - delta}))
                        }
                    }
                    dispatch((setExpansionJointLeft({id: expansionJoints[ejIndex].id, left: value})))

                } else {
                    if (index1 !== plates.length - 1) {
                        const middle = plates[index1 + 1].position - (plates[index1].position + plates[index1].length)
                        const jointLength = value + plates[index1 + 1].left + middle
                        if (jointLength > 1200) {
                            let left = plates[index1 + 1].left - (jointLength - 1200)
                            if (left < 0) {
                                const j = plateJoints.findIndex(elm => elm.id.split('_')[1] === plates[index1].id.split('_')[1])
                                dispatch(setLength({id: plates[index1].id, length: plates[index1].length - left}))
                                dispatch(setLengthJoint({id: plateJoints[j].id, length: plateJoints[j].length + left }))
                                left = 0
                            }
                            dispatch(setLeft({id: plates[index1 + 1].id, left: left}))
                        }
                    }
                }
                if (value < plates[index1].length) {
                    dispatch(setRight({id: plates[index1].id, right: value}))
                }
            }
        }
      }

  return (
    <div
    className="background-modal"
    style={{display: inputVisibility.display}}
    onMouseDown={(e: React.MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.classList.contains('dim-input'))
      dispatch(hideInput())
    }}
    onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter') dispatch(hideInput())
    }}
    >
      <input
        className="dim-input"
        style={ inputVisibility }
        type="number"
        min={500}
        step={100}
        defaultValue={currentPlate.length}
        contentEditable={true}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          const target = e.target as HTMLInputElement
          changePlateLength(target)
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement
            if (e.key === 'Enter') changePlateLength(target)
        }}
        key={currentPlate.id}
        autoFocus
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
          e.target.select()
        }}
      />
    </div>
  )
}
