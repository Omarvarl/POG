import React from 'react'
import './Menu.css'
// import { useAppSelector } from '../../hooks'

export default function ExpansionJointInput() {


  return (
    <div className='expansion-joint-input'>
        <label htmlFor="">
            Расстояние до шва в мм
            <input type="number" />
        </label>
        <label htmlFor="">
            Размер шва в мм
            <input type="number" />
        </label>
    </div>
  )
}
