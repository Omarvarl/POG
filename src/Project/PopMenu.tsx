import { hidePopUp } from "../store/popUpSlice";
import { addPlate, connectPlates, removePlate } from "../store/platesSlice";
import { addPlateJoint, removePlateJoint, setIDJoint } from "../store/platesJointsSlice";
import { addExpansionJoin, removeExpansionJoint, setIdExpansionJoint, setExpansionJointPosition } from "../store/expansionJointsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export default function PopMenu() {
    const dispatch = useAppDispatch();
    const visibility = useAppSelector(state => state.popUp)
    const currentPlate = useAppSelector(state => state.currentPlate)
    const plates = useAppSelector(state => state.plates)
    const plateJoints = useAppSelector(state => state.platesJoints)
    const expansionJoints = useAppSelector(state => state.expansionJoints)

    function addExpansionJoinToPlate() {
        const leftPlate = createNewPlate()[0]
        dispatch(addExpansionJoin({
          id: `ej_${leftPlate.id.split('_')[1]}`,
          position: leftPlate.position + leftPlate.length,
          length: 50,
          left: 250,
          right: 250
        }))
      }
    
    
      function addNewPlate() {
        const leftPlate = createNewPlate()[0]
        dispatch(addPlateJoint({id: `pj_${leftPlate.id.split('_')[1]}`, length: 50}))
      }
    
      function createNewPlate() {
        const IDs = plates.map(p => Number(p.id.split('_')[1]))
        const max = Math.max(...IDs)
        let index = 0
        for (let i = 0; i <= max + 1; i++) {
          if (!IDs.includes(i)) {
            index = i
            break
          }
        }
        
        const leftPlate = {
          id: currentPlate.id,
          position: currentPlate.position,
          length: currentPlate.length / 2 - 25,
          left: 250,
          right: 250
        }
    
        const rightPlate = {
          id: `plate_${index}`,
          position: currentPlate.length / 2 + 25 + currentPlate.position,
          length: currentPlate.length / 2 - 25,
          left: 250,
          right: 250
        }
    
        dispatch(removePlate(currentPlate.id))
        dispatch(setIdExpansionJoint({id: `ej_${currentPlate.id.split('_')[1]}`, newId: `ej_${rightPlate.id.split('_')[1]}`}))
        dispatch(setIDJoint({id: `pj_${currentPlate.id.split('_')[1]}`, newId: `pj_${rightPlate.id.split('_')[1]}`}))
        dispatch(addPlate(leftPlate))
        dispatch(addPlate(rightPlate))
    
        return [leftPlate, rightPlate]
    }

  return (
    <div
    onClick={() => dispatch(hidePopUp())}
    className="background-modal"
    style={{display: visibility.display}}
  >
  <div
      style={{display: visibility.display, left: `${visibility.x + 20}px`, top: `${visibility.y - 20}px`}}
      className='pop-up'
    >
      <button
        onClick={addNewPlate}
      >
        Разделить плиту
      </button>
      <button
        onClick={addExpansionJoinToPlate}
      >
        Добавить деф. шов
      </button>
      <button
        onClick={() => {
            const index = plates.findIndex(elm => elm.id === currentPlate.id)
            let number = Number(currentPlate.id.split('_')[1])
            let newNumber = index !== 0 ? Number(plates[index - 1].id.split('_')[1]) : number

            if (index === 0) number = Number(plates[index + 1].id.split('_')[1])

            dispatch(connectPlates(currentPlate.id))

            dispatch(removePlateJoint(`pj_${newNumber}`))
            dispatch(setIDJoint({id: `pj_${number}`, newId: `pj_${newNumber}`}))
            dispatch(removeExpansionJoint(`ej_${newNumber}`))
            dispatch(setIdExpansionJoint({id: `ej_${number}`, newId: `ej_${newNumber}`}))
        }}
      >
        Удалить плиту
      </button>
    </div>
  </div>
  )
}
