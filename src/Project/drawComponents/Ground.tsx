import React from "react";
import { useAppSelector } from "../../hooks";
import { IExpansionJoints } from "../../Types/Types";
import './Drawing.css'

export default function Ground() {
  const POLengthData = useAppSelector((state) => state.POLength);
  const expansionjoints = useAppSelector((state) => state.expansionJoints);
  const plateJoints = useAppSelector(state => state.plateJoints)
  const {POLength, scaledPOLength, screenWidth, scale} = POLengthData

  const joints = [...expansionjoints, ...plateJoints]

  const initX = screenWidth / 2 - scaledPOLength / 2
  const startY = (500 + 1100) / scale

  let result: JSX.Element = <></>;
  if (POLength < 1000) return result;
  if (scale === 100 && scaledPOLength >= screenWidth) {
    result = <div>TOO BIG</div>;
  } else if (!joints.length) {
    result = (
      <g>
        <path className="base-line-black"
          d={`M${initX - 100 / scale} ${startY + 50}
                L${initX - 100 / scale} ${startY}
                L${initX + scaledPOLength + 100 / scale} ${startY}
                L${initX + scaledPOLength + 100 / scale} ${startY + 50}
            `}
        />
      </g>
    );
  } else {
    joints.forEach(j => {
      if (j.position <= 0 || j.length <= 0) return result;
    });

    const arr: IExpansionJoints[] = structuredClone(joints);

    arr.sort((a, b) => a.position - b.position);
    let startX = screenWidth / 2 - scaledPOLength / 2 - 100 / scale;


    result = (
      <g>
        {arr.map(j => {
          const res: JSX.Element = (
            <path className="base-line-black"
              key={`gj_${j.id}`}
              d={`M${startX} ${startY + 50}
                L${startX} ${startY}
                L${(screenWidth / 2 - scaledPOLength / 2) + j.position / scale} ${startY}
                L${(screenWidth / 2 - scaledPOLength / 2) + j.position / scale} ${startY + 50}
            `}
            />
          );
          startX = (screenWidth / 2 - scaledPOLength / 2) + (j.position + j.length) / scale;

          return res;
        })}
        <path className="base-line-black"
          d={`M${startX} ${startY + 50}
                L${startX} ${startY}
                L${screenWidth / 2 + scaledPOLength / 2 + 100 / scale} ${startY}
                L${screenWidth / 2 + scaledPOLength / 2 + 100 / scale} ${startY + 50}
            `}
        />
      </g>
    );
  }

  return result;
}
