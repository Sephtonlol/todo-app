import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class GetLastKeyService {
  constructor(private storageService: StorageService) {
    this.storageService.init();
  }
  getLastKey = async (): Promise<number> => {
    let result = await this.storageService.keys();
    if (!result) result = ['0'];
    const resultNumbers = result.map(Number);
    const lastKey = Math.max(...resultNumbers);
    if (lastKey != -Infinity) {
      return lastKey;
    }
    return 0;
  };
  getKeys = async (): Promise<string[]> => {
    await this.storageService.init();
    const result = await this.storageService.keys();
    if (!result) return ['0'];
    return result;
  };
}
