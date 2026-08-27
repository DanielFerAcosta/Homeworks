import { Component, signal } from '@angular/core';
import { Loader } from './loader/loader';
import { ContactForm } from './formulario-contacto/formulario-contacto';
import { ContactList } from './lista-contactos/lista-contactos';

interface Contact {
  name: string;
  phone: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Loader, ContactForm, ContactList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  loading = signal(true);

  contacts = signal<Contact[]>([
    {
      name: 'Juan Pérez',
      phone: '3001234567'
    },
    {
      name: 'Ana López',
      phone: '3159876543'
    }
  ]);

  constructor() {

    // Simular carga inicial de datos
    setTimeout(() => {
      this.loading.set(false);
    }, 2000);

  }

  addContact(contact: Contact) {

    this.contacts.update(currentContacts => [
      ...currentContacts,
      contact
    ]);

  }

  deleteContact(index: number) {

    this.contacts.update(currentContacts =>
      currentContacts.filter((_, i) => i !== index)
    );

  }

}
