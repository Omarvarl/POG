import PageFormatSelect from "./PageFormatSelect";
// import POLengthInput from "./POLengthInput";
// import ExpansionJointInput from "./ExpansionJointInput";
// import PlateJointInput from "./PlateJointInput";
import { useAppDispatch, useAppSelector } from "../../hooks";
// import { increaseExpansionJointsQuantity } from "../../store/expansionJointsSlice";
// import { addPlate } from "../../store/platesSlice";
import './Menu.css'
import { setViewBreakState } from "../../store/viewBreakSlice";
import { setReducedPOLength } from "../../store/reducedPOLengthSlice";

export default function Menu() {
  const dispatch = useAppDispatch()
  const viewBreak = useAppSelector(state => state.viewBreak)
  const POLengthData = useAppSelector(state => state.POLength) 
  const reducedPOLEngth = useAppSelector(state => state.reducedPOLEngth)
  const reducedScale = reducedPOLEngth.scale
  // const expansionJointsQuantity = useAppSelector(state => state.expansionJoints)
  // const plateJointsData = useAppSelector(state => state.plateJoints)
  // const expansionJoints:JSX.Element[] = expansionJointsQuantity.map((ej) => {
  //     return <ExpansionJointInput id={ej.id} key={`ej_${ej.id}`} />
  // })
  // const plateJoints:JSX.Element[] = plateJointsData.map((pj) => {
  //   return <PlateJointInput id={pj.id} key={`pj_${pj.id}`} />
  // })
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
                if (reducedScale > 1) dispatch(setReducedPOLength(POLengthData))
            }
          }
        >
          <input id="break-view-check" type='checkbox'
            defaultChecked={viewBreak}
          />
          Добавить разрывы вида
        </label>

        {/* <div className="expansion-joints">
          <button
            className="add-expansion-joint"
            onClick={() => dispatch(increaseExpansionJointsQuantity())}
          >
            Добавить деф. шов
          </button>

          {
            expansionJoints
          }
          <button
            className="add-plate-joint"
            onClick={() => dispatch(addPlate())}
          >
            Добавить стык плит
          </button>
          {
            plateJoints
          }
        </div> */}
    </div>
  );
}
