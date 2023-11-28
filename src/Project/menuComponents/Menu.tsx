import PageFormatSelect from "./PageFormatSelect";
import POLengthInput from "./POLengthInput";
import ExpansionJointInput from "./ExpansionJointInput";
import PlateJointInput from "./PlateJointInput";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { increaseExpansionJointsQuantity } from "../../store/expansionJointsSlice";
import { addPlateJoint } from "../../store/plateJointsSlice";

export default function Menu() {
  const dispatch = useAppDispatch()
  const expansionJointsQuantity = useAppSelector(state => state.expansionJoints)
  const plateJointsData = useAppSelector(state => state.plateJoints)
  const expansionJoints:JSX.Element[] = expansionJointsQuantity.map((ej) => {
      return <ExpansionJointInput id={ej.id} key={`ej_${ej.id}`} />
  })
  const plateJoints:JSX.Element[] = plateJointsData.map((pj) => {
    return <PlateJointInput id={pj.id} key={`pj_${pj.id}`} />
})
  return (
    <div className="project-menu">
      <label htmlFor="" className="project-name">
        projectName
      </label>
        <PageFormatSelect />
        <POLengthInput />
        <div className="expansion-joints">
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
            onClick={() => dispatch(addPlateJoint())}
          >
            Добавить стык плит
          </button>
          {
            plateJoints
          }
        </div>
    </div>
  );
}
