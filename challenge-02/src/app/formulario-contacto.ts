import { Component, EventEmitter, Output } from '@angular/core';

interface Contact {
  name: string;
  phone: string;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.html'
})
export class ContactForm {

  @Output() contactAdded = new EventEmitter<Contact>();

  name = '';
  phone = '';

  addContact() {

    if (this.name.trim() === '' || this.phone.trim() === '') {
      return;
    }

    const contact: Contact = {
      name: this.name,
      phone: this.phone
    };

    this.contactAdded.emit(contact);

    this.name = '';
    this.phone = '';
  }

  captureName(event: Event) {

    const input = event.target as HTMLInputElement;

    this.name = input.value;

  }

  capturePhone(event: Event) {

    const input = event.target as HTMLInputElement;

    this.phone = input.value;

  }

}