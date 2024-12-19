import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class SettingsPage implements OnInit {
  constructor(private storageService: StorageService) {}
  currentValue!: string;
  newValue!: string;

  async onIonChange(event: CustomEvent) {
    this.newValue = event.detail.value;
    await this.storageService.set('-10', this.newValue);
    this.currentValue = await this.storageService.get('-10');
  }

  async ngOnInit() {
    this.currentValue = await this.storageService.get('-10');
  }
}
