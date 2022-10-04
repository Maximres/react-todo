import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/app/configs/firebase";
import { FirebaseDataSource as source } from "@/services/data/firebaseDataSource";
import { ISubTask, ITask } from "@/constants/types/tasksTypes";
import { IGroup, IList } from "@/constants/types/listsTypes";

const db = getFirestore(firebaseApp);

const dataService = {
  getLists: () => source.getLists(db),
  setList: (list: IList) => source.setList(db, list),
  ungroupLists: (lists: IList[]) => source.ungroupLists(db, lists),
  deleteList: (id: string) => source.deleteList(db, id),

  getSubtasksMany: (taskIds: string[]) => source.getSubtasksMany(db, taskIds),
  getSubtasks: (taskId: string) => source.getSubtasks(db, taskId),
  setSubtask: (task: ITask, subTask: ISubTask) => source.setSubtask(db, task, subTask),
  deleteSubtask: (subId: string, taskId: string, listId: string) =>
    source.deleteSubtask(db, { subId, listId, taskId }),

  getTasks: (listId: string) => source.getTasks(db, listId),
  setTask: (task: ITask) => source.setTask(db, task),
  promoteSubtask: (taskId: string, promoted: ITask) => source.promoteSubtask(db, taskId, promoted),
  deleteTask: (id: string, parentId: string) => source.deleteTask(db, id, parentId),
  updateTask: (task: ITask) => source.updateTask(db, task),
  moveTask: (listId: string, movedTask: ITask) => source.moveTask(db, listId, movedTask),

  getGroups: () => source.getGroups(db),
  setGroup: (group: IGroup) => source.setGroup(db, group),
  updateGroup: (group: IGroup) => source.updateGroup(db, group),
  deleteGroup: (id: string) => source.deleteGroup(db, id),
};

export { dataService };
