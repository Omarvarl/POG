import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCurrentPlate } from "../../store/currentPlateSlice";
import { setPopUp } from "../../store/popUpSlice";
import './Drawing.css'
import DimArrow from "./DimArrow";


export default function Ground() {
  const dispatch = useAppDispatch()

  const expansionJoints = useAppSelector((state) => state.expansionJoints);
  const reducedPOLength = useAppSelector(state => state.reducedPOLEngth)
  const plates = useAppSelector(state => state.plates);
  const plateJoints = useAppSelector(state => state.platesJoints);
  let {POLength, screenWidth, scale} = useAppSelector((state) => state.POLength);
  let overallScale = scale
  const joints = [...expansionJoints, ...plateJoints]
  const initX = 700
  const startY = 850
  
  if (reducedPOLength.scale > 1) {
    overallScale = reducedPOLength.scale
    POLength = reducedPOLength.POLength
  }

  let count = 0
  
  const expansionJointsDraw = expansionJoints.map(elm => {
    const reducedLength = elm.reducedLength ? elm.reducedLength : elm.length
    count++
    return (
      <g
        className="expansion-join"
        key={`ej_${count}`}
      >
        <path
          d={`M${elm.position / overallScale + initX} ${startY + 150 / overallScale}
              L${elm.position / overallScale + initX} ${startY}
              L${(elm.position + reducedLength) / overallScale + initX} ${startY}
              L${(elm.position + reducedLength) / overallScale + initX} ${startY + 150 / overallScale}Z
            `}
          fill="white"
          strokeWidth='3'
          stroke="white"
        />
        <path
          d={`M${elm.position / overallScale + initX} ${startY + 150 / overallScale}
              L${elm.position / overallScale + initX} ${startY}
              L${(elm.position - elm.left) / overallScale + initX} ${startY}
            `}
          fill='none'
          strokeWidth='5'
        />

        <path
          d={`M${(elm.position + reducedLength) / overallScale + initX} ${startY + 150 / overallScale}
              L${(elm.position + reducedLength) / overallScale + initX} ${startY}
              L${(elm.position + reducedLength + elm.right) / overallScale + initX} ${startY}
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
    // console.log(plates, plateJoints, expansionJoints)
    let startX = initX;
    result = (
      <g>
          { plates.map((p, index) => {
            // console.log(joints)
            
            let len = p.length
            let jointLength = 0
            let plateJointDim = <></>
            let platesDim = <></>

            let drawPlates = <path
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
                  { drawPlates }
                  { platesDim }
                  { plateJointDim }
                  { expansionJointsDraw }
              </g>
              
            );
            if (index < plates.length - 1) {
              // console.log(platesJoints)
              startX = initX + (p.position + len + jointLength) / overallScale;
            }

            return res;
          })}
          <DimArrow
            initX={initX}
            initY={startY}
            type={{type: 'hor', dir: 'up'}}
            length={POLength / overallScale}
            indent={(700)}
            id={'POLength_0'}
          />
          
      </g>
    );
  }

  return result;
}
