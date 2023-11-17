import PageFormatSelect from "./PageFormatSelect";
import POLengthInput from "./POLengthInput";
import ExpansionJointInput from "./ExpansionJointInput";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { increaseExpansionJointsQuantity } from "../../store/expansionJointsQuantitySlice";

export default function Menu() {
  const dispatch = useAppDispatch()
  const expansionJointsQuantity = useAppSelector(state => state.expansionJointsQuantity)
  const expansionJoint = <ExpansionJointInput />
  const expansionJoints:JSX.Element[] = []
  for (let i = 0; i < expansionJointsQuantity; i++) {
    expansionJoints.push(<ExpansionJointInput />)
  }
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
