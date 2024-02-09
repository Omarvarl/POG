import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { changeDisplay, setApprover, setChecker, setDesigner, setNormControl, setTechControl } from '../../store/stampSlice'
import './Drawing.css'

export default function StampPop() {
    var dispatch = useAppDispatch()
    var {
        display,
        right,
        bottom,
        designer,
        checker,
        techControl,
        normControl,
        approver
    } = useAppSelector(state => state.stamp)

  return (
    <div
        className='background-modal'
        style={{display: display}}
        onClick={(e: React.MouseEvent) => {
            const target = e.target as HTMLElement
            if(!target.parentElement?.classList.contains('stamp-menu')
                && !target.classList.contains('stamp-input')) dispatch(changeDisplay({right: `0px`, bottom: `0px`}))
        }}
    >
        <div
            className='stamp-menu'
            style={{display: display, right: right, bottom: bottom}}
        >
            <label>
                Разработал
                <input
                    type='text'
                    className='stamp-input'
                    value={designer}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const target = e.target as HTMLInputElement
                        dispatch(setDesigner(target.value))
                    }}
                />
            </label>
            <label>
                Проверил
                <input
                    type='text'
                    className='stamp-input'
                    value={checker}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const target = e.target as HTMLInputElement
                        dispatch(setChecker(target.value))
                    }}
                />
            </label>
            <label>
                Тех. контроль
                <input
                    type='text'
                    className='stamp-input'
                    value={techControl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const target = e.target as HTMLInputElement
                        dispatch(setTechControl(target.value))
                    }}
                />
            </label>
            <label>
                Нормоконтроль
                <input
                    type='text'
                    className='stamp-input'
                    value={normControl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const target = e.target as HTMLInputElement
                        dispatch(setNormControl(target.value))
                    }}
                />
            </label>
            <label>
                Утвердил
                <input
                    type='text'
                    className='stamp-input'
                    value={approver}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const target = e.target as HTMLInputElement
                        dispatch(setApprover(target.value))
                    }}
                />
            </label>
        </div>
    </div>
  )
}
