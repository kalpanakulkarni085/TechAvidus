import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  contacts: any[] = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
   
  ];
  filteredContacts: any[] = [];
  searchQuery: string = '';
  showPopup: boolean = false;
  
  constructor() {
    // Initialize filteredContacts with all contacts initially
    this.filteredContacts = this.contacts;
  }

  openPopup() {
    
    // Add logic to open the popup
  }

  editContact(contact: any) {
    // Add logic to edit the contact
  }

  deleteContact(contact: any) {
    // Add logic to delete the contact
  }

  // Function to filter contacts based on search query
  filterContacts() {
    this.filteredContacts = this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
