import PageFormatSelect from "./PageFormatSelect";
import { useAppDispatch, useAppSelector } from "../../hooks";
import './Menu.css'
import { setViewBreakState } from "../../store/viewBreakSlice";
import StampPop from "../drawComponents/StampPop";
import OverhangPop from "../drawComponents/OverhangPop";
import ExJointPop from "../drawComponents/ExJointPop";
import { changeUpFitingState } from "../../store/upFitingSlice";

export default function Menu() {
  const dispatch = useAppDispatch()
  const viewBreak = useAppSelector(state => state.viewBreak)
  const upFitingState = useAppSelector(state => state.upFitingState)

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

      <label
        className="up-fiting_switch"
      >
        <input id="up-fiting_switch" type='checkbox'
          defaultChecked={upFitingState}
          onClick={ () => dispatch(changeUpFitingState()) }
        />
        Добавить верхний фитинг
      </label>
      <StampPop />
      <OverhangPop />
      <ExJointPop />
    </div>
  );
}
