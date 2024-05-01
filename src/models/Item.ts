import { ItemData } from '../types/item';

class Item {
    id: string;
    title: string;
    tags: Array<string>;
    content: string;
    timestamp: Date | string | null;

    constructor({ id, title, tags, content, timestamp }: ItemData) {
        this.id = id;
        this.title = title;
        this.tags = tags;
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
            tags: this.tags,
            content: this.content,
            timestamp: this.timestamp
        };
    }
}

export { Item };
