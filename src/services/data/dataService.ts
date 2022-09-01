import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/app/configs/firebase";
import { FirebaseDataSource } from "@/services/data/firebaseDataSource";
import { IRow, ITask } from "@/constants/types/tasksTypes";

const db = getFirestore(firebaseApp);

const dataService = {
  getListsWithTasks: () => FirebaseDataSource.getListsWithTasks(db),
  getSubtasksMany: (taskIds: string[]) => FirebaseDataSource.getSubtasksMany(db, taskIds),
  getSubtasks: (taskId: string) => FirebaseDataSource.getSubtasks(db, taskId),

  setSubtask: (task: IRow, subTask: ITask) => FirebaseDataSource.setSubtask(db, task, subTask),
};

export { dataService };
