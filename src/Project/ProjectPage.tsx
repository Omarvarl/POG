import "./ProjectPage.css";
import React, { useRef } from "react";
import { ICursorPosition, IPagedDim } from "../Types/Types";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setPageSize } from "../store/pageSizeSlice";
import { setDrawParam } from "../store/drawParamSlice";
import { setPOLength } from "../store/POLengthSlice";
import BaseTable from "./drawComponents/BaseTable";
import Border from "./drawComponents/Border";

const ProjectPage = () => {
  const dispatch = useAppDispatch();
  const pageSize = useAppSelector((state) => state.pageSize);

  const realPageSize = useRef<IPagedDim>({ width: 4200, height: 2970 });

  const chosePageFormat = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    let width = 0;
    let height = 0;
    if (e.target.value === "A0") {
      width = 11890;
      height = 8410;
    } else if (e.target.value === "A1") {
      width = 8410;
      height = 5940;
    } else if (e.target.value === "A2") {
      width = 5940;
      height = 4200;
    } else if (e.target.value === "A3") {
      width = 4200;
      height = 2970;
    }
    realPageSize.current = { width: width, height: height };

    while (window.innerWidth * 0.85 < width || window.innerHeight < height) {
      width /= 1.1;
      height /= 1.1;
    }

    dispatch(setPageSize({ width: width, height: height }));
  };

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
    e.preventDefault();
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

  const POLength = useAppSelector((state) => state.POLength);

  return (
    <div className="project-page" onMouseUp={unfixOutAreaPoint}>
      <div className="project-menu">
        projectName
        <label htmlFor="pageFormat">
          Формат листа
          <select
            name="pageFormat"
            defaultValue="A3"
            onChange={chosePageFormat}
          >
            <option value="A0">A0</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="A3">A3</option>
          </select>
        </label>
        <label className="PO-length-input">
          Длина ПО
          <input
            type="number"
            defaultValue={POLength}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
              const input = e.target as HTMLInputElement;
              dispatch(setPOLength(Number(input.value)));
            }}
          ></input>
        </label>
      </div>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${realPageSize.current.width} ${realPageSize.current.height}`}
            style={{ width: "100%", height: "100%" }}
          >
            <Border
              width={realPageSize.current.width}
              height={realPageSize.current.height}
            />
            <BaseTable
              width={realPageSize.current.width}
              height={realPageSize.current.height}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
