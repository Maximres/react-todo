import { Firestore } from "@firebase/firestore";
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
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
import { IRow, ITask } from "@/constants/types/tasksTypes";
import reminderEnum from "@/constants/enums/reminderEnum";

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
            const task = {} as IRow;
            task.id = taskDto.id;
            task.isImportant = taskDto.isImportant;
            task.text = taskDto.text;
            task.isChecked = taskDto.isChecked;
            task.createdDate = Number(taskDto.createdDate);
            task.parentId = taskDto.parentId;
            //todo other props

            task.isMyDay = taskDto.isMyDay;
            task.dueDate = taskDto.dueDate;
            task.remindDate = taskDto.remindDate;
            task.repeatPeriod = taskDto.repeatPeriod as [
              index1: number,
              index2: keyof typeof reminderEnum,
            ];

            task.subTasks = (taskDto.subTasks ||= []).map((subDto) => {
              const subTask = {} as ITask;
              subTask.id = subDto.id;
              subTask.parentId = subDto.parentId;
              subTask.createdDate = Number(subDto.createdDate);
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
          const task = {} as IRow;
          task.id = taskDto.id;
          task.isImportant = taskDto.isImportant;
          task.text = taskDto.text;
          task.isChecked = taskDto.isChecked;
          task.createdDate = Number(taskDto.createdDate);
          task.parentId = taskDto.parentId;
          //todo other props

          task.isMyDay = taskDto.isMyDay;
          task.dueDate = taskDto.dueDate;
          task.remindDate = taskDto.remindDate;
          task.repeatPeriod = taskDto.repeatPeriod as [
            index1: number,
            index2: keyof typeof reminderEnum,
          ];

          task.subTasks = (taskDto.subTasks ||= []).map((subDto) => {
            const subTask = {} as ITask;
            subTask.id = subDto.id;
            subTask.parentId = subDto.parentId;
            subTask.createdDate = Number(subDto.createdDate);
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
            const task = {} as IRow;
            task.id = taskDto.id;
            task.isImportant = taskDto.isImportant;
            task.text = taskDto.text;
            task.isChecked = taskDto.isChecked;
            task.createdDate = Number(taskDto.createdDate);
            task.parentId = taskDto.parentId;
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

const getSubtasks = (db: Firestore, taskIdList: string[]) => {
  const subTaskDtoList = [] as SubTaskDto[];

  return new Promise<ITask[]>((resolve) => {
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
            const subTask = {} as ITask;
            subTask.id = subDto.id;
            subTask.parentId = subDto.parentId;
            subTask.createdDate = Number(subDto.createdDate);
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

const setSubtask = (db: Firestore, task: ITask) => {
  debugger;
  return setDoc(doc(db, scheme.SubTasks, task.id), task, { merge: true });
};

export const FirebaseDataSource = {
  getListsWithSubtasks,
  getListsWithTasks,
  getSubtasks,
  setSubtask,
};
