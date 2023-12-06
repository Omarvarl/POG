
export default function Example({transform}:{transform:string}) {
    const result = <>
        <path  //  fiting contour
          d={`M${-76.5} ${0}
                L${76.5} ${0}
                L${76.5} ${-45}
                L${64} ${-137}
                L${-64} ${-137}
                L${-76.5} ${-45}Z
            `}
        />

        <path   className="dashed-line"//  down flange
          d={`M${-76.5} ${-10}
                L${76.5} ${-10}
 
            `}
        />

        <path  className="dashed-line" //  rib left
          d={`M${-41.5} ${-10}
                L${-41.5} ${-137}
            `}
        />

        <path  className="dashed-line" //  rib left
          d={`M${-31.5} ${-10}
                L${-31.5} ${-137}
            `}
        />

        

        <path  className="dashed-line" //  rib right
          d={`M${41.5} ${-10}
                L${41.5} ${-137}
            `}
        />

        <path  className="dashed-line" //  rib right
          d={`M${31.5} ${-10}
                L${31.5} ${-137}
            `}
        />

        <path className="dashed-line"  //  axis
          d={`M${0} ${5}
                L${0} ${-142}
            `}
        />
</>
  return (
    <g transform={transform}>
      {result}
    </g>

  )
}
