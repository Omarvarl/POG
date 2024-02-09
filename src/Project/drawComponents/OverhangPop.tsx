import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
    setEndLength,
    setStartLength,
    setStartType,
    setEndType,
    setStartfilling,
    setEndfilling
} from '../../store/overhangsSlice'
import '../ProjectPage.css'

export default function OverhangPop() {

    var {start, end} = useAppSelector(state => state.overnahgs)
    var overhangVisibility = useAppSelector(state => state.overhangVisibility)
    var overhang = overhangVisibility.target === 'start' ? start : end
    var dispatch = useAppDispatch()

    var [value, setValue] = useState<{start: number, end: number}>({start: start.length, end: end.length})

  return (
    <div
        className='overhang-menu'
        style={{display: overhangVisibility.display}}
     >
        <label>
            {overhangVisibility.target === 'start' ? 'Начальный свес' : 'Конечный свес'}
        </label>
        <label>
            Длина свеса
            <input type="number"
                min={250}
                value={overhangVisibility.target === 'start' ? value.start : value.end}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const target = e.target as HTMLInputElement
                    overhangVisibility.target === 'start'
                        ? setValue({...value, start: Number(target.value)})
                        : setValue({...value, end: Number(target.value)})
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    const target = e.target as HTMLInputElement
                    dispatch(overhangVisibility.target === 'start'
                        ? setStartLength(Number(target.value))
                        : setEndLength(Number(target.value)))
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    const target = e.target as HTMLInputElement
                    if (e.key === 'Enter') {
                        dispatch(overhangVisibility.target === 'start'
                            ? setStartLength(Number(target.value))
                            : setEndLength(Number(target.value)))
                    }
                }}
            />
        </label>
        <label>
            Тип свеса
            <select name="overhangType"
                value={overhang.type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    dispatch(overhangVisibility.target === 'start'
                        ? setStartType(e.target.value)
                        : setEndType(e.target.value))
                }}
            >
                <option value="withBevel">Со скосом</option>
                <option value="straight">Прямой</option>
            </select>
        </label>
        <label>
            Заполнение
            <select name="overhangFilling"
                value={overhang.filling ? 'yes' : 'no'}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    dispatch(overhangVisibility.target === 'start'
                        ? setStartfilling(e.target.value === 'yes' ? true : false)
                        : setEndfilling(e.target.value === 'yes' ? true : false))
                }}
            >
                <option value="yes">Да</option>
                <option value='no'>Нет</option>
            </select>
        </label>

    </div>
  )
}
