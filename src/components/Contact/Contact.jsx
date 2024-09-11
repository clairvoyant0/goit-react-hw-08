import css from './Contact.module.css';
import { useDispatch } from 'react-redux';
import { AiFillPhone } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { deleteContact } from '../../redux/contacts/operations';

const Contact = ({ contactId, name, phone }) => {
  const dispatch = useDispatch();

  // Відправка запиту по кліку
  const handleClick = contactId => {
    const thunk = deleteContact(contactId);
    dispatch(thunk);
  };

  return (
    <>
      <div className={css.profile}>
        <p className={css.name}>
          <FaUserCircle />
          {name}
        </p>
        <a href={`tel:${phone}`} className={css.phone}>
          <AiFillPhone />
          {phone}
        </a>
      </div>

      <button onClick={() => handleClick(contactId)} className={css.button}>
        Delete
      </button>
    </>
  );
};

export default Contact;