import "./ProjectPage.css";
import React, { useRef } from "react";
import { ICursorPosition } from "../Types/Types";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setDrawParam } from "../store/drawParamSlice";
import Drawing from "./drawComponents/Drawing";
import Menu from "./menuComponents/Menu";
import { hidePopUp } from "../store/popUpSlice";
import { addPlate, connectPlates, removePlate } from "../store/platesSlice";
import { addPlateJoint, removePlateJoint, setIDJoint, setLengthJoint } from "../store/platesJointsSlice";
import { hideInput } from "../store/inputVisibilitySlice";
import { setLength, setPosition } from "../store/platesSlice";
import { setPOLength } from "../store/POLengthSlice";
import { addExpansionJoin, removeExpansionJoint } from "../store/expansionJointsSlice";
import { setCurrentPlate } from "../store/currentPlateSlice";

const ProjectPage = () => {
  const dispatch = useAppDispatch();
  const visibility = useAppSelector(state => state.popUp)
  const inputVisibility = useAppSelector(state => state.inputVisibility)
  const currentPlate = useAppSelector(state => state.currentPlate)
  const plates = useAppSelector(state => state.plates)
  const plateJoints = useAppSelector(state => state.platesJoints)
  const pageSize = useAppSelector((state) => state.pageSize);
  const POLengthData = useAppSelector(state => state.POLength)



  const drawParam = useAppSelector((state) => state.drawParam);

  const cursorPos = useRef<ICursorPosition>({
    startX: 0,
    startY: 0,
    pointX: 0,
    pointY: 0,
    scale: 1,
    flag: false,
  });

  const changeScale = (e: React.WheelEvent): void => {
    e.deltaY > 0
      ? (cursorPos.current.scale /= 1.2)
      : (cursorPos.current.scale *= 1.2);

    const xs = (e.clientX - cursorPos.current.pointX) / cursorPos.current.scale;
    const ys = (e.clientY - cursorPos.current.pointY) / cursorPos.current.scale;

    cursorPos.current.pointX = e.clientX - xs * cursorPos.current.scale;
    cursorPos.current.pointY = e.clientY - ys * cursorPos.current.scale;

    dispatch(
      setDrawParam(
        `translate(${cursorPos.current.pointX}px, ${cursorPos.current.pointY}px) scale(${cursorPos.current.scale})`
      )
    );
  };

  const fixAreaPoint = (e: React.MouseEvent) => {
    // e.preventDefault();
    if (e.button === 1) {
      cursorPos.current = {
        ...cursorPos.current,
        startX: e.clientX - cursorPos.current.startX,
        startY: e.clientY - cursorPos.current.startY,
        flag: true,
      };
    }
  };

  const unfixAreaPoint = (e: React.MouseEvent) => {
    if (e.button === 1) {
      cursorPos.current = {
        ...cursorPos.current,
        flag: false,
        startX: e.clientX - cursorPos.current.startX,
        startY: e.clientY - cursorPos.current.startY,
      };
    }
  };

  const unfixOutAreaPoint = (e: React.MouseEvent) => {
    if (e.button === 1) {
      cursorPos.current = {
        ...cursorPos.current,
        flag: false,
      };
    }
  };

  const moveArea = (e: React.MouseEvent) => {
    if (cursorPos.current.flag) {
      
      cursorPos.current = {
        ...cursorPos.current,
        pointX: e.clientX - cursorPos.current.startX,
        pointY: e.clientY - cursorPos.current.startY,
      };

      dispatch(
        setDrawParam(
          `translate(${cursorPos.current.pointX}px, ${cursorPos.current.pointY}px) scale(${cursorPos.current.scale})`
        )
      );
    }
  };

  const showAll = (e: React.MouseEvent) => {
    cursorPos.current.startX = 0;
    cursorPos.current.startY = 0;
    cursorPos.current.pointX = 0;
    cursorPos.current.pointY = 0;
    cursorPos.current.scale = 1;
    dispatch(setDrawParam(`translate(0, 0) scale(1)`));
  };

  
  const popUp = <>
  <div
    onClick={() => dispatch(hidePopUp())}
    className="background-modal"
    style={{display: visibility.display}}
  >
  <div
      style={{display: visibility.display, left: `${visibility.x + 20}px`, top: `${visibility.y - 20}px`}}
      className='pop-up'
    >
      <button
        onClick={addNewPlate}
      >
        Разделить плиту
      </button>
      <button
        // onClick={addExpansionJoinToPlate}
      >
        Добавить деф. шов
      </button>
      <button
        onClick={() => {
          dispatch(connectPlates(currentPlate.id))
          // dispatch(removePlateJoint(currentPlate.id))
          dispatch(removePlateJoint(`pj_${currentPlate.id.split('_')[1]}`))
          // console.log(plateJoints, `pj_${currentPlate.id.split('_')[1]}`)
        }}
      >
        Удалить плиту
      </button>
    </div>
  </div>
  </>

  function addExpansionJoinToPlate() {
    // console.log(currentPlate.position + currentPlate.length / 2 - 25)

    const [rightPlate, leftPlate] = createNewPlate()
    dispatch(addExpansionJoin({
      id: `ej_${leftPlate.id.split('_')[1]}`,
      position: leftPlate.position + leftPlate.length / 2 - 25,
      length: 50,
      left: 250,
      right: 250
    }))
  }

  function getCurrentPJLength() {
    const index = plateJoints.findIndex(elm => elm.id.split('_')[1] === currentPlate.id.split('_')[1])
    let pjLength = 50
    if (index !== -1) {
      pjLength = plateJoints[index].length
    }
    return pjLength
  }

  function addNewPlate() {
    const pjLength = getCurrentPJLength()
    const [leftPlate, rightPlate] = createNewPlate()
    dispatch(addPlateJoint({id: `pj_${leftPlate.id.split('_')[1]}`, length: 50}))
    if (plates.length > 1)
    dispatch(addPlateJoint({id: `pj_${rightPlate.id.split('_')[1]}`, length: pjLength}))
  }

  function createNewPlate() {
    const IDs = plates.map(p => Number(p.id.split('_')[1]))
    const max = Math.max(...IDs)
    let index = 0
    for (let i = 0; i <= max + 1; i++) {
      if (!IDs.includes(i)) {
        index = i
        break
      }
    }
    const leftPlate = {
      id: currentPlate.id,
      position: currentPlate.position,
      length: currentPlate.length / 2 - 25,
      left: 250,
      right: 250
    }

    const rightPlate = {
      id: `plate_${index}`,
      position: currentPlate.length / 2 + 25 + currentPlate.position,
      length: currentPlate.length / 2 - 25,
      left: 250,
      right: 250
    }


    dispatch(removePlate(currentPlate.id))
    dispatch(removePlateJoint(`pj_${currentPlate.id.split('_')[1]}`))
    // dispatch(removeExpansionJoint(`ej_${currentPlate.id.split('_')[1]}`))
    // console.log(`pj_${currentPlate.id.split('_')[1]}`, plateJoints)
    // dispatch(setIDJoint({id: `pj_${currentPlate.id.split('_')[1]}`, newId: `pj_${rightPlate.id.split('_')[1]}`}))
    dispatch(addPlate(leftPlate))
    dispatch(addPlate(rightPlate))

    // dispatch(setCurrentPlate(leftPlate))
    return [leftPlate, rightPlate]
  }

  const inputElement = (
    <div
    className="background-modal"
    style={{display: inputVisibility.display}}
    onMouseDown={(e: React.MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.classList.contains('dim-input'))
      dispatch(hideInput())
    } }
    >
      <input
        className="dim-input"
        style={ inputVisibility }
        type="number"
        min={500}
        step={100}
        defaultValue={currentPlate.length}
        contentEditable={true}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          const target = e.target as HTMLInputElement
          changePlateLength(target)
        }}
        key={currentPlate.id}
        autoFocus
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
          e.target.select()
        }}
      />
    </div>
)

function changePlateLength(target:HTMLInputElement) {

  const index = plates.findIndex(elm => elm.id.split('_')[1] === currentPlate.id.split('_')[1])

  if (currentPlate.id.split('_')[0] === 'plate') {

    if (index !== plates.length - 1) {
      if (Number(target.value) > 0 && Number(target.value) < plates[index + 1].length + plates[index].length) {
        dispatch(setLength({
          id: plates[index + 1].id,
          position: 0,
          length: plates[index + 1].length + (plates[index].length - Number(target.value)),
          left: 0,
          right: 0
        }))
        dispatch(setPosition({
          id: plates[index + 1].id,
          position: plates[index + 1].position - (plates[index].length - Number(target.value)),
          length: 0,
          left: 0,
          right: 0
        }))
        dispatch(setLength({
          id: currentPlate.id,
          position: 0,
          length: Number(target.value),
          left: 0,
          right: 0
        }))
      }
  
    } else if (index !== 0 && index === plates.length - 1) {
      if (Number(target.value) < plates[index - 1].length + plates[index].length) {
        // console.log(Number(target.value), plates[index + 1].length + plates[index + 1].position)

        dispatch(setPosition({
          id: plates[index].id,
          position: plates[index].position + (plates[index].length - Number(target.value)),
          length: 0,
          left: 0,
          right: 0
        }))
        dispatch(setLength({
          id: plates[index - 1].id,
          position: 0,
          length: plates[index - 1].length + (plates[index].length - Number(target.value)),
          left: 0,
          right: 0
        }))
        dispatch(setLength({
          id: plates[index].id,
          position: 0,
          length: Number(target.value),
          left: 0,
          right: 0
        }))
      }
    } else if (index === plates.length - 1 && index === 0) {
      dispatch(setLength({
        id: currentPlate.id,
        position: 0,
        length: Number(target.value),
        left: 0,
        right: 0
      }))
      // console.log(plates)
    }
  } else if (currentPlate.id.split('_')[0] === 'pj') {
    const i = plateJoints.findIndex(elm => elm.id.split('_')[1] === plates[index].id.split('_')[1])

      if (Number(target.value) < plates[index].length - 500) {
        dispatch(setLength({
          id: plates[index].id,
          position: 0,
          length: plates[index].length - (Number(target.value) - plateJoints[i].length),
          left: 0,
          right: 0
        }))
        // console.log(plates[index].id, plateJoints[i].plateId, i, index)
        dispatch(setLengthJoint({id: plateJoints[i].id, length: Number(target.value)}))
      }

  } else if (currentPlate.id.split('_')[0] === 'POLength') {
    dispatch(setPOLength({
      ...POLengthData,
      POLength: Number(target.value)
    }))
    dispatch(setLength({
      id: plates[plates.length - 1].id,
      position: 0,
      length: Number(target.value) - plates[plates.length - 1].position,
      left: 0,
      right: 0
    }))
  }
}

  return (
    <div className="project-page"
      onMouseUp={unfixOutAreaPoint}
      // onClick={(e: React.MouseEvent) => console.log(e.pageX)}
    >
      
      <Menu />
      <div
        className="work-place"
        onWheel={changeScale}
        onMouseDown={fixAreaPoint}
        onMouseUp={unfixAreaPoint}
        onMouseMove={moveArea}
      >
        {popUp}

        <button className="show-all-btn" onClick={showAll}>
          Показать все
        </button>
        <div
          className="draw-page"
          style={{
            transform: drawParam,
            ...pageSize,
            width: pageSize.width * pageSize.factor,
            height: (pageSize.factor === 1) ? pageSize.height : pageSize.height * 2
          }}
        >
        { inputElement }
          <Drawing />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
