import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/app/configs/firebase";
import { FirebaseDataSource } from "@/services/data/firebaseDataSource";

const db = getFirestore(firebaseApp);

const dataService = {
  getListsWithSubtasks: () => FirebaseDataSource.getListsWithSubtasks(db),
  getListsWithTasks: () => FirebaseDataSource.getListsWithTasks(db),
  getSubtasks: (taskIds: string[]) => FirebaseDataSource.getSubtasks(db, taskIds),
};

export { dataService };
