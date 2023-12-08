import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setLeft, setRight, setLength, setPosition } from '../../store/platesSlice'
import './Menu.css'

interface ID {
    id: string
}

export default function PlateJointInput({id}:ID) {
const dispatch = useAppDispatch()
const position = useAppSelector(state => {
    let result = 0
    for (let ej of state.plates) {
        if (ej.id === id) result = ej.position
    }
    return result
})

const length = useAppSelector(state => {
    let result = 0
    for (let ej of state.plates) {
        if (ej.id === id) result = ej.length
    }
    return result
})

  return (
    <div className='plate-joint-input'>
        <label htmlFor="">
            Расстояние до стыка в мм
            <input type="number"
                defaultValue={position}
                min={100}
                step={100}
                onBlur={(e:React.FocusEvent<HTMLInputElement>) => {
                    const posInput = e.target as HTMLInputElement
                    dispatch(setPosition({
                        id: id,
                        position: Number(posInput.value)
                    }))
                }}
            />
        </label>
        <label htmlFor="">
            Размер стыка в мм
            <input type="number"
                defaultValue={length}
                onBlur={(e:React.FocusEvent<HTMLInputElement>) => {
                    const lenInput = e.target as HTMLInputElement
                    dispatch(setLength({
                        id: id,
                        length: Number(lenInput.value),
                    }))
                }}
            />
        </label>

        <label htmlFor="">
            Мин расстояние от стыка до стойки слева в мм
            <input type="number"
                defaultValue={250}
                onBlur={(e:React.FocusEvent<HTMLInputElement>) => {
                    const left = e.target as HTMLInputElement
                    dispatch(setLeft({
                        id: id,
                        left: Number(left.value)
                    }))
                }}
            />
        </label>

        <label htmlFor="">
            Мин расстояние от стыка до стойки справа в мм
            <input type="number"
                defaultValue={250}
                onBlur={(e:React.FocusEvent<HTMLInputElement>) => {
                    const right = e.target as HTMLInputElement
                    dispatch(setRight({
                        id: id,
                        right: Number(right.value)
                    }))
                }}
            />
        </label>
        <button
            className="remove-expansion-joint"
            // onClick={() => dispatch(removePlateJoint(id))}
        >
            Удалить стык
        </button>
    </div>
  )
}
