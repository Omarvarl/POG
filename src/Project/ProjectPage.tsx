import "./ProjectPage.css";
import React, { useRef } from "react";
import { ICursorPosition } from "../Types/Types";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setDrawParam } from "../store/drawParamSlice";
import Drawing from "./drawComponents/Drawing";
import Menu from "./menuComponents/Menu";

const ProjectPage = () => {
  const dispatch = useAppDispatch();
  const pageSize = useAppSelector((state) => state.pageSize);

  const realPageSize = useAppSelector(state => state.realPageSize)

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

  return (
    <div className="project-page" onMouseUp={unfixOutAreaPoint}>
      <Menu />
      <div
        className="work-place"
        onWheel={changeScale}
        onMouseDown={fixAreaPoint}
        onMouseUp={unfixAreaPoint}
        onMouseMove={moveArea}
      >
        <button className="show-all-btn" onClick={showAll}>
          Показать все
        </button>
        <div
          className="draw-page"
          style={{
            transform: drawParam,
            ...pageSize,
          }}
        >
          <Drawing
            width={realPageSize.width}
            height={realPageSize.height}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
