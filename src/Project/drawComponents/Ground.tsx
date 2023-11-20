import React from "react";
import { useAppSelector } from "../../hooks";
import { IExpansionJoints } from "../../Types/Types";
import './Drawing.css'

export default function Ground() {
  const POLengthData = useAppSelector((state) => state.POLength);
  const expansionjoints = useAppSelector((state) => state.expansionJoints);
  const {POLength, scaledPOLength, screenWidth, scale} = POLengthData

  const initX = screenWidth / 2 - scaledPOLength / 2

  let result: JSX.Element = <></>;
  if (POLength < 1000) return result;
  if (scale === 100 && scaledPOLength >= screenWidth) {
    result = <div>TOO BIG</div>;
  } else if (!expansionjoints.length) {
    result = (
      <g>
        <path className="base-line-black"
          d={`M${initX - 100 / scale} ${
            50 + 1100 / scale + 50
          }
                L${initX - 100 / scale} ${
                  50 + 1100 / scale
                }
                L${initX + scaledPOLength + 100 / scale} ${
                  50 + 1100 / scale
                }
                L${screenWidth / 2 + scaledPOLength / 2} ${
                  50 + 1100 / scale + 50
                }
            `}  
        />

        {/* <path //  PO imitation
          d={`M${screenWidth / 2 - scaledPOLength / 2} ${
            50 + 1100 / scale - 10
          }
                L${screenWidth / 2 - scaledPOLength / 2} ${50}
                L${screenWidth / 2 + scaledPOLength / 2} ${50}
                L${screenWidth / 2 + scaledPOLength / 2} ${
                  50 + 1100 / scale - 10
                }Z
            `}
          fill="none"
          stroke="blue"
          strokeWidth="3"
        /> */}
      </g>
    );
  } else {
    expansionjoints.forEach((ej) => {
      if (ej.position <= 0 || ej.length <= 0) return result;
    });

    const arr: IExpansionJoints[] = structuredClone(expansionjoints);

    arr.sort((a, b) => a.position - b.position);
    let startX = screenWidth / 2 - scaledPOLength / 2 - 100 / scale;

    result = (
      <g>
        {expansionjoints.map((ej) => {
          const res: JSX.Element = (
            <path className="base-line-black"
              key={`gj_${ej.id}`}
              d={`M${startX} ${50 + 1100 / scale + 50}
                L${startX} ${50 + 1100 / scale}
                L${(screenWidth / 2 - scaledPOLength / 2) + ej.position / scale} ${50 + 1100 / scale}
                L${(screenWidth / 2 - scaledPOLength / 2) + ej.position / scale} ${50 + 1100 / scale + 50}
            `}
            />
          );
          startX = (screenWidth / 2 - scaledPOLength / 2) + ej.position / scale + ej.length / scale;

          return res;
        })}
        <path className="base-line-black"
          d={`M${startX} ${50 + 1100 / scale + 50}
                L${startX} ${50 + 1100 / scale}
                L${screenWidth / 2 + scaledPOLength / 2 + 100 / scale} ${
                  50 + 1100 / scale
                }
                L${screenWidth / 2 + scaledPOLength / 2 + 100 / scale} ${
                  50 + 1100 / scale + 50
                }
            `}
        />
{/* 
        <path //  PO imitation
          d={`M${screenWidth / 2 - scaledPOLength / 2} ${
            50 + 1100 / scale - 10
          }
                L${screenWidth / 2 - scaledPOLength / 2} ${50}
                L${screenWidth / 2 + scaledPOLength / 2} ${50}
                L${screenWidth / 2 + scaledPOLength / 2} ${
                  50 + 1100 / scale - 10
                }Z
            `}
          fill="none"
          stroke="blue"
          strokeWidth="3"
        /> */}
      </g>
    );
  }

  return result;
}
