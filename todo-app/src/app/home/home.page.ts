import { Component, ViewChild } from '@angular/core';
import { ItemComponent } from '../components/item/item.component';
import { GetLastKeyService } from '../services/get-last-key.service';
import { StorageService } from '../services/storage.service';
import { item } from '../interfaces.item';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonModal } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { book, closeCircleOutline, filter } from 'ionicons/icons';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ItemComponent, FormsModule, IonicModule, CheckboxComponent],
})
export class HomePage {
  @ViewChild(IonModal) modal!: IonModal;

  lastKey!: number;
  keys: string[] = [];
  even: boolean = true;
  searchQuery: string = '';
  searchResults: item[] = [];
  hasText: boolean = false;
  items: item[] = [];
  completed!: number;
  bookmarked!: number;
  constructor(
    private getLastKeyService: GetLastKeyService,
    private storageService: StorageService
  ) {
    addIcons({ filter, closeCircleOutline });
  }

  async ionViewWillEnter() {
    try {
      this.lastKey = await this.getLastKeyService.getLastKey();
      this.keys = await this.getLastKeyService.getKeys();
      this.items = await this.storageService.getAll();
      this.bookmarked = await this.storageService.get('-1');
      this.completed = await this.storageService.get('-2');
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  checkText() {
    this.hasText = this.searchQuery.trim().length > 0;
    this.onSearch();
  }

  async onSearch() {
    if (this.searchQuery.trim()) {
      try {
        this.searchResults = await this.storageService.search(this.searchQuery);
      } catch (error) {
        console.error('Error performing search:', error);
        this.searchResults = [];
      }
    } else {
      this.searchResults = [];
    }
  }

  close() {
    this.modal.dismiss();
    this.ionViewWillEnter();
  }
}
