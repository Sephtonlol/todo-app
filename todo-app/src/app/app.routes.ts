import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'new',
    loadComponent: () => import('./new/new.page').then((m) => m.NewPage),
  },
  {
    path: 'edit/:key',
    loadComponent: () => import('./new/new.page').then((m) => m.NewPage),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
