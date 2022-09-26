import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/app/configs/firebase";
import { FirebaseDataSource } from "@/services/data/firebaseDataSource";
import { ISubTask, ITask } from "@/constants/types/tasksTypes";
import { IGroup, IList } from "@/constants/types/listsTypes";

const db = getFirestore(firebaseApp);

const dataService = {
  getLists: () => FirebaseDataSource.getLists(db),
  setList: (list: IList) => FirebaseDataSource.setList(db, list),
  ungroupLists: (lists: IList[]) => FirebaseDataSource.ungroupLists(db, lists),
  deleteList: (id: string) => FirebaseDataSource.deleteList(db, id),

  getSubtasksMany: (taskIds: string[]) => FirebaseDataSource.getSubtasksMany(db, taskIds),
  getSubtasks: (taskId: string) => FirebaseDataSource.getSubtasks(db, taskId),
  setSubtask: (task: ITask, subTask: ISubTask) => FirebaseDataSource.setSubtask(db, task, subTask),

  getTasks: (listId: string) => FirebaseDataSource.getTasks(db, listId),
  setTask: (task: ITask) => FirebaseDataSource.setTask(db, task),
  deleteTask: (id: string, parentId: string) => FirebaseDataSource.deleteTask(db, id, parentId),
  updateTask: (task: ITask) => FirebaseDataSource.updateTask(db, task),

  getGroups: () => FirebaseDataSource.getGroups(db),
  setGroup: (group: IGroup) => FirebaseDataSource.setGroup(db, group),
  updateGroup: (group: IGroup) => FirebaseDataSource.updateGroup(db, group),
  deleteGroup: (id: string) => FirebaseDataSource.deleteGroup(db, id),
};

export { dataService };
