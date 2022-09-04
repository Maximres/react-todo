import { Firestore } from "@firebase/firestore";
import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  ListDto,
  SubTaskDto,
  TaskDto,
} from "@/constants/types/firebaseDocumentsDto";
import { IList } from "@/constants/types/listsTypes";
import scheme from "@/constants/enums/firebaseCollectionScheme";
import { isFulfilled, isRejected } from "@/utils/helpers/promiseResolver";
import flattenDeep from "lodash/flattenDeep";
import _orderBy from "lodash/orderBy";
import { ISubTask, ITask } from "@/constants/types/tasksTypes";
import reminderEnum from "@/constants/enums/reminderEnum";

const getListsWithSubtasks = (db: Firestore) => {
  const lists = [] as ListDto[];
  const tasks = [] as TaskDto[];
  const subTasks = [] as SubTaskDto[];

  return new Promise<IList[]>((resolve) => {
    getDocs(collection(db, scheme.Lists))
      .then((queryListsSnap) => {
        const tasksQueries = queryListsSnap.docs.map((listDoc) => {
          lists.push({ ...(listDoc.data() as ListDto), id: listDoc.id });
          return getCollectionGroup(db, listDoc.id, scheme.Tasks);
        });

        return tasksQueries;
      })
      .then((value) => Promise.allSettled(value))
      .then((queryTaskSnaps) => {
        //skipping rejected queries
        queryTaskSnaps.filter(isRejected).forEach((rejected) => {
          console.error({ "task req rejected: ": rejected });
        });

        const subTasksQueries = queryTaskSnaps
          .filter(isFulfilled)
          .map((taskSnap) => {
            const queries = taskSnap.value.docs.map((taskDoc) => {
              tasks.push({ ...(taskDoc.data() as TaskDto), id: taskDoc.id });
              return getCollectionGroup(db, taskDoc.id, scheme.SubTasks);
            });

            return queries;
          });

        const flattenQueries = flattenDeep(subTasksQueries);
        return flattenQueries;
      })
      .then((queries) => Promise.allSettled(queries))
      .then((subTaskSnaps) => {
        subTaskSnaps.forEach((subTaskSnap) => {
          if (isRejected(subTaskSnap)) {
            //todo handle
            console.error({ "subtask req rejected: ": subTaskSnap });
            return;
          }
          const subTasksQueries = subTaskSnap.value.docs.map((subTaskDoc) => {
            subTasks.push({
              ...(subTaskDoc.data() as SubTaskDto),
              id: subTaskDoc.id,
            });
            return null;
          });
        });
      })
      .then(() => {
        //todo merge arrays

        subTasks.forEach((sub) => {
          const parent = tasks.find((t) => t.id === sub.parentId);
          if (parent != null) {
            parent.subTasks ??= [];
            parent.subTasks.push(sub);
          }
        });

        tasks.forEach((t) => {
          const parent = lists.find((l) => l.id === t.parentId);
          if (parent != null) {
            parent.tasks ??= [];
            parent.tasks.push(t);
          }
        });
        const result = lists.map((listDto) => {
          const list = {} as IList;
          list.name = listDto.name;
          list.groupId = listDto.groupId;
          list.iconName = listDto.iconName;
          list.id = listDto.id;
          list.tasksTotal = listDto.tasks.length;

          list.tasks = (listDto.tasks ||= []).map((taskDto) => {
            const task = {
              id: taskDto.id,
              createdDate: Number(taskDto.createdDate),
              parentId: taskDto.parentId,
            } as ITask;
            task.isImportant = taskDto.isImportant;
            task.text = taskDto.text;
            task.note = taskDto.note;
            task.isChecked = taskDto.isChecked;
            //todo other props

            task.isMyDay = taskDto.isMyDay;
            task.dueDate = taskDto.dueDate;
            task.remindDate = taskDto.remindDate;
            task.repeatPeriod = taskDto.repeatPeriod as [
              index1: number,
              index2: keyof typeof reminderEnum,
            ];

            task.subTasks = (taskDto.subTasks ||= []).map((subDto) => {
              const subTask = {
                id: subDto.id,
                parentId: subDto.parentId,
                createdDate: Number(subDto.createdDate),
              } as ISubTask;
              subTask.text = subDto.text;

              return subTask;
            });
            return task;
          });

          return list;
        });

        return resolve(result);
      });
  });
};

const getTaskWithSubtasks = (db: Firestore, uid: string) => {
  let listDto = {} as ListDto;
  const taskDtos = [] as TaskDto[];
  const subTaskDtos = [] as SubTaskDto[];

  return new Promise<IList>((resolve) => {
    getDoc(doc(db, scheme.Lists, uid))
      .then((queryListsSnap) => {
        listDto = {
          ...queryListsSnap.data(),
          id: queryListsSnap.id,
        } as ListDto;
        return getCollectionGroup(db, queryListsSnap.id, scheme.Tasks);
      })
      .then((queryTaskSnap) => {
        //skipping rejected queries
        const queries = queryTaskSnap.docs.map((taskDoc) => {
          taskDtos.push({ ...(taskDoc.data() as TaskDto), id: taskDoc.id });
          return getCollectionGroup(db, taskDoc.id, scheme.SubTasks);
        });

        return queries;
      })
      .then((queries) => Promise.allSettled(queries))
      .then((subTaskSnaps) => {
        subTaskSnaps.forEach((subTaskSnap) => {
          if (isRejected(subTaskSnap)) {
            //todo handle
            console.error({ "subtask req rejected: ": subTaskSnap });
            return;
          }
          const subTasksQueries = subTaskSnap.value.docs.map((subTaskDoc) => {
            subTaskDtos.push({
              ...(subTaskDoc.data() as SubTaskDto),
              id: subTaskDoc.id,
            });
            return null;
          });
        });
      })
      .then(() => {
        //todo merge arrays

        subTaskDtos.forEach((sub) => {
          const parent = taskDtos.find((t) => t.id === sub.parentId);
          if (parent != null) {
            parent.subTasks ??= [];
            parent.subTasks.push(sub);
          }
        });

        taskDtos.forEach((t) => {
          const parent = listDto;
          if (parent != null) {
            parent.tasks ??= [];
            parent.tasks.push(t);
          }
        });

        const list = {} as IList;
        list.name = listDto.name;
        list.groupId = listDto.groupId;
        list.iconName = listDto.iconName;
        list.id = listDto.id;
        list.tasksTotal = listDto.tasks.length;

        list.tasks = (listDto.tasks ||= []).map((taskDto) => {
          const task = {
            id: taskDto.id,
            createdDate: Number(taskDto.createdDate),
            parentId: taskDto.parentId,
          } as ITask;
          task.isImportant = taskDto.isImportant;
          task.text = taskDto.text;
          task.note = taskDto.note;
          task.isChecked = taskDto.isChecked;
          //todo other props

          task.isMyDay = taskDto.isMyDay;
          task.dueDate = taskDto.dueDate;
          task.remindDate = taskDto.remindDate;
          task.repeatPeriod = taskDto.repeatPeriod as [
            index1: number,
            index2: keyof typeof reminderEnum,
          ];

          task.subTasks = (taskDto.subTasks ||= []).map((subDto) => {
            const subTask = {
              id: subDto.id,
              parentId: subDto.parentId,
              createdDate: Number(subDto.createdDate),
            } as ISubTask;

            subTask.text = subDto.text;

            return subTask;
          });
          return task;
        });

        return resolve(list);
      });
  });
};

const getListsWithTasks = (db: Firestore) => {
  const lists = [] as ListDto[];
  const tasks = [] as TaskDto[];

  return new Promise<IList[]>((resolve) => {
    getDocs(collection(db, scheme.Lists))
      .then((queryListsSnap) => {
        const tasksQueries = queryListsSnap.docs.map((listDoc) => {
          lists.push({ ...(listDoc.data() as ListDto), id: listDoc.id });
          return getCollectionGroup(db, listDoc.id, scheme.Tasks);
        });

        return tasksQueries;
      })
      .then((value) => Promise.allSettled(value))
      .then((queryTaskSnaps) => {
        //skipping rejected queries
        queryTaskSnaps.filter(isRejected).forEach((rejected) => {
          console.error({ "task req rejected: ": rejected });
        });

        const subTasksQueries = queryTaskSnaps
          .filter(isFulfilled)
          .map((taskSnap) => {
            const queries = taskSnap.value.docs.map((taskDoc) => {
              tasks.push({ ...(taskDoc.data() as TaskDto), id: taskDoc.id });
              return getCollectionGroup(db, taskDoc.id, scheme.SubTasks);
            });

            return queries;
          });
      })
      .then(() => {
        tasks.forEach((t) => {
          const parent = lists.find((l) => l.id === t.parentId);
          if (parent != null) {
            parent.tasks ??= [];
            parent.tasks.push(t);
          }
        });

        const result = lists.map((listDto) => {
          const list = {} as IList;
          list.name = listDto.name;
          list.groupId = listDto.groupId;
          list.iconName = listDto.iconName ?? "List";
          list.id = listDto.id;
          list.tasksTotal = listDto.tasks.length;

          list.tasks = (listDto.tasks ||= []).map((taskDto) => {
            const task = {
              id: taskDto.id,
              createdDate: Number(taskDto.createdDate),
              parentId: taskDto.parentId,
            } as ITask;
            task.isImportant = taskDto.isImportant;
            task.text = taskDto.text;
            task.note = taskDto.note;
            task.isChecked = taskDto.isChecked;

            //todo other props

            task.isMyDay = taskDto.isMyDay;
            task.dueDate = taskDto.dueDate === 0 ? undefined : taskDto.dueDate;
            task.remindDate =
              taskDto.remindDate === 0 ? undefined : taskDto.remindDate;
            task.repeatPeriod = taskDto?.repeatPeriod?.length
              ? (taskDto.repeatPeriod as [
                  index1: number,
                  index2: keyof typeof reminderEnum,
                ])
              : undefined;

            return task;
          });

          return list;
        });

        resolve(result);
      });
  });
};

const getSubtasksMany = (db: Firestore, taskIdList: string[]) => {
  const subTaskDtoList = [] as SubTaskDto[];

  return new Promise<ISubTask[]>((resolve) => {
    const subTasksQueries = taskIdList.map((taskId) => {
      return getCollectionGroup(db, taskId, scheme.SubTasks);
    });
    Promise.allSettled(subTasksQueries)
      .then((queryListsSnap) => {
        queryListsSnap.filter(isRejected).forEach((rejected) => {
          console.error({ "task req rejected: ": rejected });
        });

        queryListsSnap.filter(isFulfilled).map((subTaskSnap) => {
          subTaskSnap.value.docs.forEach((subTaskDoc) => {
            subTaskDtoList.push({
              ...(subTaskDoc.data() as SubTaskDto),
              id: subTaskDoc.id,
            });
          });
        });
      })
      .then(() => {
        const result = _orderBy(
          subTaskDtoList.map((subDto) => {
            const subTask = {
              id: subDto.id,
              parentId: subDto.parentId,
              createdDate: Number(subDto.createdDate),
            } as ISubTask;

            subTask.text = subDto.text;

            return subTask;
          }),
          ["createdDate"],
          ["asc"],
        );

        resolve(result);
      });
  });
};

const getSubtasks = (db: Firestore, taskId: string) => {
  const subTaskDtoList = [] as SubTaskDto[];

  return new Promise<ISubTask[]>((resolve) => {
    const subTasksQueries = getCollectionGroup(db, taskId, scheme.SubTasks);
    subTasksQueries
      .then((subTaskSnap) => {
        subTaskSnap.docs.forEach((subTaskDoc) => {
          subTaskDtoList.push({
            ...(subTaskDoc.data() as SubTaskDto),
            id: subTaskDoc.id,
          });
        });
      })
      .then(() => {
        const result = _orderBy(
          subTaskDtoList.map((subDto) => {
            const subTask = {
              id: subDto.id,
              parentId: subDto.parentId,
              createdDate: Number(subDto.createdDate),
            } as ISubTask;

            subTask.text = subDto.text;
            subTask.isChecked = subDto.isChecked;

            return subTask;
          }),
          ["createdDate"],
          ["asc"],
        );

        resolve(result);
      });
  });
};

const setSubtask = (db: Firestore, task: ITask, subTask: ISubTask) => {
  const reference = doc(
    db,
    scheme.Lists,
    task.parentId,
    scheme.Tasks,
    task.id,
    scheme.SubTasks,
    subTask.id,
  );
  return setDoc(reference, subTask, { merge: true }).catch((...args) => {
    console.error({ setSubtaskErrors: args });
  });
};

const setTask = (db: Firestore, task: ITask) => {
  const reference = doc(db, scheme.Lists, task.parentId, scheme.Tasks, task.id);
  const taskDto = convertToDto(task);

  return setDoc(reference, taskDto, { merge: true }).catch((...args) => {
    console.error({ setTaskErrors: args });
  });
};

const updateTask = (db: Firestore, task: ITask) => {
  const reference = doc(db, scheme.Lists, task.parentId, scheme.Tasks, task.id);
  const taskDto = convertToDto(task);
  return updateDoc(reference, taskDto).catch((...args) => {
    console.error({ updateTaskError: args });
  });
};

const updateList = (db: Firestore, list: IList) => {
  debugger
  const reference = doc(db, scheme.Lists, list.id);
  const listDto = convertListToDto(list);
  return updateDoc(reference, listDto).catch((...args) => {
    console.error({ updateListError: args });
  });
};

const deleteTask = (db: Firestore, id: string, parentId: string) => {
  const reference = doc(db, scheme.Lists, parentId, scheme.Tasks, id);

  return deleteDoc(reference).catch((...args) => {
    console.error({ deleteTaskError: args });
  });
};

function getCollectionGroup(
  firestore: Firestore,
  documentId: string,
  collectionName: string,
) {
  return getDocs(
    query(
      collectionGroup(firestore, collectionName),
      where("parentId", "==", documentId),
    ),
  );
}

function convertToDto(task: ITask) {
  const taskDto: TaskDto = {
    isChecked: task.isChecked,
    text: task.text ?? "",
    note: task.note ?? "",
    createdDate: task.createdDate,
    isImportant: task.isImportant,
    dueDate: task.dueDate ?? 0,
    isMyDay: task.isMyDay,
    remindDate: task.remindDate ?? 0,
    repeatPeriod: task.repeatPeriod ?? ([] as any),
    id: task.id,
    parentId: task.parentId,
  };
  return taskDto;
}

function convertListToDto(list: IList) {
  const listDto: ListDto = {
    id: list.id,
    groupId: list.groupId,
    name: list.name,
    iconName: list.iconName,
    tasks: [] as any,
  };
  return listDto;
}

export const FirebaseDataSource = {
  getListsWithSubtasks,
  getListsWithTasks,

  getSubtasksMany,
  getSubtasks,

  setSubtask,
  setTask,

  updateTask,
  deleteTask,

  updateList,
};
