import React from "react";
import { useAppSelector } from "../../hooks";
import { IExpansionJoints } from "../../Types/Types";

export default function Ground() {
  const POLength = useAppSelector((state) => state.POLength);
  let scaledPOLength = POLength;
  const width = useAppSelector((state) => state.realPageSize.width);
  const expansionjoints = useAppSelector((state) => state.expansionJoints);
  const drawScales = [1, 2, 2.5, 4, 5, 10, 15, 20, 25, 40, 50, 75, 100];
  let i = 1;
  while (i < drawScales.length && scaledPOLength >= width) {
    scaledPOLength = POLength / drawScales[i];
    i++;
  }
  let result: JSX.Element = <></>;
  if (POLength < 1000) return result;
  if (i === drawScales.length && scaledPOLength >= width) {
    result = <div>TOO BIG</div>;
  } else if (!expansionjoints.length) {
    result = (
      <g>
        <path
          d={`M${width / 2 - scaledPOLength / 2} ${
            50 + 1100 / drawScales[i - 1] + 50
          }
                L${width / 2 - scaledPOLength / 2} ${
                  50 + 1100 / drawScales[i - 1]
                }
                L${width / 2 + scaledPOLength / 2} ${
                  50 + 1100 / drawScales[i - 1]
                }
                L${width / 2 + scaledPOLength / 2} ${
                  50 + 1100 / drawScales[i - 1] + 50
                }
            `}
          fill="none"
          stroke="black"
          strokeWidth="3"
        />

        <path //  PO imitation
          d={`M${width / 2 - scaledPOLength / 2} ${
            50 + 1100 / drawScales[i - 1] - 10
          }
                L${width / 2 - scaledPOLength / 2} ${50}
                L${width / 2 + scaledPOLength / 2} ${50}
                L${width / 2 + scaledPOLength / 2} ${
                  50 + 1100 / drawScales[i - 1] - 10
                }Z
            `}
          fill="none"
          stroke="blue"
          strokeWidth="3"
        />
      </g>
    );
  } else {
    expansionjoints.forEach((ej) => {
      if (ej.position <= 0 || ej.length <= 0) return result;
    });

    const arr: IExpansionJoints[] = structuredClone(expansionjoints);

    arr.sort((a, b) => a.position - b.position);
    let startX = width / 2 - scaledPOLength / 2;

    result = (
      <g>
        {expansionjoints.map((ej) => {
          const res: JSX.Element = (
            <path
              key={`gj_${ej.id}`}
              d={`M${startX} ${50 + 1100 / drawScales[i - 1] + 50}
                L${startX} ${50 + 1100 / drawScales[i - 1]}
                L${(width / 2 - scaledPOLength / 2) + ej.position / drawScales[i - 1]} ${50 + 1100 / drawScales[i - 1]}
                L${(width / 2 - scaledPOLength / 2) + ej.position / drawScales[i - 1]} ${50 + 1100 / drawScales[i - 1] + 50}
            `}
              fill="none"
              stroke="black"
              strokeWidth="3"
            />
          );
          startX = (width / 2 - scaledPOLength / 2) + ej.position / drawScales[i - 1] + ej.length / drawScales[i - 1];

          return res;
        })}
        <path
          d={`M${startX} ${50 + 1100 / drawScales[i - 1] + 50}
                L${startX} ${50 + 1100 / drawScales[i - 1]}
                L${width / 2 + scaledPOLength / 2} ${
                  50 + 1100 / drawScales[i - 1]
                }
                L${width / 2 + scaledPOLength / 2} ${
                  50 + 1100 / drawScales[i - 1] + 50
                }
            `}
          fill="none"
          stroke="black"
          strokeWidth="3"
        />

        <path //  PO imitation
          d={`M${width / 2 - scaledPOLength / 2} ${
            50 + 1100 / drawScales[i - 1] - 10
          }
                L${width / 2 - scaledPOLength / 2} ${50}
                L${width / 2 + scaledPOLength / 2} ${50}
                L${width / 2 + scaledPOLength / 2} ${
                  50 + 1100 / drawScales[i - 1] - 10
                }Z
            `}
          fill="none"
          stroke="blue"
          strokeWidth="3"
        />
      </g>
    );
  }

  return result;
}
