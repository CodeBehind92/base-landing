import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/principal/pages/home/home').then((m) => m.Home),
    title: 'Atlapexco, Hidalgo – Portal de Identidad Cultural'
  },
];
