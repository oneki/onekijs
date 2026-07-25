import { ContextMenu } from 'onekijs-ui';
import { useRef } from 'react';



export const ContextMenuPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={ref} style={{width: "300px", height: "300px", background:"lightgray"}}>
        Right click me
      </div>
      <ContextMenu refElement={ref} offsetX={2} offsetY={2}>
        <div>
          <div>Entry1</div>
          <div>Entry2</div>
        </div>
      </ContextMenu>
    </>
  );
};
