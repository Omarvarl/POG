import '../Drawing.css'
import { IInitCoord } from '../../../Types/Types'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { showOverhangMenu } from '../../../store/overhangsVisibilitySlice'
import FillingTubesSet from './FillingTubesSet'

export default function End({initX, initY, scale=1}:IInitCoord) {

  var dispatch = useAppDispatch()
  var overhang = useAppSelector(state => state.overnahgs.end)
  var length = overhang.length / scale

  const profileWidth = 58 / scale
  const profileWidth1 = 88 / scale
  const profileTickness = 3.5 / scale
  var filling = <></>

  var beams = overhang.type === 'straight'
    ? <>
      <path className="base-line"  //  profile 2
        d={`M${initX + length - profileWidth} ${initY - profileWidth / 2}
              L${initX + length - profileWidth} ${initY - (1100 - 169) / scale + profileWidth}
              L${initX + length} ${initY - (1100 - 169) / scale}
              L${initX + length} ${initY + profileWidth / 2}Z
          `}
      />

      <path className="base-line-fill"  //  profile 3
        d={`M${initX} ${initY - (1100 - 169) / scale - profileTickness}
              L${initX + length} ${initY - (1100 - 169) / scale - profileTickness}
              L${initX + length - profileWidth} ${initY - (1100 - 169) / scale + profileWidth - profileTickness}
              L${initX} ${initY - (1100 - 169) / scale + profileWidth - profileTickness}Z
          `}
      />
    </>
    : <>
      <path className="base-line"  //  profile 2
        d={`M${initX + length - profileWidth} ${initY - profileWidth / 2}
              L${initX + length - profileWidth} ${initY - 602 / scale}
              L${initX + length} ${initY - 612 / scale}
              L${initX + length} ${initY + profileWidth / 2}Z
          `}
      />

      <path className="base-line-fill"  //  profile 3
        d={`M${initX} ${initY - (1100 - 169) / scale - profileTickness}
              L${initX + length - 116 / scale} ${initY - (1100 - 169) / scale - profileTickness}
              L${initX + length - 157 / scale} ${initY - (1100 - 169) / scale + profileWidth - profileTickness}
              L${initX} ${initY - (1100 - 169) / scale + profileWidth - profileTickness}Z
          `}
      />

      <path className="base-line"  //  profile 4
        d={`M${initX + length - 116 / scale} ${initY - (1100 - 169) / scale - profileTickness}
              L${initX + length} ${initY - 612 / scale}
              L${initX + length - profileWidth} ${initY - 602 / scale}
              L${initX + length - 157 / scale} ${initY - (1100 - 169) / scale + profileWidth - profileTickness}Z
          `}
      />
    </>

    if (overhang.filling && overhang.length >= 270) filling = <>
      <FillingTubesSet initX={initX - 9 / scale} initY={initY + 169 / scale} sectionLength={length} scale={scale} />
      <path className="base-line"  //  crossbar
            d={`M${initX + profileWidth1 / 2} ${initY - (1100 - 420) / scale - profileTickness}
                  L${initX + profileWidth1 / 2} ${initY - (1100 - 380) / scale - profileTickness}
                  L${initX + length - profileWidth} ${initY - (1100 - 380) / scale - profileTickness}
                  L${initX + length - profileWidth} ${initY - (1100 - 420) / scale - profileTickness}Z
              `}
          />
    </>

  return (
    <g className='end'
      onClick={(e: React.MouseEvent) => {
        const target = e.target as HTMLElement
        dispatch(showOverhangMenu('end'))
    }}
    >
      {filling}
    <path className="base-line-fill"  //  profile 1
      d={`M${initX - profileWidth1 / 2} ${initY + profileWidth / 2}
            L${initX + length} ${initY + profileWidth / 2}
            L${initX + length - profileWidth} ${initY - profileWidth / 2}
            L${initX - profileWidth1 / 2} ${initY - profileWidth / 2}Z
        `}
    />
    {beams}
</g>
  )
}
