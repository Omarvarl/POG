import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { removeExpansionJoint, setExpansionJointPosition, setExpansionJointLength, setExpansionJointLeft, setExpansionJointRight } from '../../store/expansionJointsSlice'
import './Menu.css'

interface ID {
    id: string
}

export default function ExpansionJointInput({id}:ID) {
const dispatch = useAppDispatch()
const position = useAppSelector(state => {
    let result = 0
    for (let ej of state.expansionJoints) {
        if (ej.id === id) result = ej.position
    }
    return result
})

const length = useAppSelector(state => {
    let result = 0
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
                min={100}
                step={100}
                onBlur={(e:React.FocusEvent<HTMLInputElement>) => {
                    const posInput = e.target as HTMLInputElement
                    dispatch(setExpansionJointPosition ({
                        id: id,
                        position: Number(posInput.value),
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
                    dispatch(setExpansionJointLength({
                        id: id,
                        length: Number(lenInput.value),
                    }))
                }}
            />
        </label>

        <label htmlFor="">
            Мин расстояние от шва до стойки слева в мм
            <input type="number"
                defaultValue={250}
                onBlur={(e:React.FocusEvent<HTMLInputElement>) => {
                    const left = e.target as HTMLInputElement
                    dispatch(setExpansionJointLeft({
                        id: id,
                        position: -1,
                        length: -1,
                        left: Number(left.value),
                        right: 250
                    }))
                }}
            />
        </label>

        <label htmlFor="">
            Мин расстояние от шва до стойки справа в мм
            <input type="number"
                defaultValue={250}
                onBlur={(e:React.FocusEvent<HTMLInputElement>) => {
                    const right = e.target as HTMLInputElement
                    dispatch(setExpansionJointRight({
                        id: id,
                        position: -1,
                        length: -1,
                        left: -1,
                        right: Number(right.value)
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
