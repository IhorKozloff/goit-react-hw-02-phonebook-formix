import React, { Component } from "react";
import { ContactsForm } from "components/Form/Form";

export class App extends Component  {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter:'',
  }
  

onAddNewContact= (dataForNewContact) => {
  const namesList = this.state.contacts.map(item => item.name.toLocaleLowerCase());
  const addedName = dataForNewContact.name.toLocaleLowerCase();

  if (namesList.includes(addedName)) {
    return alert(`${dataForNewContact.name} is already in contacts`)
  } else {
    this.setState(oldState => {
      return {contacts: [...oldState.contacts, dataForNewContact]}
    });
  }
};

  onFilterChange = (event) => {
    this.setState({filter: event.target.value})
  }
  onDeleteContact = (deletedItemId) => {
    this.setState(oldState => {
      return {contacts: [...oldState.contacts].filter(item => {
        return item.id !== deletedItemId
      })}
    });
  }

  contactsRender = () => {
    return this.state.contacts.map(item => {
      if(item.name.toLowerCase().includes(this.state.filter)) {
        return (
          <li key={item.id} id={item.id}>
              {item.name}: {item.number}
              <button type="button" onClick={() => {
                this.onDeleteContact(item.id)
              }}>Delete</button>
          </li>
        )
      } else {
        return ''
      }
      
    })
  }

  render () {
  
    return (
      <>
        
        <ContactsForm onAddNewContact={this.onAddNewContact}/>
        <label>
          Find contacts by Name
          <input onChange={this.onFilterChange}></input>
        </label>
        <h1>Contacts</h1>
        <ul>
          {this.contactsRender()}
        </ul>
      </>
      
    )


  };
};
