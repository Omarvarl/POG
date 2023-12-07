import { hideInput } from "../store/inputVisibilitySlice";
import { setLength, setPosition } from "../store/platesSlice";
import { setExpansionJointLength, setExpansionJointPosition } from "../store/expansionJointsSlice";
import { setPOLength } from "../store/POLengthSlice";
import { setLengthJoint } from "../store/platesJointsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export default function InputDimension() {
    const dispatch = useAppDispatch();
    const inputVisibility = useAppSelector(state => state.inputVisibility)
    const currentPlate = useAppSelector(state => state.currentPlate)
    const plates = useAppSelector(state => state.plates)
    const plateJoints = useAppSelector(state => state.platesJoints)
    const expansionJoints = useAppSelector(state => state.expansionJoints)
    const POLengthData = useAppSelector(state => state.POLength)

    function changePlateLength(target:HTMLInputElement) {

        const index = plates.findIndex(elm => elm.id.split('_')[1] === currentPlate.id.split('_')[1])
      
        if (currentPlate.id.split('_')[0] === 'plate') {
      
          if (index !== plates.length - 1) {
            if (Number(target.value) > 0 && Number(target.value) < plates[index + 1].length + plates[index].length) {
              dispatch(setLength({
                id: plates[index + 1].id,
                position: 0,
                length: plates[index + 1].length + (plates[index].length - Number(target.value)),
                left: 0,
                right: 0
              }))
              dispatch(setPosition({
                id: plates[index + 1].id,
                position: plates[index + 1].position - (plates[index].length - Number(target.value)),
                length: 0,
                left: 0,
                right: 0
              }))

              let exIndex = expansionJoints.findIndex(elm => elm.id === `ej_${currentPlate.id.split('_')[1]}`)
              if (exIndex !== -1)
              dispatch(setExpansionJointPosition({
                id: expansionJoints[exIndex].id,
                position: expansionJoints[exIndex].position - (plates[index].length - Number(target.value))
              }))

              dispatch(setLength({
                id: currentPlate.id,
                position: 0,
                length: Number(target.value),
                left: 0,
                right: 0
              }))
            }
        
          } else if (index !== 0 && index === plates.length - 1) {
            if (Number(target.value) < plates[index - 1].length + plates[index].length) {
              dispatch(setPosition({
                id: plates[index].id,
                position: plates[index].position + (plates[index].length - Number(target.value)),
                length: 0,
                left: 0,
                right: 0
              }))
              dispatch(setLength({
                id: plates[index - 1].id,
                position: 0,
                length: plates[index - 1].length + (plates[index].length - Number(target.value)),
                left: 0,
                right: 0
              }))

              let exIndex = expansionJoints.findIndex(elm => elm.id === `ej_${Number(currentPlate.id.split('_')[1]) - 1}`)
              if (exIndex !== -1)
              dispatch(setExpansionJointPosition({
                id: expansionJoints[exIndex].id,
                position: expansionJoints[exIndex].position + (plates[index].length - Number(target.value))
              }))

              dispatch(setLength({
                id: plates[index].id,
                position: 0,
                length: Number(target.value),
                left: 0,
                right: 0
              }))
            }
          } else if (index === plates.length - 1 && index === 0) {
            dispatch(setLength({
              id: currentPlate.id,
              position: 0,
              length: Number(target.value),
              left: 0,
              right: 0
            }))
            // console.log(plates)
          }
        } else if (currentPlate.id.split('_')[0] === 'pj' || currentPlate.id.split('_')[0] === 'ej') {
          const i = plateJoints.findIndex(elm => elm.id.split('_')[1] === plates[index].id.split('_')[1])
          const ej = expansionJoints.findIndex(elm => elm.id.split('_')[1] === plates[index].id.split('_')[1])

            if (currentPlate.id.split('_')[0] === 'pj') {
                if (Number(target.value) < plates[index].length - 500) {
                    dispatch(setLength({
                      id: plates[index].id,
                      position: 0,
                      length: plates[index].length - (Number(target.value) - plateJoints[i].length),
                      left: 0,
                      right: 0
                    }))
                }
                dispatch(setLengthJoint({id: plateJoints[i].id, length: Number(target.value)}))
              } else {
                const oldPosition = expansionJoints[ej].position
                const oldLength = expansionJoints[ej].length
                if (Number(target.value) < plates[index].length - 500) {
                    dispatch(setLength({
                        id: plates[index].id,
                        position: 0,
                        length: plates[index].length - (Number(target.value) - expansionJoints[ej].length),
                        left: 0,
                        right: 0
                      }))
                }
                dispatch(setExpansionJointPosition({id: expansionJoints[ej].id, position: oldPosition + oldLength - Number(target.value)}))
                dispatch(setExpansionJointLength({id: expansionJoints[ej].id, length: Number(target.value)}))
            }
      
        } else if (currentPlate.id.split('_')[0] === 'POLength') {
          dispatch(setPOLength({
            ...POLengthData,
            POLength: Number(target.value)
          }))
          dispatch(setLength({
            id: plates[plates.length - 1].id,
            position: 0,
            length: Number(target.value) - plates[plates.length - 1].position,
            left: 0,
            right: 0
          }))
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
    } }
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
        key={currentPlate.id}
        autoFocus
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
          e.target.select()
        }}
      />
    </div>
  )
}
