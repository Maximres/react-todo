import { Firestore } from "@firebase/firestore";
import {
  collection,
  collectionGroup,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  ListDto,
  SubTaskDto,
  TaskDto,
} from "../../constants/types/firebaseDocumentsDto";
import { IList } from "../../constants/types/listsTypes";
import scheme from "../../constants/enums/firebaseCollectionScheme";
import { isFulfilled, isRejected } from "../../utils/helpers/promiseResolver";
import flattenDeep from "lodash/flattenDeep";
import { IRow, ITask } from "../../constants/types/tasksTypes";

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

const getLists = (db: Firestore) => {
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

export const FirebaseDataAPI = {
  getLists,
};