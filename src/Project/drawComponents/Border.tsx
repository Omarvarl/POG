import { IPagedDim } from "../../Types/Types"

export default function Border({width, height}: IPagedDim) {
  return (
    <g key={`ril_0`}>
    <path
      d={`M20 5
                  L${width - 5} 5
                  L${width - 5} ${
                    height - 5
                  }
                  L20 ${height - 5}Z`}
      fill="none"
      stroke="blue"
      strokeWidth="3"
    />
  </g>
  )
}
