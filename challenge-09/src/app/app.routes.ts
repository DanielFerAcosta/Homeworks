import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Tasks } from './pages/tasks/tasks';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'tasks',
    component: Tasks,
    canActivate: [authGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];