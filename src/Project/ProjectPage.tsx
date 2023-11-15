import './ProjectPage.css'
import React, { useState, useEffect, useRef } from 'react'
import { IDrawAreaStyles, ICursorPosition } from '../Types/Types'

interface IPagedDim {
    width: string,
    height: string
}

const ProjectPage = () => {
    const [pageSize, setPageSize] = useState<IPagedDim>({width:'4200', height:'2970'})

    const chosePageFormat = (e:React.ChangeEvent<HTMLSelectElement>):void => {
        if (e.target.value === 'A0') {
            setPageSize({width:'11890', height:'8410'})
        } else if (e.target.value === 'A1') {
            setPageSize({width: '8410', height:'5940'})
        } else if (e.target.value === 'A2') {
            setPageSize({width: '5940', height: '4200'})
        } else if (e.target.value === 'A3') {
            setPageSize({width: '4200', height: '2970'})
        }
    }


    const [drawParam, setDrawParam] = useState<IDrawAreaStyles>({
        height: '100%',
        width: '100%',
        cursor: 'grab',
        transform: ''
    })

        const cursorPos = useRef({
        startX: 0,
        startY: 0,
        pointX: 0,
        pointY: 0,
        scale: 1,
        flag: false
    })

    const changeScale = (e:React.WheelEvent):void => {

        (e.deltaY > 0) ? cursorPos.current.scale /= 1.05 : cursorPos.current.scale *= 1.05

        const xs = (e.clientX - cursorPos.current.pointX) / cursorPos.current.scale;
        const ys = (e.clientY - cursorPos.current.pointY) / cursorPos.current.scale;

        cursorPos.current.pointX = e.clientX - xs * cursorPos.current.scale;
        cursorPos.current.pointY = e.clientY - ys * cursorPos.current.scale;
        console.log(xs)
        
        setDrawParam(
            {
                ...drawParam,
                transform: `translate(${cursorPos.current.pointX}px, ${cursorPos.current.pointY}px) scale(${cursorPos.current.scale})`
            }
        )
    }

    const fixAreaPoint = (e:React.MouseEvent) => {
        e.preventDefault()
        if (e.button === 1) {
            cursorPos.current = {
                ...cursorPos.current,
                startX: (e.clientX - cursorPos.current.startX),
                startY: (e.clientY - cursorPos.current.startY),
                flag: true
            }
        }
    }

    const unfixAreaPoint = (e:React.MouseEvent) => {
        if (e.button === 1) {
            cursorPos.current = {
                ...cursorPos.current,
                flag: false,
                startX: (e.clientX - cursorPos.current.startX),
                startY: (e.clientY - cursorPos.current.startY)
            }
        }
    }

    const unfixOutAreaPoint = (e:React.MouseEvent) => {
        if (e.button === 1) {
            cursorPos.current = {
                ...cursorPos.current,
                flag: false
            }
        }
    }

    const moveArea = (e:React.MouseEvent) => {
        if (cursorPos.current.flag) {
            cursorPos.current = {
                    ...cursorPos.current,
                    pointX: e.clientX - cursorPos.current.startX,
                    pointY: e.clientY - cursorPos.current.startY
                }
            
            setDrawParam(
                {
                    ...drawParam,
                    transform: `translate(${cursorPos.current.pointX}px, ${cursorPos.current.pointY}px) scale(${cursorPos.current.scale})`
                }
            )
        }
    }

    const showAll = (e:React.MouseEvent) => {
        cursorPos.current.startX = 0;
        cursorPos.current.startY = 0;
        cursorPos.current.pointX = 0;
        cursorPos.current.pointY = 0;
        cursorPos.current.scale = 1;
        setDrawParam({
            ...drawParam,
            transform: `translate(0, 0) scale(1)`
        })
    }


  return (
    <div className="project-page" onMouseUp={unfixOutAreaPoint}>
        <div className="project-menu">
            projectName
            <label htmlFor="pageFormat">
                Формат листа
                <select name="pageFormat"
                    defaultValue='A3'
                    onChange={chosePageFormat}
                >
                    <option value="A0">A0</option>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="A3">A3</option>
                </select>
            </label>
        </div>
        <div className="work-place"
            onWheel={changeScale}
            onMouseDown={fixAreaPoint}
            onMouseUp={unfixAreaPoint}
            onMouseMove={moveArea}
        >
            <button className="show-all-btn" onClick={showAll}>
                Показать все
            </button>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${pageSize.width} ${pageSize.height}`}
                style={drawParam}
            >
                <g key={`ril_0`}>
                    <path d={`M20 5
                        L${pageSize.width} 5
                        L${pageSize.width} ${pageSize.height}
                        L20 ${pageSize.height}Z`}
                        fill="none" stroke="blue" strokeWidth="2"
                    />
                </g>
            </svg>
        </div>
    </div>
  )
}

export default ProjectPage
