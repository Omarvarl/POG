import { useAppDispatch, useAppSelector } from '../../hooks';
import './Drawing.css'
import { showStampMenu } from '../../store/stampSlice';
import React from 'react';

export default function BaseTable({scale}: {scale: number}) {
  const pageSize = useAppSelector(state => state.realPageSize);
  const width = pageSize.width * pageSize.factor;
  const height = (pageSize.factor === 1) ? pageSize.height : pageSize.height * 2;
  var {designer, checker, techControl, normControl, approver} = useAppSelector(state => state.stamp)
  var fontSize = `${50}px`
  var fontSize7 = `${70}px`
  var fontSize10 = `${100}px`
  var dispatch = useAppDispatch()
  return (
    <g
      className='stamp'
      onClick={(e: React.MouseEvent) => {dispatch(showStampMenu())}}
    >
      <path
        d={`M${width - 50} ${height - 50 - 550}
            L${width - 50 - 1850} ${height - 50 - 550}
            L${width - 50 - 1850} ${height - 50}
            L${width - 50} ${height - 50}Z`}
        fill="white"
        stroke="blue"
        strokeWidth="3"
      />

      <path
        d={`M${width - 50 - 500 - 700} ${height - 50 - 550}
            L${width - 50 - 500 - 700} ${height - 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />

      <path
        d={`M${width - 50 - 500 - 700} ${height - 50 - 400}
            L${width - 50} ${height - 50 - 400}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      
      <path
        d={`M${width - 50 - 500 - 700} ${height - 50 - 150}
            L${width - 50} ${height - 50 - 150}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      
      <path
        d={`M${width - 50 - 500} ${height - 50 - 400}
            L${width - 50 - 500} ${height - 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      
      <path
        d={`M${width - 50 - 500} ${height - 50 - 350}
            L${width - 50} ${height - 50 - 350}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      
      <path
        d={`M${width - 50 - 500} ${height - 50 - 200}
            L${width - 50} ${height - 50 - 200}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />

      <path
        d={`M${width - 50 - 180} ${height - 50 - 400}
            L${width - 50 - 180} ${height - 50 - 200}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      
      <path
        d={`M${width - 50 - 180 - 170} ${height - 50 - 400}
            L${width - 50 - 180 - 170} ${height - 50 - 200}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      
      <path
        d={`M${width - 50 - 180 - 170 - 50} ${height - 50 - 350}
            L${width - 50 - 180 - 170 - 50} ${height - 50 - 200}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      
      <path
        d={`M${width - 50 - 180 - 170 - 50 - 50} ${height - 50 - 350}
            L${width - 50 - 180 - 170 - 50 - 50} ${height - 50 - 200}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />

      <path
        d={`M${width - 50 - 180 - 170 - 50 - 50 - 50 + 200} ${height - 50 - 200}
            L${width -50 - 180 - 170 - 50 - 50 - 50 + 200} ${height - 50 - 150}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />

      <path
        d={`M${width - 50 - 1850} ${height - 50 - 550 + 50}
          L${width - 50 - 700 - 500} ${height - 50 - 550 + 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="1"
      />
      
      <path
        d={`M${width - 50 - 1850} ${height - 50 - 550 + 50 + 50}
          L${width - 50 - 700 - 500} ${height - 50 - 550 + 50 + 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="1"
      />

      <path
        d={`M${width - 50 - 1850} ${height - 50 - 550 + 50 + 50 + 50}
          L${width - 50 - 700 - 500} ${height - 50 - 550 + 50 + 50 + 50 }`}
        fill="none"
        stroke="blue"
        strokeWidth="1"
      />

      <path
        d={`M${width - 50 - 1850} ${height - 50 - 550 + 50 + 50 + 50 + 50}
          L${width - 50 - 700 - 500} ${height - 50 - 550 + 50 + 50 + 50 + 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      <path
        d={`M${width - 50 - 1850} ${height - 50 - 550 + 50 + 50 + 50 + 50 + 50}
          L${width - 50 - 700 - 500} ${height - 50 - 550 + 50 + 50 + 50 + 50 + 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      <path
        d={`M${width - 50 - 1850} ${height - 50 - 550 + 50 + 50 + 50 + 50 + 50 + 50}
          L${width - 50 - 700 - 500} ${height - 50 - 550 + 50 + 50 + 50 + 50 + 50 + 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="1"
      />
      <path
        d={`M${width - 50 - 1850} ${height - 50 - 550 + 50 + 50 + 50 + 50 + 50 + 50 + 50}
          L${width - 50 - 700 - 500} ${height - 50 - 550 + 50 + 50 + 50 + 50 + 50 + 50 + 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="1"
      />
      <path
        d={`M${width - 50 - 1850} ${height - 50 - 550 + 50 + 50 + 50 + 50 + 50 + 50 + 50 + 50}
          L${width - 50 - 700 - 500} ${height - 50 - 550 + 50 + 50 + 50 + 50 + 50 + 50 + 50 + 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="1"
      />
      <path
        d={`M${width - 50 - 1850} ${height - 50 - 550 + 50 + 50 + 50 + 50 + 50 + 50 + 50 + 50 + 50}
          L${width - 50 - 700 - 500} ${height - 50 - 550 + 50 + 50 + 50 + 50 + 50 + 50 + 50 + 50 +50}`}
        fill="none"
        stroke="blue"
        strokeWidth="1"
      />
      <path
        d={`M${width - 50 - 1850} ${height - 50 - 550 + 50 + 50 + 50 + 50 + 50 + 50 + 50 + 50 + 50 + 50}
          L${width - 50 - 700 - 500} ${ height - 50 - 550 + 50 + 50 + 50 + 50 + 50 + 50 + 50 + 50 + 50 + 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="1"
      />

      <path
        d={`M${width - 50 - 1850 + 70} ${height - 50 - 550}
          L${width - 50 - 1850 + 70} ${height - 50 - 550 + 250}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      <path
        d={`M${width - 50 - 1850 + 70 + 100} ${height - 50 - 550}
          L${width - 50 - 1850 + 70 + 100} ${height - 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      <path
        d={`M${width - 50 - 1850 + 70 + 100 + 230} ${height - 50 - 550}
          L${width - 50 - 1850 + 70 + 100 + 230} ${height - 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />

      <path
        d={`M${width - 50 - 1850 + 70 + 100 + 230 + 150} ${height - 50 - 550}
          L${width - 50 - 1850 + 70 + 100 + 230 + 150} ${height - 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />

      <text
        x={width - 48 - 1850}
        y={height - 55 - 250}
        fontSize={fontSize}
      >
        Разраб.
      </text>

      <text
        x={width - 48 - 1850 + 170}
        y={height - 55 - 250}
        fontSize={fontSize}
      >
        {designer}
      </text>

      <text
        x={width - 48 - 1850}
        y={height - 55 - 200}
        fontSize={fontSize}
      >
        Пров.
      </text>

      <text
        x={width - 48 - 1850 + 170}
        y={height - 55 - 200}
        fontSize={fontSize}
      >
        {checker}
      </text>

      <text
        x={width - 48 - 1850}
        y={height - 55 - 150}
        fontSize={fontSize}
      >
        Т.контр.
      </text>

      <text
        x={width - 48 - 1850 + 170}
        y={height - 55 - 150}
        fontSize={fontSize}
      >
        {techControl}
      </text>

      <text
        x={width - 48 - 1850}
        y={height - 55 - 50}
        fontSize={fontSize}
      >
        Н.контр.
      </text>

      <text
        x={width - 48 - 1850 + 170}
        y={height - 55 - 50}
        fontSize={fontSize}
      >
        {normControl}
      </text>

      <text
        x={width - 48 - 1850}
        y={height - 55}
        fontSize={fontSize}
      >
        Утв.
      </text>

      <text
        x={width - 48 - 1850 + 170}
        y={height - 55}
        fontSize={fontSize}
      >
        {approver}
      </text>

      <text
        x={width - 48 - 1850}
        y={height - 55 - 300}
        fontSize={fontSize}
      >
        Изм.
      </text>

      <text
        x={width - 48 - 1850 + 70}
        y={height - 55 - 300}
        fontSize={fontSize}
      >
        Лист
      </text>

      <text
        x={width - 48 - 1850 + 200}
        y={height - 55 - 300}
        fontSize={fontSize}
      >
        № докум.
      </text>

      <text
        x={width - 48 - 1850 + 170 + 250}
        y={height - 55 - 300}
        fontSize={fontSize}
      >
        Подп.
      </text>

      <text
        x={width - 48 - 1850 + 170 + 230 + 150}
        y={height - 55 - 300}
        fontSize={fontSize}
      >
        Дата
      </text>

      <text
        x={width - 48 - 500 - 640}
        y={height - 100}
        fontSize={fontSize7}
      >
        Перильное ограждение
      </text>

      <text
        x={width - 48 - 420}
        y={height - 90}
        fontSize={fontSize10}
      >
        ООО "НЦК"
      </text>

      <text
        x={width - 48 - 470}
        y={height - 55 - 350}
        fontSize={fontSize}
      >
        Лит.
      </text>

      <text
        x={width - 48 - 325}
        y={height - 55 - 350}
        fontSize={fontSize}
      >
        Масса
      </text>

      <text
        x={width - 48 - 175}
        y={height - 55 - 350}
        fontSize={fontSize}
      >
        Масштаб
      </text>

      <text
        x={width - 48 - 470}
        y={height - 55 - 150}
        fontSize={fontSize}
      >
        Лист
      </text>

      <text
        x={width - 48 - 240}
        y={height - 55 - 150}
        fontSize={fontSize}
      >
        Листов       1
      </text>

      <text
        x={width - 48 - 145}
        y={height - 55 - 250}
        fontSize={fontSize7}
      >
        1:{scale * 10}
      </text>
    </g>
  );
}
