import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCurrentPlate } from "../../store/currentPlateSlice";
import { setPopUp } from "../../store/popUpSlice";
import './Drawing.css'
import DimArrow from "./DimArrow";
import { useMemo } from "react";


export default function Ground() {
  const dispatch = useAppDispatch()

  const expansionJoints = useAppSelector((state) => state.expansionJoints);
  const plates = useAppSelector(state => state.plates);
  const plateJoints = useAppSelector(state => state.platesJoints);
  const {POLength, screenWidth, scale, reducedLength, reducedScale} = useAppSelector((state) => state.POLength);
  const realPageSize = useAppSelector(state => state.realPageSize)
  const joints = [...expansionJoints, ...plateJoints]
  const initX = 700
  const startY = realPageSize.height / 2 * (realPageSize.factor > 1 ? 2 : 1)
 
  const viewBreak = useAppSelector(state => state.viewBreak)

  const wholeLength = (viewBreak)
    ? reducedLength
    : POLength

  const overallScale = (viewBreak)
    ? reducedScale
    : scale

  let count = 0

  const jointsDimLeft = useMemo(() => {
    return plates.map(elm => {
      const position = (viewBreak)
      ? elm.reducedPosition
      : elm.position;

    let result = <g key={`left_${elm.id}`}></g>
    elm.sections.forEach(section => {
      result = <DimArrow
      initX={initX + position / overallScale}
      initY={startY}
      type={{type: 'hor', dir: 'down'}}
      length={elm.left / overallScale}
      indent={260}
      id={`leftDim_${elm.id}_${section.initX}`}
      key={`leftDim_${elm.id}_${section.initX}`}
    />
    })
    return result
    })
  }, [plates, overallScale, viewBreak])

  const jointsDimRight = useMemo(() => {
    return plates.map(elm => {

      const position = (viewBreak)
      ? elm.reducedPosition
      : elm.position;

      const length = (viewBreak)
      ? elm.reducedLength
      : elm.length;

    let result = <g key={`right_${elm.id}`}></g>
    elm.sections.forEach(section => {
      result = <DimArrow
      initX={initX + (position + length - elm.right) / overallScale}
      initY={startY}
      type={{type: 'hor', dir: 'down'}}
      length={elm.right / overallScale}
      indent={150}
      id={`rightDim_${elm.id}_${section.initX}`}
      key={`rightDim_${elm.id}_${section.initX}`}
    />
  })
  return result
  })
}, [plates, overallScale, viewBreak])

  const expansionJointsDraw = expansionJoints.map(elm => {
    let position = elm.position

    if (viewBreak) {
      plates.forEach(plate => {
        if (elm.id.split('_')[1] === plate.id.split('_')[1]) {
          position = plate.reducedPosition + plate.reducedLength
        }
     })
    }

    const length = elm.length
    count++
    return (
      <g
        className="expansion-join"
        key={`ej_${count}`}
      >
        <path
          d={`M${position / overallScale + initX} ${startY + 150 / overallScale}
              L${position / overallScale + initX} ${startY - 3}
              L${(position + length) / overallScale + initX} ${startY - 3}
              L${(position + length) / overallScale + initX} ${startY + 150 / overallScale}Z
            `}
          fill="white"
          strokeWidth='3'
          stroke="white"
        />
        <path
          d={`M${position / overallScale + initX} ${startY + 150 / overallScale}
              L${position / overallScale + initX} ${startY - 3}
              L${(position - elm.left) / overallScale + initX} ${startY - 3}
            `}
          fill='none'
          strokeWidth='5'
        />

        <path
          d={`M${(position + length) / overallScale + initX} ${startY + 150 / overallScale}
              L${(position + length) / overallScale + initX} ${startY - 3}
              L${(position + length + elm.right) / overallScale + initX} ${startY - 3}
            `}
          fill='none'
          strokeWidth='5'
        />
      </g>
    )
  })

  let result: JSX.Element = <></>;

  function showPop (e: React.MouseEvent) {
    const target = e.target as HTMLElement
    const ids = String(target.parentElement?.id)

    dispatch(setPopUp({x: e.clientX, y: e.clientY}))
    let position = 0
    let length = 0
    plates.forEach(p => {
      if (p.id === ids) {
        position = p.position;
        length = p.length;
      }
    })

    dispatch(setCurrentPlate({id: ids, position: position, length: length}))
  }

  if (POLength < 5000) return result;
  
  if (scale === 100 && POLength / overallScale >= screenWidth) {
    result = <div>TOO BIG</div>;

  }  else {
    let startX = initX;

    result = (
      <g>
          {
            plates.map((p, index) => {
            const  len = (viewBreak) ? p.reducedLength : p.length
            const pos = (viewBreak) ? p.reducedPosition : p.position

            let jointLength = 0
            let plateJointDim = <></>
            let platesDim = <></>
              
            let drawingPlates = <path
              className="ground"
              onClick={showPop}
              d={`M${startX} ${startY + 150 / overallScale}
                  L${startX} ${startY}
                  L${startX + len / overallScale} ${startY}
                  L${startX + len / overallScale} ${startY + 150 / overallScale}
                `}
              fill="url('#concrete')"
              strokeWidth='3'
            />

            if (index < plates.length - 1) {
              joints.forEach(j => {
                if (j.id.split('_')[1] === p.id.split('_')[1]) {
                  jointLength = j.length
                  plateJointDim = <DimArrow
                    initX={startX + len / overallScale}
                    initY={startY} type={{type: 'hor', dir: 'down'}}
                    length={jointLength / overallScale}
                    indent={360}
                    id={j.id}
                  />
                } 
              })

            }
            if (plates.length > 1) {
              platesDim = <DimArrow
                initX={startX}
                initY={startY}
                type={{type: 'hor', dir: 'down'}}
                length={len / overallScale}
                indent={500}
                id={p.id}
              />
            }
            const res = (
              <g
                key={`gj_${p.id}`}
                id={p.id}
              >
                <defs>
                  <pattern
                    id="concrete"
                    patternUnits="userSpaceOnUse"
                    width="25"
                    height="25"
                    viewBox="0 0 10 10"
                  >
                    <path className="ground" d="M 0 5 L 5 0" fill="none" strokeWidth={1} />
                  </pattern>
                </defs>
                  { drawingPlates }
                  { platesDim }
                  { plateJointDim }
                  { expansionJointsDraw }
              </g>
              
            );
            // console.log(wholeLength)
            if (index < plates.length - 1) {
              // console.log(platesJoints)
              startX = initX + (pos + len + jointLength) / overallScale;
            }

            return res;
          })}
          <DimArrow
            initX={initX}
            initY={startY}
            type={{type: 'hor', dir: 'up'}}
            length={wholeLength / overallScale}
            indent={1600 / overallScale}
            id={'POLength_0'}
          />
          { jointsDimLeft }
          { jointsDimRight }
          
      </g>
    );
  }

  return result;
}
