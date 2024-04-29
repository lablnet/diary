class Item {
    constructor({ id, title, tag, content, timestamp }) {
        this.id = id;
        this.title = title;
        this.tag = tag;
        this.content = content;
        this.timestamp = timestamp;
    }
  
    static fromMap(doc) {
      return new Item({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp != null ?new Date(doc.data().timestamp.seconds * 1000) : ''
      });
    }
  
    toMap() {
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
