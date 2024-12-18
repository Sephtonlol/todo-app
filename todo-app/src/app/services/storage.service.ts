import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { item } from '../interfaces.item';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  constructor(private storage: Storage) {
    this.init();
  }
  public async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
  public async set(key: string, value: item | number | string) {
    await this.init();
    await this._storage?.remove(key);
    return await this._storage?.set(key, value);
  }
  public async get(key: string) {
    await this.init();

    if ((await this._storage?.get(key)) == null) {
      return {
        title: '',
        text: '',
        favorite: false,
        completed: false,
        key: key,
      };
    }
    return await this._storage?.get(key);
  }
  public async keys() {
    await this.init();
    const keys = await this._storage?.keys();
    return keys?.reverse();
  }
  public async remove(key: string) {
    await this.init();
    return await this._storage?.remove(key);
  }
  public async clear() {
    await this.init();
    return await this._storage?.clear();
  }
  public async search(query: string): Promise<item[]> {
    await this.init();
    const keys = await this.keys();
    const results: item[] = [];

    if (keys) {
      for (const key of keys) {
        const item = await this.get(key);
        if (
          item.title?.toLowerCase().includes(query.toLowerCase()) ||
          item.text?.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push(item);
        }
      }
    }

    return results;
  }
  public async getAll(): Promise<item[]> {
    await this.init();
    const keys = await this.keys();
    const items: item[] = [];

    if (keys) {
      for (const key of keys) {
        const value = await this.get(key);
        if (value) {
          items.push(value);
        }
      }
    }

    return items;
  }
}
