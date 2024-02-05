import PageFormatSelect from "./PageFormatSelect";
import { useAppDispatch, useAppSelector } from "../../hooks";
import './Menu.css'
import { setViewBreakState } from "../../store/viewBreakSlice";

export default function Menu() {
  const dispatch = useAppDispatch()
  const viewBreak = useAppSelector(state => state.viewBreak)

  return (
    <div className="project-menu">
      <label htmlFor="" className="project-name">
        projectName
      </label>
      <PageFormatSelect />

      <label
        className="view-break"
      >
        <input id="break-view-check" type='checkbox'
          defaultChecked={viewBreak}
          onClick={ () => dispatch(setViewBreakState()) }
        />
        Добавить разрывы вида
      </label>
    </div>
  );
}
