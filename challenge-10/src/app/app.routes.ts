import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { Acceso } from './pages/acceso/acceso';
import { Tareas } from './pages/tareas/tareas';

export const routes: Routes = [
  {
    path: 'login',
    component: Acceso,
    data: { registro: false }
  },
  {
    path: 'register',
    component: Acceso,
    data: { registro: true }
  },
  {
    path: 'tareas',
    component: Tareas,
    canActivate: [authGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tareas'
  },
  {
    path: '**',
    redirectTo: 'tareas'
  }
];