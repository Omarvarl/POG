import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { hideExJointPop } from '../../store/exJointPopVisibility'
import { removeExpansionJoint, setMove, setIdExpansionJoint } from '../../store/expansionJointsSlice'
import './Drawing.css'
import { connectPlates } from '../../store/platesSlice'
import { setIDJoint } from '../../store/platesJointsSlice'

export default function ExJointPop() {
    var exJointPopVisibility = useAppSelector(state => state.exJointPopVisibility)
    var dispatch = useAppDispatch()
    var expansionJoints = useAppSelector(state => state.expansionJoints)
    var index = expansionJoints.findIndex(elm => elm.id === exJointPopVisibility.exId)
    var expansionJoint = index !== -1 ? expansionJoints[index] : {id: '0', move: 0}
    var plates = useAppSelector(state => state.plates)

  return (
    <div
        className='background-modal'
        style={{display: exJointPopVisibility.display}}
        onClick={(e: React.MouseEvent) => {
            const target = e.target as HTMLElement
            if (!target.classList.contains('ex-joint-input'))
            dispatch(hideExJointPop())
        }}
    >
        <div
            className="ex-joint-menu"
            style={exJointPopVisibility}
        >
            <label>
                Ход деф. шва
                <div style={{display: 'flex', fontSize: '14pt'}}>
                    {String.fromCharCode(parseInt('00B1', 16))}
                    <input
                        className='ex-joint-input'
                        type="number"
                        value={expansionJoint?.move}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const target = e.target as HTMLInputElement
                            dispatch(setMove({id: expansionJoint.id, move: Number(target.value)}))
                        }}
                    />
                </div>
            </label>
            <button
                onClick={() => {
                    var number = Number(expansionJoint.id.split('_')[1])
                    var index = plates.findIndex(elm => elm.id === `plate_${number}`) + 1
                    var newNumber = index !== 0 ? Number(plates[index].id.split('_')[1]) : number
                    dispatch(removeExpansionJoint(expansionJoint.id))
                    dispatch(connectPlates(plates[index].id))
                    dispatch(setIdExpansionJoint({id: `ej_${newNumber}`, newId: expansionJoint.id}))
                    dispatch(setIDJoint({id: `pj_${newNumber}`, newId: `pj_${number}`}))
                }}
            >
                Удалить деф. шов
            </button>
        </div>
    </div>
  )
}
