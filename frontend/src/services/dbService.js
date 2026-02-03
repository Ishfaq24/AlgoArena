
import { openDB } from 'idb';

const DB_NAME = 'pulse_ai_db';
const DB_VERSION = 1;

class DatabaseService {
  constructor() {
    this.db = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('threads')) {
          const store = db.createObjectStore('threads', { keyPath: 'id' });
          store.createIndex('updatedAt', 'updatedAt');
        }
        if (!db.objectStoreNames.contains('messages')) {
          const store = db.createObjectStore('messages', { keyPath: 'id' });
          store.createIndex('threadId', 'threadId');
          store.createIndex('timestamp', 'timestamp');
        }
      },
    });
  }

  async getAllThreads() {
    const db = await this.db;
    const threads = await db.getAllFromIndex('threads', 'updatedAt');
    return threads.reverse();
  }

  async saveThread(thread) {
    const db = await this.db;
    await db.put('threads', thread);
  }

  async deleteThread(id) {
    const db = await this.db;
    const tx = db.transaction(['threads', 'messages'], 'readwrite');
    await tx.objectStore('threads').delete(id);
    
    const messageStore = tx.objectStore('messages');
    const index = messageStore.index('threadId');
    let cursor = await index.openCursor(IDBKeyRange.only(id));
    while (cursor) {
      await cursor.delete();
      cursor = await cursor.continue();
    }
    await tx.done;
  }

  async getMessagesForThread(threadId) {
    const db = await this.db;
    return db.getAllFromIndex('messages', 'threadId', IDBKeyRange.only(threadId));
  }

  async saveMessage(message) {
    const db = await this.db;
    await db.put('messages', message);
  }

  async updateThreadMetadata(threadId, updates) {
    const db = await this.db;
    const thread = await db.get('threads', threadId);
    if (thread) {
      await db.put('threads', { ...thread, ...updates, updatedAt: Date.now() });
    }
  }
}

export const dbService = new DatabaseService();
