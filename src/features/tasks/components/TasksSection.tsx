import React, { createContext, useRef } from "react";
import SimpleBar from "simplebar-react";
import { TasksWithContextMenu } from "@/features/tasks/components/TasksWithContextMenu";

const TasksSection = () => {
  const contextBoundaryRef = useRef(null)

  return (
    <section ref={contextBoundaryRef} >
      <div className="vh-100">
        <SimpleBar
          className="h-100 px-5 pb-5 pt-xxl"
          scrollbarMaxSize={200}
          autoHide={false}
          forceVisible={true}
        >
          <TasksWithContextMenu boundaryRef={contextBoundaryRef} />
        </SimpleBar>
      </div>

    </section>
  );
};

export { TasksSection };
