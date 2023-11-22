import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { removeExpansionJoint, setPosition, setLength, setLeft, setRight } from '../../store/expansionJointsSlice'
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
                        length: -1,
                        left: 250,
                        right: 250
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
                        length: Number(lenInput.value),
                        left: 250,
                        right: 250
                    }))
                }}
            />
        </label>

        <label htmlFor="">
            Мин расстояние от шва до стойки слева
            <input type="number"
                defaultValue={250}
                onBlur={(e:React.FocusEvent<HTMLInputElement>) => {
                    const left = e.target as HTMLInputElement
                    dispatch(setLeft({
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
            Мин расстояние от шва до стойки справа
            <input type="number"
                defaultValue={250}
                onBlur={(e:React.FocusEvent<HTMLInputElement>) => {
                    const right = e.target as HTMLInputElement
                    dispatch(setRight({
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
