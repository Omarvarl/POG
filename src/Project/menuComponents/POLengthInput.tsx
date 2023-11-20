import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPOLength } from "../../store/POLengthSlice";

export default function POLengthInput() {
    const dispatch = useAppDispatch();
    const POLength = useAppSelector(state => state.POLength)
    const screenWidth = useAppSelector(state => state.realPageSize.width)
    
  return (
    <label className="PO-length-input">
      Длина ПО в мм
      <input
        type="number"
        defaultValue={POLength.POLength}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          const input = e.target as HTMLInputElement;
          dispatch(setPOLength({
            ...POLength,
            screenWidth: screenWidth,
            POLength: Number(input.value)
        }))
            
            }
        }
      >
      </input>
    </label>
  );
}
