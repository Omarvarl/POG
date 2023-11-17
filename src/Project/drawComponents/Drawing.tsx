import Border from "./Border";
import BaseTable from "./BaseTable";
import { IPagedDim } from "../../Types/Types";
import Ground from "./Ground";

export default function Drawing({ width, height }: IPagedDim) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: "100%", height: "100%" }}
    >
      <Border width={width} height={height} />
      <BaseTable width={width} height={height} />

      <Ground />
    </svg>
  );
}
