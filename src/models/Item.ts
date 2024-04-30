import { ItemData } from '../types/item';

class Item {
    id: string;
    title: string;
    tag: string;
    content: string;
    timestamp: Date | string | null;

    constructor({ id, title, tag, content, timestamp }: ItemData) {
        this.id = id;
        this.title = title;
        this.tag = tag;
        this.content = content;
        this.timestamp = timestamp;
    }

    static fromMap(doc: any): Item {
        return new Item({
            ...doc.data(),
            id: doc.id,
            timestamp: doc.data().timestamp != null ? new Date(doc.data().timestamp.seconds * 1000) : ''
        });
    }

    toMap(): ItemData {
        return {
            id: this.id,
            title: this.title,
            tag: this.tag,
            content: this.content,
            timestamp: this.timestamp
        };
    }
}

export { Item };