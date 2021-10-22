import React, { useState } from 'react';
import { useLS } from './hooks/useLS';
import ContactForm from './Components/ContactForm';
import ContactList from './Components/ContactList';
import ContactItem from './Components/ContactItem';
import Filter from './Components/Filter';
import MainContainer from './Components/MainContainer';
export default function App() {
  const [contacts, setContacts] = useLS('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const addNewContact = obj => {
    const repeatingName = contacts
      .map(contact => contact.name)
      .includes(obj.name);
    if (repeatingName) {
      alert(`${obj.name} is already in contacts`);
    } else {
      setContacts(prevState => [...prevState, obj]);
    }
  };
  const deleteItem = itemId => {
    setContacts(prevState => prevState.filter(item => item.id !== itemId));
  };
  const changeFilter = e => setFilter(e.target.value);
  const getVisibleItems = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(e =>
      e.name.toLowerCase().includes(normalizedFilter),
    );
  };
  return (
    <MainContainer>
      <h1>Phonebook</h1>
      <ContactForm addNewContact={addNewContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      {contacts.length !== 0 && (
        <ContactList>
          <ContactItem state={getVisibleItems()} onDeleteItem={deleteItem} />
        </ContactList>
      )}
    </MainContainer>
  );
}
