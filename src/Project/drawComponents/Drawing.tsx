import Border from "./Border";
import BaseTable from "./BaseTable";
import { IPagedDim } from "../../Types/Types";
import Ground from "./Ground";
import StartSection1500 from "./Sections/StartSection1500";
import { useAppSelector } from "../../hooks";
import './Drawing.css'

export default function Drawing({ width, height }: IPagedDim) {
    const POLengthData = useAppSelector(state => state.POLength)
    let POCollect: JSX.Element[] = []
    if (POLengthData.POLength > 0) {
        POCollect.push(<StartSection1500 />)
    }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: "100%", height: "100%" }}
    >
      <Border width={width} height={height} />
      <BaseTable width={width} height={height} />

      <Ground />
      {POCollect}

    </svg>
  );
}
