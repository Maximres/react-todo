import { Firestore } from "@firebase/firestore";
import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { GroupDto, ListDto, SubTaskDto, TaskDto } from "@/constants/types/firebaseDocumentsDto";
import { IGroup, IList } from "@/constants/types/listsTypes";
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

  return new Promise<IList[]>(async (resolve) => {
    const queryListsSnap = await getDocs(collection(db, scheme.Lists));

    const tasksQueries = queryListsSnap.docs.map((listDoc) => {
      lists.push({ ...(listDoc.data() as ListDto), id: listDoc.id });
      return getCollectionGroup(db, listDoc.id, scheme.Tasks);
    });

    const queryTaskSnaps = await Promise.allSettled(tasksQueries);

    //skipping rejected queries
    queryTaskSnaps.filter(isRejected).forEach((rejected) => {
      console.error({ "task req rejected: ": rejected });
    });

    const subTasksQueries = queryTaskSnaps.filter(isFulfilled).map((taskSnap) => {
      const queries = taskSnap.value.docs.map((taskDoc) => {
        tasks.push({ ...(taskDoc.data() as TaskDto), id: taskDoc.id });
        return getCollectionGroup(db, taskDoc.id, scheme.SubTasks);
      });

      return queries;
    });

    const flattenQueries = flattenDeep(subTasksQueries);
    const subTaskSnaps = await Promise.allSettled(flattenQueries);

    //skipping rejected queries
    subTaskSnaps.filter(isRejected).forEach((subTaskRejected) => {
      console.error({ "subtask req rejected: ": subTaskRejected });
    });

    subTaskSnaps.filter(isFulfilled).forEach((subTaskSnap) => {
      subTaskSnap.value.docs.forEach((subTaskDoc) => {
        subTasks.push({
          ...(subTaskDoc.data() as SubTaskDto),
          id: subTaskDoc.id,
        });
      });
    });

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
      const list = {
        id: listDto.id,
        name: listDto.name,
        groupId: listDto.groupId,
        iconName: listDto.iconName,
        totalTasks: listDto.tasks.length,
        order: Number(listDto.order),
      } as IList;

      list.tasks = (listDto.tasks ||= []).map((taskDto) => {
        const task = {
          id: taskDto.id,
          createdDate: Number(taskDto.createdDate),
          parentId: taskDto.parentId,
          order: Number(taskDto.order),
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
            order: Number(subDto.order),
            isChecked: subDto.isChecked
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

        const list = {
          id: listDto.id,
        } as IList;
        list.name = listDto.name;
        list.groupId = listDto.groupId;
        list.iconName = listDto.iconName;
        list.totalTasks = listDto.tasks.length;
        list.order = Number(listDto.order);

        list.tasks = (listDto.tasks ||= []).map((taskDto) => {
          const task = {
            id: taskDto.id,
            createdDate: Number(taskDto.createdDate),
            parentId: taskDto.parentId,
            order: Number(taskDto.order),
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
              order: Number(subDto.order),
              isChecked: subDto.isChecked
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
    getDocs(query(collection(db, scheme.Lists), orderBy("order", "asc")))
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

        const subTasksQueries = queryTaskSnaps.filter(isFulfilled).map((taskSnap) => {
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
          const list = {
            id: listDto.id,
          } as IList;
          list.name = listDto.name;
          list.groupId = listDto.groupId;
          list.iconName = listDto.iconName ?? "List";
          list.totalTasks = listDto.tasks.length;
          list.order = Number(listDto.order);

          list.tasks = (listDto.tasks ||= []).map((taskDto) => {
            const task = {
              id: taskDto.id,
              createdDate: Number(taskDto.createdDate),
              parentId: taskDto.parentId,
              order: Number(taskDto.order),
            } as ITask;
            task.isImportant = taskDto.isImportant;
            task.text = taskDto.text;
            task.note = taskDto.note;
            task.isChecked = taskDto.isChecked;

            //todo other props

            task.isMyDay = taskDto.isMyDay;
            task.dueDate = taskDto.dueDate === 0 ? undefined : taskDto.dueDate;
            task.remindDate = taskDto.remindDate === 0 ? undefined : taskDto.remindDate;
            task.repeatPeriod = taskDto?.repeatPeriod?.length
              ? (taskDto.repeatPeriod as [index1: number, index2: keyof typeof reminderEnum])
              : undefined;

            return task;
          });

          return list;
        });

        resolve(result);
      });
  });
};

const getLists = (db: Firestore) => {
  const lists = [] as ListDto[];
  return new Promise<IList[]>(async (resolve, reject) => {
    try {
      const queryListsSnap = await getDocs(
        query(collection(db, scheme.Lists), orderBy("order", "asc")),
      );
      queryListsSnap.docs.forEach((listDoc) => {
        lists.push({ ...(listDoc.data() as ListDto), id: listDoc.id });
      });

      const result = lists.map((listDto) => {
        const list = {
          id: listDto.id,
        } as IList;
        list.name = listDto.name;
        list.groupId = listDto.groupId;
        list.iconName = listDto.iconName ?? "List";
        list.totalTasks = listDto.totalTasks;
        list.order = Number(listDto.order);

        list.tasks = [];

        return list;
      });

      resolve(result);
    } catch (e) {
      console.error({ getLists: e });
      reject([]);
    }
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
            const subTask: ISubTask = {
              id: subDto.id,
              parentId: subDto.parentId,
              createdDate: Number(subDto.createdDate),
              order: Number(subDto.order),
              isChecked: subDto.isChecked,
              text: subDto.text
            };

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
            subTask.order = Number(subDto.order);

            return subTask;
          }),
          ["order"],
          ["asc"],
        );

        resolve(result);
      });
  });
};

const getTasks = (db: Firestore, listId: string) => {
  const taskDtoList: TaskDto[] = [];
  return new Promise<ITask[]>(async (resolve, reject) => {
    try {
      const tasksQueries = await getCollectionGroup(db, listId, scheme.Tasks);

      tasksQueries.docs.forEach((taskDoc) => {
        taskDtoList.push({
          ...(taskDoc.data() as TaskDto),
          id: taskDoc.id,
        });
      });
      const result = _orderBy(
        taskDtoList.map((taskDto) => {
          const task: ITask = {
            id: taskDto.id,
            parentId: taskDto.parentId,
            createdDate: Number(taskDto.createdDate),
            subTasks: [],
            order: Number(taskDto.order),

            isImportant: taskDto.isImportant,
            text: taskDto.text,
            note: taskDto.note,
            isChecked: taskDto.isChecked,
            isMyDay: taskDto.isMyDay,

            dueDate: taskDto.dueDate === 0 ? undefined : taskDto.dueDate,
            remindDate: taskDto.remindDate === 0 ? undefined : taskDto.remindDate,
            repeatPeriod: taskDto?.repeatPeriod?.length
              ? (taskDto.repeatPeriod as [index1: number, index2: keyof typeof reminderEnum])
              : undefined,
          };

          return task;
        }),
        ["order", "asc"],
      );
      resolve(result);
    } catch (e) {
      console.error({ getTasks: e });
      reject([]);
    }
  });
};

const getGroups = (db: Firestore) => {
  const groupDtoList = [] as GroupDto[];

  return new Promise<IGroup[]>((resolve) => {
    const groupsQueries = getDocs(query(collection(db, scheme.Groups), orderBy("order", "asc")));
    groupsQueries
      .then((groupSnap) => {
        groupSnap.docs.forEach((groupDoc) => {
          groupDtoList.push({
            ...(groupDoc.data() as GroupDto),
            id: groupDoc.id,
          });
        });
      })
      .then(() => {
        const result = groupDtoList.map((groupDto) => {
          const group = {
            id: groupDto.id,
            name: groupDto.name,
            order: Number(groupDto.order),
          } as IGroup;

          return group;
        });

        resolve(result);
      });
  });
};

const setSubtask = async (db: Firestore, task: ITask, subTask: ISubTask) => {
  try {
    const reference = doc(
      db,
      scheme.Lists,
      task.parentId,
      scheme.Tasks,
      task.id,
      scheme.SubTasks,
      subTask.id,
    );

    await setDoc(reference, convertSubTaskToDto(subTask), { merge: true });

    return true;
  } catch (e: any) {
    console.log("setSubtaskErrors");
    console.error(e);
    return false;
  }
};

const setTask = async (db: Firestore, task: ITask) => {
  try {
    const reference = doc(db, scheme.Lists, task.parentId, scheme.Tasks, task.id);
    const taskDto = convertToDto(task);
    await setDoc(reference, taskDto, { merge: true });

    return true;
  } catch (e: any) {
    console.log("setTaskErrors");
    console.error(e);

    return false;
  }
};

const setGroup = async (db: Firestore, group: IGroup) => {
  try {
    const reference = doc(db, scheme.Groups, group.id);
    const groupDto = convertGroupToDto(group);

    await setDoc(reference, groupDto, { merge: true });
    return true;
  } catch (e: any) {
    console.log("setGroupErrors");
    console.error(e);
    return false;
  }
};

const updateTask = (db: Firestore, task: ITask) => {
  const reference = doc(db, scheme.Lists, task.parentId, scheme.Tasks, task.id);
  const taskDto = convertToDto(task);
  return updateDoc(reference, taskDto).catch((...args) => {
    console.error({ updateTaskError: args });
  });
};

const setList = async (db: Firestore, list: IList) => {
  try {
    const reference = doc(db, scheme.Lists, list.id);
    const listDto = convertListToDto(list);

    await setDoc(reference, listDto, { merge: true });
    return true;
  } catch (e: any) {
    console.log("setListErrors");
    console.error(e);
    return false;
  }
};

const updateList = (db: Firestore, list: IList) => {
  const reference = doc(db, scheme.Lists, list.id);
  const listDto = convertListToDto(list);
  return updateDoc(reference, listDto).catch((...args) => {
    console.error({ updateListError: args });
  });
};

const ungroupLists = async (db: Firestore, lists: IList[]) => {
  try {
    const batch = writeBatch(db);

    for (const list of lists) {
      const reference = doc(db, scheme.Lists, list.id);
      batch.update(reference, { groupId: "" });
    }

    await batch.commit();
  } catch (e) {
    console.error({ updateListError: e });
  }
};

const updateGroup = (db: Firestore, group: IGroup) => {
  const reference = doc(db, scheme.Groups, group.id);
  const listDto = convertGroupToDto(group);
  return updateDoc(reference, listDto).catch((...args) => {
    console.error({ updateGroupError: args });
  });
};

const deleteTask = (db: Firestore, id: string, parentId: string) => {
  const reference = doc(db, scheme.Lists, parentId, scheme.Tasks, id);

  return deleteDoc(reference).catch((...args) => {
    console.error({ deleteTaskError: args });
  });
};

const deleteGroup = (db: Firestore, id: string) => {
  const reference = doc(db, scheme.Groups, id);

  return deleteDoc(reference).catch((...args) => {
    console.error({ deleteGroupError: args });
  });
};

const deleteList = (db: Firestore, id: string) => {
  const reference = doc(db, scheme.Lists, id);

  return deleteDoc(reference).catch((...args) => {
    console.error({ deleteListError: args });
  });
};

const getCollectionQuery = (firestore: Firestore, collectionName: string, documentId: string) =>
  query(
    collectionGroup(firestore, collectionName),
    orderBy("order", "asc"),
    where("parentId", "==", documentId),
  );

function getCollectionGroup(firestore: Firestore, documentId: string, collectionName: string) {
  return getDocs(getCollectionQuery(firestore, collectionName, documentId));
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
    order: Number(task.order),
  };
  return taskDto;
}

function convertListToDto(list: IList) {
  const listDto: ListDto = {
    id: list.id,
    groupId: list.groupId ?? "",
    name: list.name,
    iconName: list.iconName,
    tasks: [] as any,
    order: Number(list.order),
    totalTasks: list.totalTasks,
  };
  return listDto;
}

function convertSubTaskToDto(subTask: ISubTask) {
  const subTaskDto: SubTaskDto = {
    id: subTask.id,
    order: subTask.order,
    text: subTask.text ?? "",
    parentId: subTask.parentId,
    createdDate: subTask.createdDate,
    isChecked: subTask.isChecked,
  };
  return subTaskDto;
}

function convertGroupToDto(group: IGroup) {
  const listDto: GroupDto = {
    id: group.id,
    name: group.name,
    order: Number(group.order),
  };
  return listDto;
}

export const FirebaseDataSource = {
  getLists,
  getListsWithTasks,
  getListsWithSubtasks,
  updateList,
  setList: setList,
  ungroupLists,
  deleteList,

  getGroups,
  setGroup,
  updateGroup,
  deleteGroup,

  getSubtasksMany,
  getSubtasks,

  setSubtask,
  setTask,

  getTasks,
  updateTask,
  deleteTask,
};
