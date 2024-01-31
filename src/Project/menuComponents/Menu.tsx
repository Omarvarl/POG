import PageFormatSelect from "./PageFormatSelect";
import { useAppDispatch, useAppSelector } from "../../hooks";
import './Menu.css'
import { setViewBreakState } from "../../store/viewBreakSlice";

export default function Menu() {
  const dispatch = useAppDispatch()
  const viewBreak = useAppSelector(state => state.viewBreak)
  // const POLengthData = useAppSelector(state => state.POLength)

  return (
    <div className="project-menu">
      <label htmlFor="" className="project-name">
        projectName
      </label>
        <PageFormatSelect />
        {/* <POLengthInput /> */}
        <label htmlFor="break-view-check"
          className="view-break"
            onClick={(e: React.MouseEvent<HTMLLabelElement>) => {
              let check = e.target as HTMLInputElement
              dispatch(setViewBreakState(check.checked))

            }
          }
        >
          <input id="break-view-check" type='checkbox'
            defaultChecked={viewBreak}
          />
          Добавить разрывы вида
        </label>
    </div>
  );
}
