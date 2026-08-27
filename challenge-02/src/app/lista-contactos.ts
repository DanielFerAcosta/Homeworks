import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Contact {
  name: string;
  phone: string;
}

@Component({
  selector: 'app-contact-list',
  standalone: true,
  templateUrl: './contact-list.html'
})
export class ContactList {

  @Input() contacts: Contact[] = [];

  @Output() contactDeleted = new EventEmitter<number>();

  deleteContact(index: number) {

    this.contactDeleted.emit(index);

  }

}