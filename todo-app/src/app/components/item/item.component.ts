import { Component, Input, OnInit } from '@angular/core';
import { item } from 'src/app/interfaces.item';
import { StorageService } from 'src/app/services/storage.service';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  bookmarkOutline,
  checkmarkCircleOutline,
  bookmark,
  checkmarkCircle,
  brush,
  chevronDown,
} from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class ItemComponent implements OnInit {
  constructor(private storageService: StorageService, private router: Router) {
    addIcons({
      bookmarkOutline,
      bookmark,
      checkmarkCircle,
      checkmarkCircleOutline,
      brush,
      chevronDown,
    });
  }
  @Input() item!: item;
  menuState = false;
  menuType!: string;
  completedText: string = '';
  bookmarkedText: string = '';

  async changeBool(changing: 'completed' | 'favorite') {
    if (changing == 'completed') {
      this.item.completed = !this.item.completed;
    } else {
      this.item.favorite = !this.item.favorite;
    }
    this.item = await this.storageService.set(this.item.key, this.item);
    this.changeMenuText();
  }
  menu() {
    if (this.menuState) {
      this.menuState = false;
    } else {
      this.menuState = true;
    }
  }

  public actionSheetButtons = [
    {
      text: 'Edit item',
      handler: () => {
        this.router.navigate([`/edit/${this.item.key}`]);
      },
    },
    {
      text: this.bookmarkedText,
      handler: () => {
        this.changeBool('favorite');
      },
    },
    {
      text: this.completedText,
      handler: () => {
        this.changeBool('completed');
      },
    },
  ];

  changeMenuText() {
    if (this.item.completed) {
      this.completedText = 'Revert completion';
    } else {
      this.completedText = 'Mark as complete';
    }
    if (this.item.favorite) {
      this.bookmarkedText = 'Remove bookmark';
    } else {
      this.bookmarkedText = 'Add to bookmark';
    }
  }
  async ngOnInit(): Promise<void> {
    this.changeMenuText();
    this.menuType = await this.storageService.get('-10');
    console.log('Completed Text:', this.completedText);
    console.log('Bookmarked Text:', this.bookmarkedText);
  }
}
