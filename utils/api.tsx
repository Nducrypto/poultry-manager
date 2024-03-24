import {
  collection,
  firestore,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "../config/firebase";

export const createInDatabase = async (url: string, requestData: any) => {
  try {
    const productCollections = collection(firestore, url);
    const newDocument = await addDoc(productCollections, requestData);

    return newDocument.id;
  } catch (error) {
    throw error;
  }
};

export const removeInDatabase = async (url: string, docId: string) => {
  try {
    const productDocumentRef = doc(firestore, url, docId);
    await deleteDoc(productDocumentRef);
    return true;
  } catch (error) {
    throw error;
  }
};

export const updateInDatabase = async (id: string, data: any, url: string) => {
  const docRef = doc(firestore, url, id);

  try {
    await updateDoc(docRef, data);
    return true;
  } catch (error: any) {
    throw error;
  }
};
