import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPageSize } from "../../store/pageSizeSlice";
import { setPOLength } from "../../store/POLengthSlice";
import { setRealPageSize } from "../../store/realPageSizeSlice";

export default function PageFormatSelect():JSX.Element {

  const dispatch = useAppDispatch();
  const POLengthData = useAppSelector(state => state.POLength)
  const pageSize = useAppSelector(state => state.pageSize)
  const realPageSize = useAppSelector(state => state.realPageSize)

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
    dispatch(setRealPageSize({
      ...realPageSize,
      width: width,
      height: height,
      format: e.target.value
    }));
    
    dispatch(setPOLength({...POLengthData, screenWidth: width * realPageSize.factor}))

    while (window.innerWidth * 0.85 < width || window.innerHeight < height) {
      width /= 1.1;
      height /= 1.1;
    }

    dispatch(setPageSize({
      ...pageSize,
      width: width,
      height: height 
    }));
  };

  return (
    <label htmlFor="pageFormat" className="page-format">
      Формат листа
      <div className="format">
      <select name="pageFormat" defaultValue="A2" onChange={chosePageFormat}>
        <option value="A0">A0</option>
        <option value="A1">A1</option>
        <option value="A2">A2</option>
        <option value="A3">A3</option>
      </select>
      X
      <input
        type='number'
        defaultValue={1}
        min={1}
        max={5}
        step={1}
        onChange={(e: React.FocusEvent<HTMLInputElement>) => {
          const factor = e.target as HTMLInputElement;
          dispatch(setPageSize({
            ...pageSize,
            factor: Number(factor.value)
          }));
          dispatch(setRealPageSize({
            ...realPageSize,
            factor: Number(factor.value)
          }));
          dispatch(setPOLength({...POLengthData, screenWidth: realPageSize.width * Number(factor.value)}))

        }}
      >
      </input>
      </div>
    </label>
  );
}
