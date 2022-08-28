import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../app/configs/firebase";
import { FirebaseDataAPI } from "./firebaseDataAPI";

const useDataService = () => {
  const db = getFirestore(firebaseApp);

  return {
    getLists: () => FirebaseDataAPI.getLists(db),
  };
};

export { useDataService };
