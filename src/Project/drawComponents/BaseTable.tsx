import { useAppSelector } from '../../hooks';
import './Drawing.css'

export default function BaseTable() {
  const pageSize = useAppSelector(state => state.realPageSize);
  const width = pageSize.width * pageSize.factor;
  const height = (pageSize.factor === 1) ? pageSize.height : pageSize.height * 2;
  return (
    <g>
      <path
        d={`M${width - 50} ${height - 50 - 550}
            L${width - 50 - 1850} ${height - 50 - 550}
            L${width - 50 - 1850} ${height - 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />

      <path
        d={`M${width - 50 - 500 - 700} ${height - 50 - 550}
            L${width - 50 - 500 - 700} ${height - 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />

      <path
        d={`M${width - 50 - 500 - 700} ${height - 50 - 400}
            L${width - 50} ${height - 50 - 400}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      <path
        d={`M${width - 50 - 500 - 700} ${height - 50 - 150}
            L${width - 50} ${height - 50 - 150}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      <path
        d={`M${width - 50 - 500} ${height - 50 - 400}
            L${width - 50 - 500} ${height - 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      <path
        d={`M${width - 50 - 500} ${height - 50 - 350}
            L${width - 50} ${height - 50 - 350}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      <path
        d={`M${width - 50 - 500} ${height - 50 - 200}
            L${width - 50} ${height - 50 - 200}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      <path
        d={`M${width - 50 - 180} ${height - 50 - 400}
            L${width - 50 - 180} ${height - 50 - 200}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      <path
        d={`M${width - 50 - 180 - 170} ${height - 50 - 400}
            L${width - 50 - 180 - 170} ${height - 50 - 200}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      <path
        d={`M${width - 50 - 180 - 170 - 50} ${height - 50 - 350}
            L${width - 50 - 180 - 170 - 50} ${height - 50 - 200}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      <path
        d={`M${width - 50 - 180 - 170 - 50 - 50} ${height - 50 - 350}
            L${width - 50 - 180 - 170 - 50 - 50} ${height - 50 - 200}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />

      <path
        d={`M${width - 50 - 180 - 170 - 50 - 50 - 50 + 200} ${height - 50 - 200}
            L${width -50 - 180 - 170 - 50 - 50 - 50 + 200} ${height - 50 - 150}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />

      <path
        d={`M${width - 50 - 1850} ${
          height - 50 - 550 + 50
        }
                            L${width - 50 - 700 - 500} ${
                              height - 50 - 550 + 50
                            }`}
        fill="none"
        stroke="blue"
        strokeWidth="1"
      />
      <path
        d={`M${width - 50 - 1850} ${
          height - 50 - 550 + 50 + 50
        }
                            L${width - 50 - 700 - 500} ${
                              height - 50 - 550 + 50 + 50
                            }`}
        fill="none"
        stroke="blue"
        strokeWidth="1"
      />

      <path
        d={`M${width - 50 - 1850} ${
          height - 50 - 550 + 50 + 50 + 50
        }
                            L${width - 50 - 700 - 500} ${
                              height -
                              50 -
                              550 +
                              50 +
                              50 +
                              50
                            }`}
        fill="none"
        stroke="blue"
        strokeWidth="1"
      />

      <path
        d={`M${width - 50 - 1850} ${
          height - 50 - 550 + 50 + 50 + 50 + 50
        }
                            L${width - 50 - 700 - 500} ${
                              height -
                              50 -
                              550 +
                              50 +
                              50 +
                              50 +
                              50
                            }`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      <path
        d={`M${width - 50 - 1850} ${
          height - 50 - 550 + 50 + 50 + 50 + 50 + 50
        }
                            L${width - 50 - 700 - 500} ${
                              height -
                              50 -
                              550 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50
                            }`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      <path
        d={`M${width - 50 - 1850} ${
          height - 50 - 550 + 50 + 50 + 50 + 50 + 50 + 50
        }
                            L${width - 50 - 700 - 500} ${
                              height -
                              50 -
                              550 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50
                            }`}
        fill="none"
        stroke="blue"
        strokeWidth="1"
      />
      <path
        d={`M${width - 50 - 1850} ${
          height -
          50 -
          550 +
          50 +
          50 +
          50 +
          50 +
          50 +
          50 +
          50
        }
                            L${width - 50 - 700 - 500} ${
                              height -
                              50 -
                              550 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50
                            }`}
        fill="none"
        stroke="blue"
        strokeWidth="1"
      />
      <path
        d={`M${width - 50 - 1850} ${
          height -
          50 -
          550 +
          50 +
          50 +
          50 +
          50 +
          50 +
          50 +
          50 +
          50
        }
                            L${width - 50 - 700 - 500} ${
                              height -
                              50 -
                              550 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50
                            }`}
        fill="none"
        stroke="blue"
        strokeWidth="1"
      />
      <path
        d={`M${width - 50 - 1850} ${
          height -
          50 -
          550 +
          50 +
          50 +
          50 +
          50 +
          50 +
          50 +
          50 +
          50 +
          50
        }
                            L${width - 50 - 700 - 500} ${
                              height -
                              50 -
                              550 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50
                            }`}
        fill="none"
        stroke="blue"
        strokeWidth="1"
      />
      <path
        d={`M${width - 50 - 1850} ${
          height -
          50 -
          550 +
          50 +
          50 +
          50 +
          50 +
          50 +
          50 +
          50 +
          50 +
          50 +
          50
        }
                            L${width - 50 - 700 - 500} ${
                              height -
                              50 -
                              550 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50 +
                              50
                            }`}
        fill="none"
        stroke="blue"
        strokeWidth="1"
      />

      <path
        d={`M${width - 50 - 1850 + 70} ${
          height - 50 - 550
        }
                            L${width - 50 - 1850 + 70} ${
                              height - 50 - 550 + 250
                            }`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      <path
        d={`M${width - 50 - 1850 + 70 + 100} ${
          height - 50 - 550
        }
                            L${
                              width - 50 - 1850 + 70 + 100
                            } ${height - 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
      <path
        d={`M${width - 50 - 1850 + 70 + 100 + 230} ${
          height - 50 - 550
        }
                            L${
                              width -
                              50 -
                              1850 +
                              70 +
                              100 +
                              230
                            } ${height - 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />

      <path
        d={`M${width - 50 - 1850 + 70 + 100 + 230 + 150} ${
          height - 50 - 550
        }
                            L${
                              width -
                              50 -
                              1850 +
                              70 +
                              100 +
                              230 +
                              150
                            } ${height - 50}`}
        fill="none"
        stroke="blue"
        strokeWidth="3"
      />
    </g>
  );
}
