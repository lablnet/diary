import { firestore, auth } from './firebase';
import { Item } from '@/models/Item';
import { collection, getDocs, addDoc, getDoc, doc, deleteDoc, updateDoc, query, where, orderBy, startAfter, limit, serverTimestamp, Query, DocumentSnapshot, CollectionReference, DocumentData } from "firebase/firestore";

class ItemService {
    private _item_collection: CollectionReference<DocumentData>;
    private _lastDocument: DocumentSnapshot | null;

  constructor() {
    this._item_collection = collection(firestore, 'diary');
    this._lastDocument = null;
  }

  async getItems( page : number = 1, search : string = '') : Promise<Array<Item>> {
    let q: Query<DocumentData> = query(this._item_collection);
    q = query(q, orderBy('timestamp', 'desc'));

    // Pagination: reset last document for the first page
    if (page === 1) {
      this._lastDocument = null;
    }
    // Pagination: continue from the last document of the previous page
    if (this._lastDocument) {
      q = query(q, startAfter(this._lastDocument));
    }

    q = query(q, limit(40));

    // Search functionality
    if (search) {
        q = query(q, where('title', '>=', search), where('title', '<=', search + '\uf8ff'));
    }

    const querySnapshot = await getDocs(q);

    // Update the last document
    if (!querySnapshot.empty) {
      this._lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];
    }

    // Map the documents to User instances
    return querySnapshot.docs.map(doc => Item.fromMap(doc));
  }

  async createItem(item: Item): Promise<string> {
    const newItem = {
        ...item.toMap(),
        timestamp: serverTimestamp()
    };
    const docRef = await addDoc(this._item_collection, newItem);
    return docRef.id;
  }

  async updateItem(item: Item): Promise<void> {
    const itemRef = doc(this._item_collection, item.id);
    await updateDoc(itemRef, item.toMap());
  }

  async getItem(id: string): Promise<Item | null> {
    const itemRef = doc(this._item_collection, id);
    const itemSnapshot = await getDoc(itemRef);
    if (itemSnapshot.exists()) {
      return Item.fromMap(itemSnapshot);
    }
    return null;
  }
}

export { ItemService };
