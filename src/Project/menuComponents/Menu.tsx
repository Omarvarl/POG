import PageFormatSelect from "./PageFormatSelect";
import POLengthInput from "./POLengthInput";
import ExpansionJointInput from "./ExpansionJointInput";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { increaseExpansionJointsQuantity } from "../../store/expansionJointsSlice";

export default function Menu() {
  const dispatch = useAppDispatch()
  const expansionJointsQuantity = useAppSelector(state => state.expansionJoints)
  const expansionJoints:JSX.Element[] = expansionJointsQuantity.map((ej) => {
      return <ExpansionJointInput id={ej.id} key={`ej_${ej.id}`} />
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
        </div>
    </div>
  );
}