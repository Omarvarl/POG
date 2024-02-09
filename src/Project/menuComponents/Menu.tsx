import PageFormatSelect from "./PageFormatSelect";
import { useAppDispatch, useAppSelector } from "../../hooks";
import './Menu.css'
import { setViewBreakState } from "../../store/viewBreakSlice";
import StampPop from "../drawComponents/StampPop";
import OverhangPop from "../drawComponents/OverhangPop";
import ExJointPop from "../drawComponents/ExJointPop";

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
      <StampPop />
      <OverhangPop />
      <ExJointPop />
    </div>
  );
}
