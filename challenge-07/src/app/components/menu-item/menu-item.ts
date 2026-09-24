import { Component, Input } from '@angular/core';
import { MenuItem } from '../../models/menu-item';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.css'
})
export class MenuItemComponent {

  @Input() item!: MenuItem;

}