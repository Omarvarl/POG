import { useAppSelector } from "../../hooks";

export default function Border() {
const pageSize = useAppSelector(state => state.realPageSize);
const width = pageSize.width * pageSize.factor;
const height = (pageSize.factor === 1) ? pageSize.height : pageSize.height * 2;
  return (
    <g key={`ril_0`}>
    <path
      d={`M200 50
                  L${width - 50} 50
                  L${width - 50} ${
                    height - 50
                  }
                  L200 ${height - 50}Z`}
      fill="none"
      stroke="blue"
      strokeWidth="3"
    />
  </g>
  )
}
