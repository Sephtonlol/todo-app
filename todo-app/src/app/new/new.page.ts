import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { item } from '../interfaces.item';
import { GetLastKeyService } from '../services/get-last-key.service';
import { IonicModule, IonInput, IonTextarea } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  bookmarkOutline,
  checkmarkCircleOutline,
  bookmark,
  checkmarkCircle,
} from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class NewPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private getlastKeyService: GetLastKeyService,
    private router: Router
  ) {
    addIcons({
      bookmarkOutline,
      bookmark,
      checkmarkCircle,
      checkmarkCircleOutline,
    });
  }
  @ViewChild('title', { static: true }) title!: IonInput;
  @ViewChild('text', { static: true }) text!: IonTextarea;
  completed = false;
  favorite = false;

  async set() {
    const lastKey = await this.getlastKeyService.getLastKey();
    const newKey = (lastKey + 1).toString(10);
    const newItem: item = {
      title: this.title.value || '',
      text: this.text.value || '',
      completed: this.completed,
      favorite: this.favorite,
      key: newKey,
    };
    await this.storageService.set(newKey, newItem), newItem;
    this.title.value = '';
    this.text.value = '';
    this.completed = false;
    this.favorite = false;
  }
  changeBool(changing: string) {
    if (changing == 'completed') {
      if (this.completed) this.completed = false;
      else this.completed = true;
    } else {
      if (this.favorite) this.favorite = false;
      else this.favorite = true;
    }
  }
  editKey: string | null = null;

  async edit() {
    const newItem: item = {
      title: this.title.value || '',
      text: this.text.value || '',
      completed: this.completed,
      favorite: this.favorite,
      key: this.editKey!,
    };
    await this.storageService.set(this.editKey!, newItem);
    this.title.value = '';
    this.text.value = '';
    this.completed = false;
    this.favorite = false;
    this.router.navigate(['/home']);
  }
  async delete() {
    if (this.editKey) await this.storageService.remove(this.editKey);
    this.router.navigate(['/home']);
  }
  EditTodoItem!: item;
  async ngOnInit() {
    this.editKey = this.route.snapshot.paramMap.get('key') ?? null;
    if (this.editKey) {
      this.EditTodoItem = await this.storageService.get(this.editKey);
      if (this.EditTodoItem.title == '') this.router.navigate(['/home']);
      else {
        this.title.value = this.EditTodoItem.title;
        this.text.value = this.EditTodoItem.text.toString();
        this.completed = this.EditTodoItem.completed;
        this.favorite = this.EditTodoItem.favorite;
      }
    }
  }
}
