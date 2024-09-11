import Contact from '../Contact/Contact';
import css from './ContactsList.module.css';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/selectors'

const ContactList = () => {

  const filtredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.contactList}>
      {filtredContacts.map(contact => {
        return (
          <li key={contact.id} className={css.contact}>
            <Contact
              name={contact.name}
              phone={contact.number}
              contactId={contact.id}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;