import { Routes } from '@angular/router';

import { authGuard, invitadoGuard } from './guards/auth.guard';
import { Explorador } from './pages/explorador/explorador';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [invitadoGuard] },
  { path: 'explorador', component: Explorador, canActivate: [authGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' }
];