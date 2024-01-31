import { useAppSelector } from "../../hooks";
import MakerJs from "makerjs";

export default function Border() {
// const pageSize = useAppSelector(state => state.realPageSize);
// const width = pageSize.width * pageSize.factor;
// const height = (pageSize.factor === 1) ? pageSize.height : pageSize.height * 2;
//   return (
//     <g key={`ril_0`}>
//     <path
//       d={`M200 50
//                   L${width - 50} 50
//                   L${width - 50} ${
//                     height - 50
//                   }
//                   L200 ${height - 50}Z`}
//       fill="none"
//       stroke="blue"
//       strokeWidth="3"
//     />
//   </g>
//   )

const pageSize = useAppSelector(state => state.realPageSize);
const width = pageSize.width * pageSize.factor;
const height = (pageSize.factor === 1) ? pageSize.height : pageSize.height * 2;

const rect = new MakerJs.models.Rectangle(width - 250, height - 100);
rect.origin = [200, 50];
// console.log(rect.paths)
// rect.units = 'red'

var arc = new MakerJs.paths.Arc([0, 0], 150, 45, 135);
// arc.layer = "red";



const svg = MakerJs.exporter.toSVG(arc);
  return (
    <div dangerouslySetInnerHTML={{__html: svg}}></div>
  )

}
