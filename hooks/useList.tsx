import { db } from "@/firebase";
import { Movie } from "@/typings";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const useList = (uid: string | undefined) => {
  const [list, setList] = useState<Movie[] | DocumentData[]>([]);

  useEffect(() => {
    if (!uid) return;

    return onSnapshot(collection(db, "users", uid, "myList"), (snapshot) => {
      setList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, [db, uid]);

  return list;
};

export default useList;
