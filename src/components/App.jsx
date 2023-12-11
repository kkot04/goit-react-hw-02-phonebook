import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie', number: '459-12-56' },
      { id: 'id-2', name: 'Hermion', number: '443-89-12' },
      { id: 'id-3', name: 'Eden', number: '645-17-79' },
      { id: 'id-4', name: 'Annie', number: '227-91-26' },
    ],

    filter: '',
  };

  addNewContact = contactProps => {
    this.setState(prev => ({
      contacts: [...prev.contacts, { id: nanoid(), ...contactProps }],
    }));
  };

  deleteContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  checkName = name => {
    return this.state.contacts.some(contact => {
      return contact.name.toLowerCase() === name.toLowerCase();
    });
  };

  handleFilter = event => {
    this.setState({ filter: event.target.value });
  };

  contactFilter = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  render() {
    return (
      <>
        <Section title="Phonebook">
          <ContactsForm
            addNewContact={this.addNewContact}
            checkName={this.checkName}
          />
        </Section>
        <Section title="Contacts">
          <Filter filter={this.state.filter} handleFilter={this.handleFilter} />
          <ContactsList
            id={this.state.id}
            name={this.state.name}
            number={this.state.number}
            contactFilter={this.contactFilter}
            deleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}

export default App;
