import { Routes } from '@angular/router';
import { SongsComponent } from './components/songs/songs';
import { SearchComponent } from './components/search/search';

export const routes: Routes = [

  {
    path: 'songs',
    component: SongsComponent
  },

  {
    path: 'search',
    component: SearchComponent
  },

  {
    path: '',
    redirectTo: 'songs',
    pathMatch: 'full'
  }

];