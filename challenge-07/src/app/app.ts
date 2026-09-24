import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}