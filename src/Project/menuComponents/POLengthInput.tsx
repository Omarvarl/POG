import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPOLength } from "../../store/POLengthSlice";

export default function POLengthInput() {
    const dispatch = useAppDispatch();
    const POLength = useAppSelector(state => state.POLength)
  return (
    <label className="PO-length-input">
      Длина ПО
      <input
        type="number"
        defaultValue={POLength}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          const input = e.target as HTMLInputElement;
          dispatch(setPOLength(Number(input.value)));
        }}
      ></input>
    </label>
  );
}
