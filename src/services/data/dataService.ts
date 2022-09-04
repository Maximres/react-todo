import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/app/configs/firebase";
import { FirebaseDataSource } from "@/services/data/firebaseDataSource";
import { ISubTask, ITask } from "@/constants/types/tasksTypes";
import { IList } from "@/constants/types/listsTypes";

const db = getFirestore(firebaseApp);

const dataService = {
  getListsWithTasks: () => FirebaseDataSource.getListsWithTasks(db),
  getSubtasksMany: (taskIds: string[]) => FirebaseDataSource.getSubtasksMany(db, taskIds),
  getSubtasks: (taskId: string) => FirebaseDataSource.getSubtasks(db, taskId),

  setSubtask: (task: ITask, subTask: ISubTask) => FirebaseDataSource.setSubtask(db, task, subTask),
  setTask: (task: ITask) => FirebaseDataSource.setTask(db, task),
  updateTask: (task: ITask) => FirebaseDataSource.updateTask(db, task),
  updateList: (list: IList) => FirebaseDataSource.updateList(db, list),
  deleteTask: (id: string, parentId: string) => FirebaseDataSource.deleteTask(db, id, parentId),
};

export { dataService };
