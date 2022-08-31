import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/app/configs/firebase";
import { FirebaseDataSource } from "./firebaseDataSource";
import { useMemo } from "react";

const useDataService = () => {
  const api = useMemo(() => {
    const db = getFirestore(firebaseApp);

    return {
      getLists: () => FirebaseDataSource.getLists(db),
    };
  }, []);

  return api;
};


export { useDataService }  ;
