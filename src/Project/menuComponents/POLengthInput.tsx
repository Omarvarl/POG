import { useAppSelector } from "../../hooks";
// import { setPOLength } from "../../store/POLengthSlice";

export default function POLengthInput() {
    // const dispatch = useAppDispatch();
    const POLength = useAppSelector(state => state.POLength)
    // const screenWidth = useAppSelector(state => state.realPageSize.width * state.realPageSize.factor)
    
  return (
    <label className="PO-length-input">
      Длина ПО в мм
      <input
        type="number"
        defaultValue={POLength.POLength}
        min={5000}
        step={100}
        // onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
        //   const input = e.target as HTMLInputElement;
        //   dispatch(setPOLength({
        //     ...POLength,
        //     screenWidth: screenWidth,
        //     POLength: Number(input.value)
        // }))
            
            // }
        // }
      >
      </input>
    </label>
  );
}
