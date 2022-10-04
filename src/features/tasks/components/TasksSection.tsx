import React, { createContext } from "react";
import SimpleBar from "simplebar-react";
import { TasksWithContextMenu } from "@/features/tasks/components/TasksWithContextMenu";

const TasksSection = () => {
  return (
    <section className="vh-100">
      <SimpleBar
        className="h-100 px-5 pb-4 pt-xxl"
        scrollbarMaxSize={200}
        autoHide={false}
        forceVisible={true}
      >
        <TasksWithContextMenu />
      </SimpleBar>
    </section>
  );
};

export { TasksSection };
