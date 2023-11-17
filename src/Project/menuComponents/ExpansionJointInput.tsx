import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { removeExpansionJoint, setPosition, setLength } from '../../store/expansionJointsSlice'
import './Menu.css'

interface ID {
    id: number
}

export default function ExpansionJointInput({id}:ID) {
const dispatch = useAppDispatch()
const position = useAppSelector(state => {
    let result = -1
    for (let ej of state.expansionJoints) {
        if (ej.id === id) result = ej.position
    }
    return result
})

const length = useAppSelector(state => {
    let result = -1
    for (let ej of state.expansionJoints) {
        if (ej.id === id) result = ej.length
    }
    return result
})

  return (
    <div className='expansion-joint-input'>
        <label htmlFor="">
            Расстояние до шва в мм
            <input type="number"
                defaultValue={position}
                onBlur={(e:React.FocusEvent<HTMLInputElement>) => {
                    const posInput = e.target as HTMLInputElement
                    dispatch(setPosition({
                        id: id,
                        position: Number(posInput.value),
                        length: -1
                    }))
                }}
            />
        </label>
        <label htmlFor="">
            Размер шва в мм
            <input type="number"
                defaultValue={length}
                onBlur={(e:React.FocusEvent<HTMLInputElement>) => {
                    const lenInput = e.target as HTMLInputElement
                    dispatch(setLength({
                        id: id,
                        position: -1,
                        length: Number(lenInput.value)
                    }))
                }}
            />
        </label>
        <button
            className="remove-expansion-joint"
            onClick={() => dispatch(removeExpansionJoint(id))}
        >
            Удалить деф. шов
        </button>
    </div>
  )
}
