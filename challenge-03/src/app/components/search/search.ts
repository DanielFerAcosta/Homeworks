import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoublyLinkedList } from '../../data-structures/doubly-linkedlist';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class SearchComponent {

  searchHistory = new DoublyLinkedList<string>();

  currentSearch = '';

  search(): void {

    if (this.currentSearch.trim() === '') {
      return;
    }

    this.searchHistory.add(this.currentSearch);

    this.currentSearch = '';
  }

  goBack(): void {

    this.searchHistory.previous();
  }

  goForward(): void {

    this.searchHistory.next();
  }

  getCurrentSearch(): string | null {

    return this.searchHistory.getCurrent();
  }

  getHistory(): string[] {

    return this.searchHistory.toArray();
  }
}