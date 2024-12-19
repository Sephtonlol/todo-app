import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { checkboxOutline, closeOutline, squareOutline } from 'ionicons/icons';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class CheckboxComponent implements OnInit {
  constructor(private storageService: StorageService) {
    addIcons({ checkboxOutline, closeOutline, squareOutline });
  }
  @Input() setting!: string;
  @Input() key!: string;
  value!: number;
  async cycleSetting() {
    const currentValue = await this.storageService.get(this.key);
    this.value = currentValue;
    if (currentValue == 0) this.value = 1;
    else if (currentValue == 1) this.value = 2;
    else this.value = 0;
    await this.storageService.set(this.key, this.value);
  }
  async ngOnInit() {
    this.value = await this.storageService.get(this.key);
  }
}
