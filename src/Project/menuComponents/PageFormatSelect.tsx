import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPageSize } from "../../store/pageSizeSlice";
import { setPOLength } from "../../store/POLengthSlice";
import { setRealPageSize } from "../../store/realPageSizeSlice";

export default function PageFormatSelect():JSX.Element {

  const dispatch = useAppDispatch();
  const POLengthData = useAppSelector(state => state.POLength)

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
    dispatch(setRealPageSize({ width: width, height: height }));
    dispatch(setPOLength({...POLengthData, screenWidth: width}))

    while (window.innerWidth * 0.85 < width || window.innerHeight < height) {
      width /= 1.1;
      height /= 1.1;
    }

    dispatch(setPageSize({ width: width, height: height }));
  };

  return (
    <label htmlFor="pageFormat">
      Формат листа
      <select name="pageFormat" defaultValue="A3" onChange={chosePageFormat}>
        <option value="A0">A0</option>
        <option value="A1">A1</option>
        <option value="A2">A2</option>
        <option value="A3">A3</option>
      </select>
    </label>
  );
}
