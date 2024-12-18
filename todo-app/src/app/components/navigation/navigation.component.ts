import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  addCircle,
  albums,
  settings,
  ellipsisHorizontal,
} from 'ionicons/icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export default class NavigationComponent implements OnInit {
  constructor() {
    addIcons({ addCircle, settings, albums, ellipsisHorizontal });
  }

  ngOnInit() {}
}
